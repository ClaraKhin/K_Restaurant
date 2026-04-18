const Stripe = require("stripe");
const createHttpError = require("http-errors");
const config = require("../config/config");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const mongoose = require("mongoose");

const stripe = config.stripeSecretKey ? new Stripe(config.stripeSecretKey) : null;

const ensureStripeConfigured = () => {
    if (!stripe) {
        throw createHttpError(500, "Stripe is not configured on the server");
    }

    return stripe;
};

const normalizeMoney = (value) => {
    const amount = Number(value);
    return Number.isFinite(amount) ? amount : 0;
};

const buildReceiptPayload = (order, { paymentId, paymentMethod } = {}) => {
    if (!order) return null;

    const rawOrderId = order?._id ? String(order._id) : order?.orderId ? String(order.orderId) : "";
    const items = Array.isArray(order?.items)
        ? order.items.map((item) => ({
            name: item?.name || "Unknown item",
            quantity: Number(item?.quantity) || 0,
            pricePerQuantity: normalizeMoney(item?.pricePerQuantity),
            price: normalizeMoney(item?.price),
        }))
        : [];

    return {
        orderId: rawOrderId,
        paymentMethod: paymentMethod || order?.paymentMethod || "unknown",
        stripePaymentIntentId: paymentId || order?.paymentData?.stripePaymentIntentId || "",
        customerDetails: {
            name: order?.customerDetails?.name || "",
            phone: order?.customerDetails?.phone || "",
            guests: Number(order?.customerDetails?.guests) || 0,
        },
        items,
        bills: {
            total: normalizeMoney(order?.bills?.total),
            tax: normalizeMoney(order?.bills?.tax),
            totalWithTax: normalizeMoney(order?.bills?.totalWithTax),
        },
        table:
            order?.table && typeof order.table === "object" && order.table.tableNo
                ? { tableNo: order.table.tableNo }
                : null,
    };
};

const persistOrderPaymentData = async ({
    orderId,
    paymentId,
    paymentStatus,
    paymentAmount,
    paymentCurrency,
}) => {
    if (!mongoose.Types.ObjectId.isValid(orderId)) return null;

    return await Order.findByIdAndUpdate(
        orderId,
        {
            $set: {
                paymentData: {
                    stripePaymentIntentId: paymentId || "",
                    stripePaymentStatus: paymentStatus || "",
                    stripePaymentAmount: normalizeMoney(paymentAmount),
                    stripePaymentCurrency: paymentCurrency || "",
                },
            },
        },
        { new: true }
    );
};

const getReceiptOrderById = async (orderId) => {
    if (!mongoose.Types.ObjectId.isValid(orderId)) return null;

    return await Order.findById(orderId).populate({ path: "table", select: "tableNo" });
};

const upsertPayment = async ({
    paymentId,
    orderId = "unknown",
    amount,
    currency,
    method = "unknown",
    receiptUrl = "",
    receiptEmail = "",
    receiptPhone = "",
    createdAt,
}) => {
    if (!paymentId) throw new Error("paymentId is required");
    if (typeof amount !== "number" || Number.isNaN(amount)) throw new Error("amount is required");
    if (!currency) throw new Error("currency is required");

    const update = {
        $set: {
            orderId,
            amount,
            currency,
            method,
            paymentId,
            receiptUrl,
            receiptEmail,
            receiptPhone,
            status: "paid",
        },
    };

    if (createdAt instanceof Date && !Number.isNaN(createdAt.valueOf())) {
        update.$setOnInsert = { createdAt };
    }

    try {
        return await Payment.findOneAndUpdate({ paymentId }, update, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
    } catch (err) {
        // Race condition: one request inserts, another hits unique index.
        if (err?.code === 11000) {
            return await Payment.findOneAndUpdate({ paymentId }, update, {
                new: true,
                setDefaultsOnInsert: true,
            });
        }
        throw err;
    }
};

const markTableBooked = async ({ tableId, orderId }) => {
    if (!mongoose.Types.ObjectId.isValid(tableId)) {
        console.warn("[Table Booking] Invalid tableId", { tableId });
        return null;
    }

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        console.warn("[Table Booking] Invalid orderId", { orderId });
        return null;
    }

    const table = await Table.findByIdAndUpdate(
        tableId,
        { status: "Booked", currentOrder: orderId },
        { new: true }
    );

    if (!table) {
        console.error("[Table Booking] Table not found", { tableId });
        return null;
    }

    console.log("[Table Booking] Table booked", { tableId, orderId });
    return table;
};

const markOrderInProgress = async (orderId) => {
    if (!mongoose.Types.ObjectId.isValid(orderId)) return null;
    return await Order.findByIdAndUpdate(orderId, { orderStatus: "In Progress" }, { new: true });
};

const createOrder = async (req, res, next) => {
    try {
        const stripeClient = ensureStripeConfigured();
        const { amount, orderId, order } = req.body;
        if (!amount) return next(createHttpError(400, "Amount is required"));

        const clientUrl = (
            process.env.CLIENT_URL ||
            req.get("origin") ||
            (config.nodeEnv === "production" ? "" : config.clientURL)
        ).trim().replace(/\/+$/, "");

        let stripeOrderId = orderId ? String(orderId) : `temp-order-${Date.now()}`;
        let stripeTableId = null;
        let customerName = null;

        if (order) {
            const tableId = order.table;
            if (tableId && !mongoose.Types.ObjectId.isValid(tableId)) {
                return next(createHttpError(400, "Invalid table id"));
            }

            const newOrder = new Order({
                customerDetails: order.customerDetails,
                bills: order.bills,
                items: order.items,
                table: tableId || undefined,
                paymentMethod: "Online",
                orderStatus: "Pending Payment",
            });

            await newOrder.save();

            stripeOrderId = String(newOrder._id);
            stripeTableId = tableId ? String(tableId) : null;
            customerName = newOrder.customerDetails?.name ? String(newOrder.customerDetails.name) : null;
        }

        const stripeMetadata = {
            orderId: stripeOrderId,
            ...(stripeTableId ? { tableId: stripeTableId } : {}),
            ...(customerName ? { customerName } : {}),
        };

        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Order Payment" },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            metadata: stripeMetadata,
            payment_intent_data: { metadata: stripeMetadata },
            success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientUrl}/cancel`,
        });

        res.status(200).json({
            success: true,
            sessionId: session.id,
            url: session.url,
            orderId: stripeOrderId,
        });
    } catch (err) {
        next(err);
    }
};

const verifyPayment = async (req, res, next) => {
    try {
        const stripeClient = ensureStripeConfigured();
        const sessionId = req.query.session_id || req.body.session_id;
        if (!sessionId) return next(createHttpError(400, "session_id is required"));

        const session = await stripeClient.checkout.sessions.retrieve(sessionId, {
            expand: ["payment_intent"],
        });

        if (session.payment_status !== "paid") {
            return next(createHttpError(400, "Payment not completed"));
        }

        const paymentId =
            typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id;

        if (!paymentId) {
            return next(createHttpError(400, "payment_intent not found for this session"));
        }

        const orderId = session.metadata?.orderId || "unknown";
        let method = session.payment_method_types?.[0] || "unknown";
        let receiptUrl = "";
        let receiptEmail = session.customer_details?.email || session.customer_email || "";
        let receiptPhone = session.customer_details?.phone || "";

        let paymentIntent = null;
        try {
            paymentIntent = await stripeClient.paymentIntents.retrieve(paymentId, {
                expand: ["latest_charge", "payment_method"],
            });

            const latestCharge =
                paymentIntent.latest_charge && typeof paymentIntent.latest_charge !== "string"
                    ? paymentIntent.latest_charge
                    : null;
            const paymentMethod =
                paymentIntent.payment_method && typeof paymentIntent.payment_method !== "string"
                    ? paymentIntent.payment_method
                    : null;

            method = paymentMethod?.type || method;
            receiptUrl = latestCharge?.receipt_url || receiptUrl;
            receiptEmail = latestCharge?.billing_details?.email || receiptEmail;
            receiptPhone = latestCharge?.billing_details?.phone || receiptPhone;
        } catch (err) {
            console.warn(`[Verify Payment] Could not enrich payment ${paymentId}: ${err.message}`);
        }

        const amountCents =
            typeof session.amount_total === "number"
                ? session.amount_total
                : typeof paymentIntent?.amount === "number"
                    ? paymentIntent.amount
                    : null;
        if (typeof amountCents !== "number") {
            return next(createHttpError(400, "Amount not found for this session"));
        }

        const currency = session.currency || paymentIntent?.currency || "usd";
        const createdAt = new Date((session.created || Math.floor(Date.now() / 1000)) * 1000);

        try {
            await upsertPayment({
                paymentId,
                orderId,
                amount: amountCents / 100,
                currency,
                method,
                receiptUrl,
                receiptEmail,
                receiptPhone,
                createdAt,
            });
            console.log("[Verify Payment] Payment stored", { paymentId, orderId });
        } catch (err) {
            console.error("[Verify Payment] Payment upsert failed:", err.message);
            return next(createHttpError(500, "Payment confirmed but saving payment record failed"));
        }

        const paymentAmount = amountCents / 100;
        const paymentStatus =
            typeof session.payment_status === "string"
                ? session.payment_status
                : paymentIntent?.status || "paid";

        const paymentDataOrder = await persistOrderPaymentData({
            orderId,
            paymentId,
            paymentStatus,
            paymentAmount,
            paymentCurrency: currency,
        });

        if (mongoose.Types.ObjectId.isValid(orderId) && !paymentDataOrder) {
            console.warn("[Verify Payment] Could not persist order payment data", { orderId });
        }

        const tableId = session.metadata?.tableId || null;
        if (tableId && mongoose.Types.ObjectId.isValid(tableId) && mongoose.Types.ObjectId.isValid(orderId)) {
            try {
                const table = await markTableBooked({ tableId, orderId });
                if (!table) {
                    return next(createHttpError(500, "Payment confirmed but table booking failed"));
                }

                const updatedOrder = await markOrderInProgress(orderId);
                if (!updatedOrder) {
                    console.warn("[Verify Payment] Could not update order status", { orderId });
                }
            } catch (err) {
                console.error("[Verify Payment] Table booking failed:", err.message);
                return next(createHttpError(500, "Payment confirmed but table booking failed"));
            }
        } else {
            console.warn("[Verify Payment] Missing tableId/orderId metadata for booking", {
                orderId,
                tableId: tableId || "n/a",
            });
        }

        const receiptOrder = await getReceiptOrderById(orderId);
        const receipt = buildReceiptPayload(receiptOrder, {
            paymentId,
            paymentMethod: method,
        });

        res.status(200).json({
            success: true,
            message: "Payment successful",
            paymentId: paymentId || null,
            orderId: session.metadata?.orderId || null,
            receipt,
        });
    } catch (err) {
        next(err);
    }
};

const getReceiptByOrderId = async (req, res, next) => {
    try {
        const orderId = req.query.order_id || req.body?.order_id;
        if (!orderId) return next(createHttpError(400, "order_id is required"));
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return next(createHttpError(400, "Invalid order id"));
        }

        const receiptOrder = await getReceiptOrderById(orderId);
        if (!receiptOrder) {
            return next(createHttpError(404, "Order not found"));
        }

        const receipt = buildReceiptPayload(receiptOrder, {
            paymentMethod: receiptOrder?.paymentMethod || "Cash",
        });

        res.status(200).json({
            success: true,
            message: "Receipt fetched successfully",
            orderId: String(receiptOrder._id),
            receipt,
        });
    } catch (err) {
        next(err);
    }
};

const webhookHandler = async (req, res) => {
    let stripeClient;

    try {
        stripeClient = ensureStripeConfigured();
    } catch (error) {
        return res.status(500).send(error.message);
    }

    const sig = req.headers["stripe-signature"];
    const webhookSecret = config.stripeWebhookSecret;
    if (!webhookSecret) {
        console.error("STRIPE_WEBHOOK_SECRET not set");
        return res.status(500).send("Webhook secret not configured");
    }

    let event;
    try {
        event = stripeClient.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error("Stripe signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("[Stripe Webhook] received", { id: event.id, type: event.type });

    if (event.type !== "checkout.session.completed") {
        console.log("[Stripe Webhook] ignored", { id: event.id, type: event.type });
        return res.status(200).json({ received: true, ignored: true });
    }

    try {
        const session = event.data.object;

        if (session.payment_status !== "paid") {
            console.log("[Stripe Webhook] ignored (not paid)", {
                id: event.id,
                type: event.type,
                payment_status: session.payment_status,
            });
            return res.status(200).json({ received: true, ignored: true });
        }

        const paymentId =
            typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id;

        if (!paymentId) {
            console.error("Payment ID not found in Stripe checkout.session.completed");
            return res.status(400).send("Payment ID not found in Stripe checkout.session.completed");
        }

        if (typeof session.amount_total !== "number") {
            console.error("Amount not found in Stripe checkout.session.completed");
            return res.status(400).send("Amount not found in Stripe checkout.session.completed");
        }

        const orderId = session.metadata?.orderId || "unknown";
        let method = session.payment_method_types?.[0] || "unknown";
        let receiptUrl = "";
        let receiptEmail = session.customer_details?.email || session.customer_email || "";
        let receiptPhone = session.customer_details?.phone || "";

        // Optional enrichment: these fields can be absent on checkout session payload.
        try {
            const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentId, {
                expand: ["latest_charge", "payment_method"],
            });

            const latestCharge =
                paymentIntent.latest_charge && typeof paymentIntent.latest_charge !== "string"
                    ? paymentIntent.latest_charge
                    : null;
            const paymentMethod =
                paymentIntent.payment_method && typeof paymentIntent.payment_method !== "string"
                    ? paymentIntent.payment_method
                    : null;

            method = paymentMethod?.type || method;
            receiptUrl = latestCharge?.receipt_url || receiptUrl;
            receiptEmail = latestCharge?.billing_details?.email || receiptEmail;
            receiptPhone = latestCharge?.billing_details?.phone || receiptPhone;
        } catch (err) {
            console.warn(`[Stripe Webhook] Could not enrich payment ${paymentId}: ${err.message}`);
        }

        const amount = session.amount_total / 100;
        const currency = session.currency || "usd";
        const createdAt = new Date((event.created || session.created) * 1000);

        await upsertPayment({
            paymentId,
            orderId,
            amount,
            currency,
            method,
            receiptUrl,
            receiptEmail,
            receiptPhone,
            createdAt,
        });

        console.log("[Stripe Webhook] upsert ok", { id: event.id, type: event.type, paymentId, orderId });

        const paymentStatus = typeof session.payment_status === "string" ? session.payment_status : "paid";
        const paymentDataOrder = await persistOrderPaymentData({
            orderId,
            paymentId,
            paymentStatus,
            paymentAmount: amount,
            paymentCurrency: currency,
        });

        if (mongoose.Types.ObjectId.isValid(orderId) && !paymentDataOrder) {
            console.warn("[Stripe Webhook] Could not persist order payment data", { orderId });
        }

        const tableId = session.metadata?.tableId || null;
        if (tableId && mongoose.Types.ObjectId.isValid(tableId) && mongoose.Types.ObjectId.isValid(orderId)) {
            const table = await markTableBooked({ tableId, orderId });
            if (!table) {
                throw new Error("Table booking failed");
            }

            const updatedOrder = await markOrderInProgress(orderId);
            if (!updatedOrder) {
                console.warn("[Stripe Webhook] Could not update order status", { orderId });
            }
        } else {
            console.warn("[Stripe Webhook] Missing tableId/orderId metadata for booking", {
                orderId,
                tableId: tableId || "n/a",
            });
        }

        return res.status(200).json({ received: true });
    } catch (err) {
        console.error("Stripe webhook processing failed:", err.message);
        return res.status(500).json({ received: false, message: "Webhook processing failed" });
    }
};

module.exports = { createOrder, verifyPayment, getReceiptByOrderId, webhookHandler };

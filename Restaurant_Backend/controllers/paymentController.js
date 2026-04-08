const Stripe = require("stripe");
const createHttpError = require("http-errors");
const config = require("../config/config");
const Payment = require("../models/paymentModel");

const stripe = new Stripe(config.stripeSecretKey);

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

const createOrder = async (req, res, next) => {
    try {
        const { amount, orderId } = req.body;
        if (!amount) return next(createHttpError(400, "Amount is required"));

        const stripeOrderId = orderId ? String(orderId) : `temp-order-${Date.now()}`;

        const session = await stripe.checkout.sessions.create({
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
            metadata: { orderId: stripeOrderId },              // store orderId
            success_url: `${config.clientURL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.clientURL}/cancel`,
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
        const sessionId = req.query.session_id || req.body.session_id;
        if (!sessionId) return next(createHttpError(400, "session_id is required"));

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
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
            paymentIntent = await stripe.paymentIntents.retrieve(paymentId, {
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

        res.status(200).json({
            success: true,
            message: "Payment successful",
            paymentId: paymentId || null,
            orderId: session.metadata?.orderId || null,
        });
    } catch (err) {
        next(err);
    }
};

const webhookHandler = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = config.stripeWebhookSecret;
    if (!webhookSecret) {
        console.error("STRIPE_WEBHOOK_SECRET not set");
        return res.status(500).send("Webhook secret not configured");
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
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
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentId, {
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

        return res.status(200).json({ received: true });
    } catch (err) {
        console.error("Stripe webhook processing failed:", err.message);
        return res.status(500).json({ received: false, message: "Webhook processing failed" });
    }
};

module.exports = { createOrder, verifyPayment, webhookHandler };

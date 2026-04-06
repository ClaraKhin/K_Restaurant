const Stripe = require("stripe");
const createHttpError = require("http-errors");
const config = require("../config/config");

const stripe = new Stripe(config.stripeSecretKey);

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

    let paymentId = null;
    let orderId = null;

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            paymentId = session.payment_intent;
            orderId = session.metadata?.orderId;
            break;
        }
        case "payment_intent.succeeded": {
            const pi = event.data.object;
            paymentId = pi.id;
            orderId = pi.metadata?.orderId;
            break;
        }
        default:
            break;
    }

    console.log("[Stripe Webhook]", {
        event: event.type,
        paymentId: paymentId || "n/a",
        orderId: orderId || "n/a",
    });

    return res.status(200).json({ received: true });
};

module.exports = { createOrder, verifyPayment, webhookHandler };

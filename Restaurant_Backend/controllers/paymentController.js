const Stripe = require("stripe");
const config = require("../config/config");
const createHttpError = require("http-errors");

const stripe = new Stripe(config.stripeSecretKey);

const createOrder = async (req, res, next) => {
    try {
        const { amount, orderId } = req.body;

        if (!amount) {
            return next(createHttpError(400, "Amount is required"));
        }

        const stripeOrderId = orderId ? String(orderId) : `temp-order-${Date.now()}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Order Payment",
                        },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            // For one-time payment, use "payment" mode. For subscriptions, use "subscription"
            mode: "payment",
            metadata: { orderId: stripeOrderId }, // Attach your order id so it comes back on success
            success_url: `${config.clientURL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.clientURL}/cancel`,
        });

        res.status(200).json({
            success: true,
            sessionId: session.id,
            url: session.url,
            orderId: stripeOrderId,
        });
    } catch (error) {
        next(error);
    }
};

const verifyPayment = async (req, res, next) => {
    try {
        const sessionId = req.query.session_id || req.body.session_id;

        if (!sessionId) {
            return next(createHttpError(400, "session_id is required"));
        }

        // Retrieve the session from Stripe to verify payment status and read metadata
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["payment_intent"],
        });

        if (session.payment_status !== "paid") {
            return next(createHttpError(400, "Payment not completed"));
        }

        const paymentId = typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;

        return res.status(200).json({
            success: true,
            message: "Payment successful",
            paymentId: paymentId || null,
            orderId: session.metadata?.orderId || null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, verifyPayment };

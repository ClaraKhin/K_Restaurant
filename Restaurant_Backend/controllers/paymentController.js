const Stripe = require("stripe");
const config = require("../config/config");
const createHttpError = require("http-errors");

const stripe = new Stripe(config.stripeSecretKey);

const createOrder = async (req, res, next) => {
    try {
        const { amount } = req.body;

        // Basic validation
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
            ],// For one-time payment, use "payment" mode. For subscriptions, use "subscription"
            mode: "payment",
            success_url: `${config.clientURL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.clientURL}/cancel`,
        });

        res.status(200).json({
            success: true,
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        next(error);
    }
};

const verifyPayment = async (req, res, next) => {
    try {
        const { session_id } = req.query;

        // Retrieve the session from Stripe to verify payment status
        const session = await stripe.checkout.sessions.retrieve(session_id);

        // Check if payment was successful and respond accordingly 
        if (session.payment_status === "paid") {
            return res.status(200).json({
                success: true,
                message: "Payment successful",
            });
        } else {
            return next(createHttpError(400, "Payment not completed"));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, verifyPayment };

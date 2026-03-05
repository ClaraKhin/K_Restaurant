const Stripe = require("stripe");
const config = require("../config/config");

const stripe = new Stripe(config.stripeSecretKey);

const createOrder = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: Math.round(amount * 100), // Convert to cents
            currency: "usd",
            metadata: {
                receipt: `receipt_${Date.now()}`
            }
        }

        const paymentIntent = await stripe.paymentIntents.create(options);
        res.status(200).json({
            success: true,
            order: paymentIntent,
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { createOrder };

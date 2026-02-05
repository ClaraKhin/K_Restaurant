const Stripe = require("stripe");
const config = require("../config/config");

const stripe = Stripe(config.stripeSecretKey);

const createOrder = async (req, res, next) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            metadata: {
                receipt: `receipt_${Date.now()}`
            }
        });
 
        res.status(200).json({
            success: true,
            order: paymentIntent,
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = { createOrder };

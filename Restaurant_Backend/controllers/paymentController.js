const stripe = require("stripe");
const config = require("../config/config");

const createOrder = async (req, res, next) => {
    const stripePay = new stripe(
        {
            key_id: config.stripePublishableKey,
            key_secret: config.stripeSecretKey,
        }
    )
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Convert to cents
            currency: "usd",
            receipt: `receipt_${Date.now()}`,
        }

        const order = await stripePay.orders.create(options);
        res.status(201).json({ success: true, order });

    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder };  
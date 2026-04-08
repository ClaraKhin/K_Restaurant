const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        method: { type: String, default: "unknown" },
        paymentId: { type: String, required: true },
        receiptUrl: { type: String, default: "" },
        receiptEmail: { type: String, default: "" },
        receiptPhone: { type: String, default: "" },
        status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        createdAt: { type: Date, default: Date.now },
    }
);

paymentSchema.index({ paymentId: 1 }, { unique: true });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;

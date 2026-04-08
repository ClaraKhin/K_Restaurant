const express = require("express");
const { createOrder, verifyPayment, webhookHandler } = require("../controllers/paymentController");
const { isVerifiedUser } = require("../middlewares/tokenVerification")
const router = express.Router();

router.route("/create-order").post(isVerifiedUser, createOrder);
// Stripe CLI local webhook target:
// 1) stripe listen --forward-to localhost:8000/api/payment/webhook
//    copy the displayed signing secret into STRIPE_WEBHOOK_SECRET
// 2) stripe trigger checkout.session.completed
router.route("/webhook").post(webhookHandler);
router
    .route("/verify-payment")
    .get(isVerifiedUser, verifyPayment)
    .post(isVerifiedUser, verifyPayment);
module.exports = router;

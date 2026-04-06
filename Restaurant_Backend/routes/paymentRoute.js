const express = require("express");
const { createOrder, verifyPayment, webhookHandler } = require("../controllers/paymentController");
const { isVerifiedUser } = require("../middlewares/tokenVerification")
const router = express.Router();


router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/webhook").post(webhookHandler);
router
    .route("/verify-payment")
    .get(isVerifiedUser, verifyPayment)
    .post(isVerifiedUser, verifyPayment);
module.exports = router;

const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const { isVerifiedUser } = require("../middlewares/tokenVerification")
const router = express.Router();


router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/verify-payment").post(isVerifiedUser, verifyPayment);
module.exports = router;
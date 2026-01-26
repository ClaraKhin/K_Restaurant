const express = require("express");
const { createOrder } = require("../controllers/paymentController");
const { isVerifiedUser } = require("../middlewares/tokenVerification")
const router = express.Router();


router.route("/create-order").post(isVerifiedUser, createOrder);
module.exports = router;
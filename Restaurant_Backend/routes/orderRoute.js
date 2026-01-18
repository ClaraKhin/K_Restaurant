const express = require("express");
const { addOrder, getOrders, getOrderById, updateOrder } = require("../controllers/orderController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();


router.route("/").post(isVerifiedUser, addOrder); // Protected route to add a new order
router.route("/").get(isVerifiedUser, getOrders);
router.route("/:id").get(isVerifiedUser, getOrderById); // Protected route to get a specific order by ID
router.route("/:id").put(isVerifiedUser, updateOrder); // Protected route to update an order by ID

module.exports = router;
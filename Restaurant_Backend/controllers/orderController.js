
const createHttpError = require("http-errors");
const Order = require("../models/orderModel");

const addOrder = async (req, res, next) => {

    try {
        const order = new Order(req.body);
        await order.save();// Save the order to the database
        res.status(201).json({ success: true, message: "Order is successfully created!", data: order });
    } catch (error) {
        next(error);
    }

}

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id); // Find the order by ID
        if (!order) {
            const error = createHttpError(404, "Order not found!");
            return next(error);
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ data: orders });
    } catch (error) {
        next(error);
    }
}

const updateOrder = async (req, res, next) => {

    //to update the status of the order (in progress, completed, etc)
    try {

        //first to receive the data
        const { orderStatus } = req.body;

        //find the order and update the status
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        );

        if (!order) {
            const error = createHttpError(404, "Order not found!");
            return next(error);
        }
        res.status(200).json({ success: true, message: "Order is successfully updated", data: order });

    } catch (error) {
        next(error);
    }
}



module.exports = { addOrder, getOrderById, getOrders, updateOrder } 
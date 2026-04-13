
const createHttpError = require("http-errors");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");
const mongoose = require("mongoose");

const addOrder = async (req, res, next) => {

    try {
        const tableId = req.body?.table;
        if (tableId && !mongoose.Types.ObjectId.isValid(tableId)) {
            return next(createHttpError(400, "Invalid table id"));
        }

        const order = new Order(req.body);
        await order.save();// Save the order to the database

        if (tableId && order?.orderStatus !== "Pending Payment") {
            const updatedTable = await Table.findByIdAndUpdate(
                tableId,
                { status: "Booked", currentOrder: order._id },
                { new: true }
            );

            if (!updatedTable) {
                await Order.findByIdAndDelete(order._id);
                return next(createHttpError(404, "Table not found"));
            }
        }
        res.status(201).json({ success: true, message: "Order is successfully created!", data: order });
    } catch (error) {
        next(error);
    }

}

const getOrderById = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = createHttpError(404, "Invalid id!");
            return next(error);
        }

        const order = await Order.findById(id); // Find the order by ID
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
        const orders = await Order.find()
            .sort({ orderDate: -1, createdAt: -1 })
            .populate({ path: "table", select: "tableNo" });
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

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = createHttpError(404, "Invalid id!");
            return next(error);
        }

        //find the order and update the status
        const order = await Order.findByIdAndUpdate(
            id,
            { orderStatus },
            { new: true }
        );

        if (!order) {
            const error = createHttpError(404, "Order not found!");
            return next(error);
        }

        if (orderStatus === "Completed" && order.table) {
            await Table.findOneAndUpdate(
                { _id: order.table, currentOrder: order._id },
                { status: "Available", currentOrder: null },
                { new: true }
            );
        }
        res.status(200).json({ success: true, message: "Order is successfully updated", data: order });

    } catch (error) {
        next(error);
    }
}



module.exports = { addOrder, getOrderById, getOrders, updateOrder } 

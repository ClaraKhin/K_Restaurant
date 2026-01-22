const createHttpError = require("http-errors");
const Table = require("../models/tableModel");
const mongoose = require("mongoose");

const addTable = async (req, res, next) => {
    try {
        const { tableNo, seats } = req.body;
        if (!tableNo) {
            const error = createHttpError(400, "Please Provide Table No!");
            return next(error);
        }

        // Check if a user with the provided email already exists in the database
        const isTablePresent = await Table.findOne({ tableNo });

        // Check if a user with the provided email already exists in the database
        if (isTablePresent) {
            const error = createHttpError(400, "Table already exists!");
            return next(error);
        }

        const newTable = new Table({ tableNo, seats });
        await newTable.save();
        res.status(201).json({ success: true, message: "Table is successfully created!", data: newTable });

    } catch (error) {
        next(error);
    }
}

const getTables = async (req, res, next) => {
    try {

        const tables = await Table.find();
        res.status(200).json({ success: true, data: tables });

    } catch (error) {
        next(error);
    }
}

const updateTable = async (req, res, next) => {
    try {

        //first to receive the table data and status of the table (available, booked, etc)
        const { status, orderId } = req.body;

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = createHttpError(404, "Invalid id!");
            return next(error);
        }
        //find the table and update the status and currentOrder of the table 
        const table = await Table.findById(id, { status, currentOrder: orderId }); // Find the table by ID 
        if (!table) {
            const error = createHttpError(404, "Table not found!");
            return next(error);
        }

        res.status(200).json({ success: true, message: "Table is successfully updated", data: table });

    } catch (error) {
        next(error);
    }
}

module.exports = { addTable, getTables, updateTable };
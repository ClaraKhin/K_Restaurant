const Category = require("../models/categoryModel");
const createHttpError = require("http-errors");

const addCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            const error = createHttpError(400, "Please provide category name!");
            return next(error);
        }

        const isPresent = await Category.findOne({ name });
        if (isPresent) {
            const error = createHttpError(400, "Category already exist!");
            return next(error);
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();
        res
            .status(201)
            .json({ success: true, message: "Category added!", data: newCategory });
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};

module.exports = { addCategory, getCategories };

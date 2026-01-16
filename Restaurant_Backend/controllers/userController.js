const createHttpError = require("http-errors");
const User = require("../models/userModel");

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body; // Destructure the request body to get the user data

        // Check if all fields are provided
        if (!name || !phone || !email || !password || !role) {
            const error = createHttpError(400, "All fields are required!");
            next(error);

        }

        const isUserPresent = await User.findOne({ email }); // Check if a user with the provided email already exists in the database
        if (isUserPresent) {
            const error = createHttpError(400, "User already exists!");
            next(error);
        }

        const user = { name, phone, email, password, role };
        const newUser = User(user);
        await newUser.save();

        res.status(201).json({ success: true, message: "User is successfully created!", data: newUser });

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {

}

module.exports = { register, login };
const createHttpError = require("http-errors"); // Import the createHttpError library
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body; // Destructure the request body to get the user data

        // Check if all fields are provided
        if (!name || !phone || !email || !password || !role) {
            const error = createHttpError(400, "All fields are required!");
            return next(error);

        }

        const isUserPresent = await User.findOne({ email }); // Check if a user with the provided email already exists in the database
        if (isUserPresent) {
            const error = createHttpError(400, "User already exists!");
            return next(error);
        }

        const user = { name, phone, email, password, role };
        const newUser = User(user);
        await newUser.save();

        res.status(201).json({ success: true, message: "User is successfully created!", data: newUser });

    } catch (error) {
        next(error);
    }
}

// Middleware to handle user login 
const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!email || !password) {
            const error = createHttpError(400, "All fields are required!");
            return next(error);
        }
        const isUserPresent = await User.findOne({ email });
        if (!isUserPresent) {
            const error = createHttpError(400, "Invalid Creditentials!");
            return next(error);
        }

        // Compare the provided password with the hashed password in the database 
        const isMatch = await bcrypt.compare(password, isUserPresent.password);
        if (!isMatch) {
            const error = createHttpError(400, "Invalid Creditentials!");
            return next(error);
        }

        // Generate and set the access token 
        const accessToken = jwt.sign({ _id: isUserPresent._id }, config.accessTokenSecret, { expiresIn: "1d" });// Generate an access token with a 1-day expiration time 
        // Set the access token as a cookie 
        res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 30 * 60 * 60 * 1000, sameSite: "none", secure: true });
        res.status(200).json({ success: true, message: "User is successfully logged in!", data: isUserPresent }); // Send a success response
    } catch (error) {
        next(error);
    }

}

// Middleware to verify the access token and attach the user object to the request object 
const getUserData = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id); // Find the user associated with the decoded token 
        res.status(200).json({ success: true, message: "User is successfully logged in!", data: user });
    } catch (error) {
        return next(error);
    }
}

module.exports = { register, login, getUserData };
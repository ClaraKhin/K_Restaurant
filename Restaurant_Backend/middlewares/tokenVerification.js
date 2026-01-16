const config = require("../config/config");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to verify the access token and attach the user object to the request object 

const isVerifiedUser = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;// Get the access token from the cookies 

        // Check if the access token is present in the cookies 
        if (!accessToken) {
            const error = createHttpError(401, "Please provide Token!"); // If the access token is not present, return a 401 Unauthorized error
            return next(error);
        }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret); // Verify the access token with the secret key
        const user = await User.findById(decodeToken._id); // Find the user associated with the decoded token

        // Check if the user is found
        if (!user) {
            const error = createHttpError(401, "User not found!"); // If the user is not found, return a 401 Unauthorized error 
            return next(error);
        }
        req.user = user; // Attach the user object to the request object
        next();
    } catch (error) {
        const err = createHttpError(401, "Invalid Token!");
        next(err);
    }
}

module.exports = { isVerifiedUser };
const express = require("express");// import express library for routing requests and responses in Node.js application 
const router = express.Router(); // create a new router object using the express.Router() function
const { register, login, getUserData, logout } = require("../controllers/userController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");



//Authentication Routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(isVerifiedUser, logout);
router.route("/").get(isVerifiedUser, getUserData); // Protected route to get user data 

module.exports = router;
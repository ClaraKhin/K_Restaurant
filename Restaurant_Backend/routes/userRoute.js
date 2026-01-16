const express = require("express");// import express library for routing requests and responses in Node.js application 
const router = express.Router(); // create a new router object using the express.Router() function
const { register, login } = require("../controllers/userController");


//Authentication Routes
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
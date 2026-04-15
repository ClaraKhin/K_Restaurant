const express = require("express");
const { addCategory, getCategories } = require("../controllers/categoryController");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

router.route("/").post(isVerifiedUser, addCategory);
router.route("/").get(isVerifiedUser, getCategories);

module.exports = router;

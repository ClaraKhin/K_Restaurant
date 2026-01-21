const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: 'Please enter a valid email address!'
        }
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                return /^[0-9]{12}$/.test(value);
            },
            message: 'Please enter a valid phone number!'
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 0,
    }

}, { timestamps: true });

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // If password is not modified, move to the next middleware
    const salt = await bcrypt.genSalt(10); // Generate a salt with a strength of 10
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
})

module.exports = mongoose.model("User", userSchema); 
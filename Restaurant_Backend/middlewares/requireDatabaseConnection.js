const mongoose = require("mongoose");

const requireDatabaseConnection = (req, res, next) => {
    if (mongoose.connection.readyState === 1) {
        return next();
    }

    return res.status(503).json({
        success: false,
        message: "Service temporarily unavailable. Database connection is not ready yet.",
    });
};

module.exports = requireDatabaseConnection;

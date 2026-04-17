const config = require("../config/config");

const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;

    if (res.headersSent) {
        return next(err);
    }

    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message,
        errorStack: config.nodeEnv === "development" ? err.stack : undefined,
    });
};

module.exports = globalErrorHandler;

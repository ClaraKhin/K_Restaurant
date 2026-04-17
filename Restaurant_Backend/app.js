require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const requireDatabaseConnection = require("./middlewares/requireDatabaseConnection");

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

const allowedOrigins = new Set(config.clientURLs);
const localhostOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/i;
const vercelPreviewOriginPattern = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, "");

const isAllowedOrigin = (origin) => {
    const normalizedOrigin = normalizeOrigin(origin);

    if (allowedOrigins.has(normalizedOrigin)) {
        return true;
    }

    if (localhostOriginPattern.test(normalizedOrigin)) {
        return true;
    }

    if (config.allowVercelPreviewOrigins && vercelPreviewOriginPattern.test(normalizedOrigin)) {
        return true;
    }

    return false;
};

const corsOptions = {
    credentials: true,
    origin(origin, callback) {
        if (!origin || isAllowedOrigin(origin)) {
            return callback(null, true);
        }

        const corsError = new Error(`CORS blocked for origin: ${origin}`);
        corsError.statusCode = 403;
        return callback(corsError);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};

const getDatabaseStatus = () => {
    switch (mongoose.connection.readyState) {
        case 1:
            return "connected";
        case 2:
            return "connecting";
        case 3:
            return "disconnecting";
        default:
            return "disconnected";
    }
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// Stripe webhook must keep the raw body for signature verification.
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Golden Dynasty POS API is running",
        environment: config.nodeEnv,
        database: getDatabaseStatus(),
    });
});

app.get("/health", (req, res) => {
    const database = getDatabaseStatus();
    const isHealthy = database === "connected" || database === "connecting";

    res.status(isHealthy ? 200 : 503).json({
        success: isHealthy,
        uptime: process.uptime(),
        database,
        timestamp: new Date().toISOString(),
    });
});

app.use("/api", requireDatabaseConnection);
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

app.use((req, res, next) => {
    next(createHttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

app.use(globalErrorHandler);

module.exports = app;

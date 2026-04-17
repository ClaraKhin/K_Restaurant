require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const createHttpError = require("http-errors")
const app = express();

const PORT = config.port;
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
    origin: (origin, callback) => {
        if (!origin || isAllowedOrigin(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};

connectDB();

//middlewares

app.use(cors(corsOptions));
// Stripe CLI webhook forwarding (keeps raw body for signature verification)
// Example (replace 8000 with your PORT): stripe listen --forward-to localhost:8000/api/payment/webhook
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
app.use(express.json()); // Parse JSON request bodies (other routes)

app.use(cookieParser()); // Parse cookie headers and attach them to req.cookies



app.get("/", (req, res) => {
    res.json({ message: "Hello from POS server!" })
});

//Other endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

//Global Error Handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();// load environment variables from .env file

const normalizeOrigin = (value) => value.trim().replace(/\/+$/, "");

const parseOrigins = (...values) =>
    [...new Set(
        values
            .flatMap((value) => (value || "").split(","))
            .map((value) => normalizeOrigin(value.trim()))
            .filter(Boolean)
    )];

const clientURL = normalizeOrigin(process.env.CLIENT_URL || "http://localhost:5173");
const clientURLs = parseOrigins(process.env.CLIENT_URLS, clientURL);

const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/restaurant",
    nodeEnv: process.env.NODE_ENV || "development",
    accessTokenSecret: process.env.JWT_SECRET || "secret",
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    clientURL,
    clientURLs,
    allowVercelPreviewOrigins: (process.env.ALLOW_VERCEL_PREVIEW_ORIGINS || "true").trim().toLowerCase() !== "false",
});

module.exports = config;

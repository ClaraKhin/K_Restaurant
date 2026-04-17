require("dotenv").config();// load environment variables from .env file

const parseOrigins = (...values) =>
    [...new Set(
        values
            .flatMap((value) => (value || "").split(","))
            .map((value) => value.trim())
            .filter(Boolean)
    )];

const clientURL = (process.env.CLIENT_URL || "http://localhost:5173").trim();
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
});

module.exports = config;

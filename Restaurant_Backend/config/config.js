require("dotenv").config();// load environment variables from .env file

const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/restaurant",
    nodeEnv: process.env.NODE_ENV || "development",
    accessTokenSecret: process.env.JWT_SECRET || "secret",
});

module.exports = config;
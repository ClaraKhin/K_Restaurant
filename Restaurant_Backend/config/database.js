const mongoose = require("mongoose");

const config = require("./config");

mongoose.set("bufferCommands", false);

let isConnecting = false;
let listenersAttached = false;

const attachDatabaseListeners = () => {
    mongoose.connection.on("connected", () => {
        console.log(`[MongoDB] Connected: ${mongoose.connection.host}`);
    });

    mongoose.connection.on("open", () => {
        console.log("[MongoDB] Connection ready for operations");
    });

    mongoose.connection.on("error", (error) => {
        console.error("[MongoDB] Connection error:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
        console.error("[MongoDB] Disconnected");
    });
};

const connectDB = async () => {
    if (!listenersAttached) {
        attachDatabaseListeners();
        listenersAttached = true;
    }

    if (!config.databaseURI) {
        console.warn("[MongoDB] MONGODB_URI is not configured. Starting server without a database connection.");
        return null;
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (isConnecting) {
        return mongoose.connection;
    }

    isConnecting = true;

    try {
        console.log("[MongoDB] Attempting database connection...");

        const connection = await mongoose.connect(config.databaseURI, {
            serverSelectionTimeoutMS: config.mongoServerSelectionTimeoutMS,
            socketTimeoutMS: config.mongoSocketTimeoutMS,
            connectTimeoutMS: config.mongoConnectTimeoutMS,
            autoIndex: false,
        });

        await connection.connection.db.admin().ping();
        console.log("[MongoDB] Ping successful");

        return connection.connection;
    } catch (error) {
        console.error("[MongoDB] Initial connection failed. Server will continue without database access:", error.message);

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        return null;
    } finally {
        isConnecting = false;
    }
};

const closeDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
};

module.exports = { connectDB, closeDB };

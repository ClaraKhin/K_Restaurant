const mongoose = require("mongoose");

const config = require("./config");

mongoose.set("bufferCommands", false);

let isConnecting = false;
let reconnectTimer = null;

const clearReconnectTimer = () => {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }
};

const scheduleReconnect = () => {
    if (reconnectTimer || isConnecting) {
        return;
    }

    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        void connectDB();
    }, config.mongoRetryDelayMS);
};

const attachDatabaseListeners = () => {
    mongoose.connection.on("connected", () => {
        clearReconnectTimer();
        console.log(`[MongoDB] Connected: ${mongoose.connection.host}`);
    });

    mongoose.connection.on("error", (error) => {
        console.error("[MongoDB] Connection error:", error.message);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("[MongoDB] Disconnected. Retrying connection...");
        scheduleReconnect();
    });
};

let listenersAttached = false;

const connectDB = async () => {
    if (!listenersAttached) {
        attachDatabaseListeners();
        listenersAttached = true;
    }

    if (!config.databaseURI) {
        console.error("[MongoDB] MONGODB_URI is not configured.");
        scheduleReconnect();
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
        await mongoose.connect(config.databaseURI, {
            serverSelectionTimeoutMS: config.mongoServerSelectionTimeoutMS,
            socketTimeoutMS: config.mongoSocketTimeoutMS,
            connectTimeoutMS: config.mongoConnectTimeoutMS,
            autoIndex: false,
        });

        clearReconnectTimer();
        return mongoose.connection;
    } catch (error) {
        console.error("[MongoDB] Initial connection failed:", error.message);
        scheduleReconnect();
        return null;
    } finally {
        isConnecting = false;
    }
};

const closeDB = async () => {
    clearReconnectTimer();

    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
};

module.exports = { connectDB, closeDB };

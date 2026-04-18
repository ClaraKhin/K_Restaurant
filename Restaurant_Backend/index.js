require("dotenv").config();

const http = require("http");

const app = require("./app");
const config = require("./config/config");
const { connectDB, closeDB } = require("./config/database");

const PORT = config.port;
let server;
let isShuttingDown = false;

const shutdown = async (signal) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;
    console.log(`[Shutdown] ${signal} received. Closing server...`);

    if (server) {
        await new Promise((resolve) => {
            server.close(() => resolve());
        });
    }

    await closeDB();
};

const startServer = async () => {
    await connectDB();

    server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`[Startup] Server is listening on port ${PORT}`);
    });

    server.on("error", (error) => {
        console.error("[Startup] HTTP server error:", error);
        void shutdown("server-error");
    });
};

process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
    void shutdown("SIGINT");
});

process.on("unhandledRejection", (reason) => {
    console.error("[Process] Unhandled promise rejection:", reason);
    void shutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
    console.error("[Process] Uncaught exception:", error);
    void shutdown("uncaughtException");
});

void startServer();

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
// const createHttpError = require("http-errors")
const app = express();

const PORT = config.port;

connectDB();

//middlewares
app.use(express.json()); // Parse JSON request bodies



app.get("/", (req, res) => {
    res.json({ message: "Hello from POS server!" })
});

//Other endpoints
app.use("/api/user", require("./routes/userRoute"));

//Global Error Handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
// const createHttpError = require("http-errors")
const app = express();

const PORT = config.port;

connectDB();

//middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookie headers and attach them to req.cookies 


app.get("/", (req, res) => {
    res.json({ message: "Hello from POS server!" })
});

//Other endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));

//Global Error Handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
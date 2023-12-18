const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require('./config/connectDB')

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./router/goalRouter"));

app.use(errorHandler);

const PORT = 6000;

app.listen(PORT, () => console.log(`App running in Port ${PORT}`));



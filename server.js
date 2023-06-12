const express = require("express");
const app = express();
const PORT = 8001;
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParserErrorHandler = require('express-body-parser-error-handler');

//DB CONNECTION
const connection = require("./db/connection");
connection();

//ALL ROUTERS
const propertyRouter = require("./routes/property");
// const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using express-body-parser-error-handler to handle the error incase of invalid json received
app.use(bodyParserErrorHandler());

app.use("/", propertyRouter);
// app.use("/", userRouter);
app.listen(PORT || process.env.PORT, () => { console.log(`server started at PORT ${PORT}`) })
const express = require("express");
const app = express();
<<<<<<< HEAD
const PORT = 8002;
=======
>>>>>>> 99fa27ebd0f40c391094e682c00e0780f61acad1
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParserErrorHandler = require('express-body-parser-error-handler');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8001;

//DB CONNECTION
const connection = require("./db/connection");
connection();

//ALL ROUTERS
const propertyRouter = require("./routes/property");
 const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using express-body-parser-error-handler to handle the error incase of invalid json received
app.use(bodyParserErrorHandler());

app.use("/", propertyRouter);
<<<<<<< HEAD
app.use("/", userRouter);

app.listen(PORT || process.env.PORT, () => { console.log(`server started at PORT ${PORT}`) })
=======
// app.use("/", userRouter);

mongoose.connection.once('open', () => {

    console.log('connected to DB');

    //launching the server
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });

});
// app.listen(PORT || process.env.PORT, () => { console.log(`server started at PORT ${PORT}`) })
>>>>>>> 99fa27ebd0f40c391094e682c00e0780f61acad1

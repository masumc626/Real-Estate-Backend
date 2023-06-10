const mongoose = require("mongoose");

const connection = () =>{
    mongoose.set('strictquery', false);
    mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () =>{
        console.log("mongoDb connected successfully");
    },(error) =>{
        console.log(error.message)
    }
        
)}

module.exports = connection;
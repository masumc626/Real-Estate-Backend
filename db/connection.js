const mongoose = require("mongoose");

const connection = async () =>{
    mongoose.set('strictQuery', false);
   mongoose.connect(process.env.DATABASE_URL)
        
}

module.exports = connection;
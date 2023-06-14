const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type:String,
        enum:["Mumbai", "Kolhapur", "Nashik","Delhi"],
        required: true
    },
    area:{
        type: String,
        required: true,
        trim: true
    },
    pincode:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required: true,
        trim: true
    },
    landmark: {
        type: String,
        trim: true
    },

    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    generalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "General",
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId
    }
})


module.exports=mongoose.model("Location", locationSchema);
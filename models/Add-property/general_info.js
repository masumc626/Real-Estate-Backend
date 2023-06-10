const mongoose = require("mongoose");

const generalInfoScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 12,
    },
    postedby: {
        type: String,
        enum: ["Dealer", "Owner"],
        default: "owner"
    },
    saletype: {
        type: String
    },
    feature: {
        type: String,
        enum: ["gym", "pool", "garden", "auditorium","parking-lot",""],
        default: "pool"
    },
    PPDpackage: {
        type: String,
    },
    image: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("general", generalInfoScehma)
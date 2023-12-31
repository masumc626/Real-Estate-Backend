const mongoose = require("mongoose");

const propertyDeatilScehma = new mongoose.Schema({
  ppdid: {
    type: String,
    default: function () {
      const year = new Date().getFullYear().toString().substr(-2);
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      return `PPDID${year}${randomNum}`;
    },
  },
  length: {
    type: Number,
  },
  breadth: {
    type: Number,
  },
  totalArea: {
    type: Number,
    required: true,
  },
  areaUnit: {
    type: String,
    enum: ["sqm", "acres", "hectares"],
    default: "sqm",
  },
  bhk: {
    type: Number,
  },
  floor: {
    type: Number,
  },
  attached: {
    type: String,
    enum: ["yes", "no"],
    default: "yes",
  },
  westernToilet: {
    type: String,
    enum: ["yes", "no"],
    default: "yes",
  },
  furnished: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
  parking: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
  lift: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
  electricity: {
    type: String,
  },
  facing: {
    type: String,
    enum: ["east", "west", "north", "south"],
    default: "east",
  },
  basicInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Basic",
  }
});

module.exports = mongoose.model("Property", propertyDeatilScehma);

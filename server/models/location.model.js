const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
  },
  coordinates: {
    type: [Number],
  },
  address: {
    type: String,
    required: false,
  },
});

module.exports = locationSchema;

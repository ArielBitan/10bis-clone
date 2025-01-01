const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

module.exports = locationSchema;

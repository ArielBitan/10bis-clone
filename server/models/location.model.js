const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    index: "2dsphere",
  }
);

// Create a 2dsphere index on the coordinates field to support geospatial queries
locationSchema.index({ coordinates: "2dsphere" });

module.exports = locationSchema;

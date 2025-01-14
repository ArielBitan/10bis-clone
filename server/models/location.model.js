const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0],
    },
    address: {
      type: String,
    },
  },
  {
    index: "2dsphere",
  }
);

// Create a 2dsphere index on the coordinates field to support geospatial queries
locationSchema.index({ coordinates: "2dsphere" });

module.exports = locationSchema;

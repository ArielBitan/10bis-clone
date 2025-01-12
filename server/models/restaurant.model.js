const mongoose = require("mongoose");
const locationSchema = require("./location.model");
const axios = require("axios");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    cuisine_types: [{ type: String }],
    image: { type: String },
    background_image: { type: String },
    location: { type: locationSchema },
    min_order: { type: String },
    delivery_fee: { type: String },
    delivery_time: { type: String },
    phone: {
      type: String,
      required: true,
    },
    is_kosher: { type: Boolean, default: false },
    weekly_hours: [
      {
        day: { type: String },
        time_ranges: {
          type: String,
          default: "08:00 - 15:00",
        },
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

restaurantSchema.pre("save", async function (next) {
  if (this.location.address) {
    try {
      console.log(this.location);
      const apiKey = process.env.GEOCODING_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: this.location.address,
            key: apiKey,
          },
        }
      );

      const data = response.data;
      if (data.status === "OK" && data.results.length > 0) {
        const coordinates = data.results[0].geometry.location;
        this.location.coordinates = [coordinates.lng, coordinates.lat];
      } else {
        throw new Error("Unable to fetch coordinates for the given address.");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error.message);
      next(error);
    }
  }
  next();
});

// Pre-save middleware to fetch coordinates from an address
restaurantSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update && update["location.address"]) {
    try {
      console.log(this.location);
      const apiKey = process.env.GEOCODING_API_KEY;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: update["location.address"],
            key: apiKey,
          },
        }
      );

      const data = response.data;
      if (data.status === "OK" && data.results.length > 0) {
        const coordinates = data.results[0].geometry.location;

        update["location.coordinates"] = [coordinates.lng, coordinates.lat];
      } else {
        throw new Error("Unable to fetch coordinates for the given address.");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error.message);
      next(error);
    }
  }
  next();
});

restaurantSchema.virtual("avgRating").get(async function () {
  const Review = mongoose.model("Review");
  const reviews = await Review.find({ restaurant_id: this._id });
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;

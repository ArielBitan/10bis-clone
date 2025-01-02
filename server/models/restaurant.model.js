const mongoose = require("mongoose");
const locationSchema = require("./location.model");

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
        day: { type: String, required: true },
        time_ranges: { type: String, required: true },
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

restaurantSchema.virtual("avgRating").get(async function () {
  const Review = mongoose.model("Review");
  const reviews = await Review.find({ restaurant_id: this._id });
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;

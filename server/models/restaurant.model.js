const mongoose = require("mongoose");
const locationSchema = require("./location.model");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cuisine_types: [{ type: String }],
    image: { type: String },
    background_image: { type: String },
    address: { type: String, required: true },
    location: { type: locationSchema, required: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10,}/.test(v.replace(/\D/g, ""));
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    is_kosher: { type: Boolean, required: true },
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

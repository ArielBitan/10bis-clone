const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    rating: { type: Number, required: true, max: 5, min: 1 },
    comment: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

reviewSchema.index({ user_id: 1 });
reviewSchema.index({ restaurant_id: 1 });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

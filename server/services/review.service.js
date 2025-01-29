const Review = require("../models/review.model");

exports.createReview = async (reviewData) => {
  return await Review.create(reviewData);
};

exports.getRestaurantReviews = async (restaurantId) => {
  return await Review.find({ restaurant_id: restaurantId }).populate("user_id");
};

exports.getReviewsByUser = async (userId) => {
  return await Review.find({ user_id: userId }).populate(
    "restaurant_id",
    "name"
  );
};

exports.updateReview = async (id, reviewData) => {
  return await Review.findByIdAndUpdate(id, reviewData, { new: true });
};

exports.deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

const reviewService = require("../services/review.service");

exports.createReview = async (req, res) => {
  console.log(req);
  
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRestaurantReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getRestaurantReviews(
      req.params.restaurantId
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReviewsByUser = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByUser(req.params.userId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await reviewService.deleteReview(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

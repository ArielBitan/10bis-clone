const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

// Routes
router.post("/", reviewController.createReview);
router.get("/restaurant/:restaurantId", reviewController.getRestaurantReviews);
router.get("/user/:userId", reviewController.getReviewsByUser);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;

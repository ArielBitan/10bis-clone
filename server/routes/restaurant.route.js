const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");

// Routes
router.post("/", restaurantController.createRestaurant);
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;

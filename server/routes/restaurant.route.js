const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");
const upload = require("../middleware/upload.middleware");

const uploadFields = [
  {
    name: "background_image",
    maxCount: 1,
  },
  {
    name: "image",
    maxCount: 1,
  },
];

// Routes
router.post(
  "/",
  upload.fields(uploadFields),
  restaurantController.createRestaurant
);
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.put(
  "/:id",
  upload.fields(uploadFields),
  restaurantController.updateRestaurant
);
router.delete("/:id", restaurantController.deleteRestaurant);


//search
router.get('/search/:name', restaurantController.searchRestaurants);

module.exports = router;

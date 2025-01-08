const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});
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

module.exports = router;

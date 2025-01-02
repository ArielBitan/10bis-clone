const express = require("express");
const userController = require("../controllers/user.controller");
const { authenticateUser } = require("../middleware/auth.middleware");

const router = express.Router();

// Route for user login
router.post("/login", userController.login);

// Route for user registration
router.post("/register", userController.register);

// Route for getting all users (excluding password)
router.get("/", userController.getAllUsers);

// Route for getting user profile (authenticated)
router.get("/profile", authenticateUser, userController.getProfile);

// Route for updating user profile (authenticated)
router.put("/profile", authenticateUser, userController.updateProfile);

// Route for creating a new courier user
router.post("/register/courier", userController.createCourier);

// Route for creating a new restaurant owner user
router.post("/register/restaurant-owner", userController.createRestaurantOwner);

// Route for creating a new business owner user
router.post("/register/business-owner", userController.createBusinessOwner);

module.exports = router;

const express = require("express");
const userController = require("../controllers/user.controller");
const { authenticateUser } = require("../middleware/auth.middleware");

const router = express.Router();

// Route for user login
router.post("/login", userController.login);

// Route for user registration
router.post("/register", userController.register);

// Route for getting user profile
router.get("/profile", authenticateUser, userController.getProfile);

// Route for updating user profile
router.put("/profile", authenticateUser, userController.updateProfile);

module.exports = router;

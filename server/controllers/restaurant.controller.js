const MenuItem = require("../models/menu-item.model");
const restaurantService = require("../services/restaurant.service");

exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    // Get restaurant by ID
    const restaurant = await restaurantService.getRestaurantById(req.params.id);

    // If the restaurant is not found, return 404
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Get the menu items for the restaurant
    const menuItems = await MenuItem.find({ restaurant_id: req.params.id });

    // Combine the restaurant details with the menu items
    const restaurantDetails = {
      ...restaurant.toObject(), // Convert restaurant document to plain object
      menuItems: menuItems, // Add menuItems to the response
    };

    // Send the combined response
    res.status(200).json(restaurantDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await restaurantService.updateRestaurant(
      req.params.id,
      req.body
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await restaurantService.deleteRestaurant(
      req.params.id
    );
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const MenuItem = require("../models/menu-item.model");
const restaurantService = require("../services/restaurant.service");
const validateAndUploadImage = require("../utils/uploadImage");

exports.createRestaurant = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Handle image updates if files are provided
    if (req.files) {
      if (req.files.background_image) {
        const background_image = req.files.background_image[0];
        updateData.background_image = await validateAndUploadImage(
          background_image
        );
      }
      if (req.files.image) {
        const image = req.files.image[0];

        updateData.image = await validateAndUploadImage(image);
      }
    }

    const restaurant = await restaurantService.createRestaurant(updateData);

    return res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
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

exports.getNearbyRestaurants = async (req, res) => {
  try {
    const { coordinates } = req.body;

    const restaurants = await restaurantService.getNearbyRestaurants(
      coordinates
    );
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

    const avgRatings = await restaurant.calculateAvgRating();

    const menuItems = await MenuItem.find({ restaurant_id: req.params.id });

    // Combine the restaurant details with the menu items
    const restaurantDetails = {
      ...restaurant.toObject(),
      menuItems: menuItems,
      avgRatings,
    };

    // Send the combined response
    res.status(200).json(restaurantDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    let updateData = { ...req.body };
    // Check if restaurant exists
    const existingRestaurant = await restaurantService.getRestaurantById(
      restaurantId
    );
    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    // Handle image updates if files are provided
    if (req.files.background_image) {
      const background_image = req.files.background_image[0];
      updateData.background_image = await validateAndUploadImage(
        background_image
      );
    }

    if (req.files.image) {
      const image = req.files.image[0];
      updateData.image = await validateAndUploadImage(image);
    }

    const updatedRestaurant = await restaurantService.updateRestaurant(
      restaurantId,
      updateData
    );

    return res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
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

exports.searchRestaurants = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide a restaurant name" });
    }

    const restaurants = await restaurantService.searchRestaurantsByName(name);
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error searching restaurants:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};

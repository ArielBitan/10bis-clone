const Restaurant = require("../models/restaurant.model");

exports.createRestaurant = async (restaurantData) => {
  try {
    return await Restaurant.create(restaurantData);
  } catch (error) {
    throw new Error(`Error creating restaurant: ${error.message}`);
  }
};

exports.getAllRestaurants = async (address) => {
  return await Restaurant.find();
};

exports.getRestaurantById = async (id) => {
  return await Restaurant.findById(id);
};

exports.getNearbyRestaurants = async (
  coordinates,
  maxDistanceInMeters = 15000
) => {
  try {
    // Perform a geo query to find restaurants near the user's coordinates
    const restaurants = await Restaurant.find({
      "location.coordinates": {
        $near: {
          $geometry: { type: "Point", coordinates },

          $maxDistance: maxDistanceInMeters,
        },
      },
    });

    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

exports.updateRestaurant = async (id, updateData) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return restaurant;
  } catch (error) {
    throw new Error(`Error updating restaurant: ${error.message}`);
  }
};

exports.deleteRestaurant = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};

const Restaurant = require("../models/restaurant.model");

exports.createRestaurant = async (restaurantData) => {
  try {
    return await Restaurant.create(restaurantData);
  } catch (error) {
    throw new Error(`Error creating restaurant: ${error.message}`);
  }
};

exports.getAllRestaurants = async () => {
  return await Restaurant.find();
};

exports.getRestaurantById = async (id) => {
  return await Restaurant.findById(id);
};

exports.updateRestaurant = async (id, updateData) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return restaurant;
  } catch (error) {
    throw new Error(`Error updating restaurant: ${error.message}`);
  }
};

exports.deleteRestaurant = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};

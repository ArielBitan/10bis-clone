const Restaurant = require("../models/restaurant.model");

exports.createRestaurant = async (restaurantData) => {
  console.log(restaurantData);
  return await Restaurant.create(restaurantData);
};

exports.getAllRestaurants = async () => {
  return await Restaurant.find();
};

exports.getRestaurantById = async (id) => {
  return await Restaurant.findById(id);
};

exports.updateRestaurant = async (id, restaurantData) => {
  return await Restaurant.findByIdAndUpdate(id, restaurantData, {
    new: true,
  });
};

exports.deleteRestaurant = async (id) => {
  return await Restaurant.findByIdAndDelete(id);
};

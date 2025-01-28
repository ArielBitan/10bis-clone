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
  maxDistanceInMeters = 5000
) => {
  try {
    // First perform the geo query to find nearby restaurants
    const restaurants = await Restaurant.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: coordinates,
          },
          distanceField: "distance",
          maxDistance: maxDistanceInMeters,
          spherical: true,
        },
      },
      {
        // Then lookup the menu items for each restaurant
        $lookup: {
          from: "menuitems",
          localField: "_id",
          foreignField: "restaurant_id",
          as: "menuItems",
        },
      },
    ]);

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

exports.searchRestaurantsByName = async (nameInput) => {
  try {
    const regex = new RegExp(nameInput, "i");
    const restaurants = await Restaurant.find({ name: regex });
    return restaurants;
  } catch (error) {
    throw new Error(`Error searching restaurants: ${error.message}`);
  }
};

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
  // Find the restaurant by ID
  const restaurant = await Restaurant.findById(id);
  return restaurant;
};

exports.getNearbyRestaurants = async (
  coordinates,
  maxDistanceInMeters = 5000
) => {
  try {
    const restaurants = await Restaurant.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates },
          distanceField: "distance",
          maxDistance: maxDistanceInMeters,
          spherical: true,
        },
      },
      {
        $lookup: {
          from: "menuitems",
          localField: "_id",
          foreignField: "restaurant_id",
          as: "menuItems",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "restaurant_id",
          as: "reviews",
        },
      },
      {
        $addFields: {
          avgRatings: { $avg: "$reviews.rating" }, // Calculate average rating
        },
      },
      {
        $project: {
          reviews: 0, // Remove full reviews array (optional)
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

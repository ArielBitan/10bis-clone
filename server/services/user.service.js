const {
  User,
  Courier,
  RestaurantOwner,
  BusinessOwner,
} = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userService = {
  login: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign(
      { email, _id: user._id, name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return { token, userWithoutPassword };
  },

  getAllUsers: async () => {
    const users = await User.find().select("-password");
    return users;
  },

  register: async (userData) => {
    const newUser = await User.create(userData);
    return newUser;
  },

  getProfile: async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  updateProfile: async (userId, updatedData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  },

  // Create Courier user
  createCourier: async (userData) => {
    const newCourier = await Courier.create(userData);
    return newCourier;
  },

  // Create Restaurant Owner user
  createRestaurantOwner: async (userData) => {
    const newRestaurantOwner = await RestaurantOwner.create(userData);
    return newRestaurantOwner;
  },

  // Create Business Owner user
  createBusinessOwner: async (userData) => {
    const newBusinessOwner = await BusinessOwner.create(userData);
    return newBusinessOwner;
  },
};

module.exports = userService;

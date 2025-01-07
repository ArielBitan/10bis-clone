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

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check the user's role
    if (user.role === "restaurant_owner") {
      await user.populate("owned_restaurants");
    }

    // Compare the password
    if (!user.comparePassword(password)) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        email,
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Remove the password from the user object before sending it to the client
    const userWithoutPassword = user.toObject();
    console.log(userWithoutPassword);
    delete userWithoutPassword.password;

    return { token, user: userWithoutPassword };
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

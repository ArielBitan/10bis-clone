const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userService = {
  login: async (email, password) => {
    // Implement login logic here
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      throw new Error("Invalid email or password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        email,
        _id: user._id,
        name: user.full_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return { token, userWithoutPassword };
  },

  register: async (userData) => {
    // Implement registration logic here
    const newUser = await User.create(userData);
    return newUser;
  },

  getProfile: async (userId) => {
    // Implement get profile logic here
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  updateProfile: async (userId, updatedData) => {
    // Implement update profile logic here
    console.log(updatedData);
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  },
};

module.exports = userService;

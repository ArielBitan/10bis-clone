const userService = require("../services/user.service");

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.login(email, password);
    res
      .cookie("jwt", token, {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.register(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const userProfile = await userService.getProfile(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedData = req.body;
    const updatedUser = await userService.updateProfile(userId, updatedData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Courier user
exports.createCourier = async (req, res) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      current_location,
      active_orders,
    } = req.body;
    const newCourier = await userService.createCourier({
      email,
      password,
      first_name,
      last_name,
      phone,
      current_location,
      active_orders,
    });
    res.status(201).json(newCourier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Restaurant Owner user
exports.createRestaurantOwner = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone, owned_restaurants } =
      req.body;
    const newRestaurantOwner = await userService.createRestaurantOwner({
      email,
      password,
      first_name,
      last_name,
      phone,
      owned_restaurants,
    });
    res.status(201).json(newRestaurantOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Business Owner user
exports.createBusinessOwner = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone, owned_companies } =
      req.body;
    const newBusinessOwner = await userService.createBusinessOwner({
      email,
      password,
      first_name,
      last_name,
      phone,
      owned_companies,
    });
    res.status(201).json(newBusinessOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

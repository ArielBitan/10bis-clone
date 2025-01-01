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

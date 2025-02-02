const { User } = require("../models/user.model");
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
      .json(user);
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

exports.makeUserEmployee = async (req, res) => {
  try {
    const { _id: userId } = req.body;

    // Fetch the user by ID
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update the role and employee-specific fields
    user.role = "employee"; // Set role to 'employee'
    user.amount = 0; // Initialize employee amount
    user.company_role = req.body.company_role; // Initialize company role (or set a specific value if needed)

    // You can add any other employee-specific fields here

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Courier user
// exports.createCourier = async (req, res) => {
//   try {
//     const {
//       email,
//       password,
//       first_name,
//       last_name,
//       phone,
//       current_location,
//       active_orders,
//     } = req.body;
//     const newCourier = await userService.createCourier({
//       email,
//       password,
//       first_name,
//       last_name,
//       phone,
//       current_location,
//       active_orders,
//     });
//     res.status(201).json(newCourier);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.createCourier = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = {
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      role: "courier",
    };

    await User.findByIdAndDelete(userId);

    const newCourier = await userService.createCourier(userData);

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

exports.searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await userService.searchUserByEmail(email);
    if (users.length === 0) {
      res.status(401).json({ message: "לא נמצאו משתמשים" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create Business Owner user
exports.createCompanyOwner = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;
    const newBusinessOwner = await userService.createCompanyOwner({
      email,
      password,
      first_name,
      last_name,
      phone,
    });
    res.status(201).json(newBusinessOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

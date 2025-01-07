const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const Order = require("../models/order.model");

const authenticateCourier = (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Please log in to continue" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if the user's role is 'courier'
    if (req.user.role !== "courier") {
      return res
        .status(403)
        .json({ message: "Access denied. Courier role required." });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const checkCourierActiveOrder = async (req, res, next) => {
  const { courierId } = req.body;

  // Check for active orders
  const activeOrder = await Order.findOne({
    courier_id: courierId,
    status: { $in: ["Picked Up"] },
  });

  if (activeOrder) {
    return res.status(400).json({
      message:
        "You already have an active order. Complete it before accepting a new one.",
    });
  }

  next();
};

module.exports = { authenticateCourier, checkCourierActiveOrder };

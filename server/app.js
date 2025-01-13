const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Routes
const orderRoutes = require("./routes/order.route");
const reviewRoutes = require("./routes/review.route");
const restaurantRoutes = require("./routes/restaurant.route");
const userRoutes = require("./routes/user.route");
const itemRoutes = require("./routes/item.route");
const webhookRoutes = require("./routes/webhook.route");
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/items", itemRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/users", userRoutes);
// app.use("/api", webhookRoutes);

module.exports = app;

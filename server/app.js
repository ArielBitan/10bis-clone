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
app.use(express.json({ extended: true, charset: "utf-8" }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
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

const path = require("path");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handle React routing by serving index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;

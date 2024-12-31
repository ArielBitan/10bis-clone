const mongoose = require("mongoose");

const options = {
  discriminatorKey: "role",
  timestamps: true,
  versionKey: false,
};

const baseUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  options
);

const User = mongoose.model("User", baseUserSchema);

const courierSchema = new mongoose.Schema({
  current_location: { type: Object },
  active_orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const restaurantOwnerSchema = new mongoose.Schema({
  owned_restaurants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  ],
});

const businessOwnerSchema = new mongoose.Schema({
  owned_companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
});

const Courier = User.discriminator("courier", courierSchema);
const RestaurantOwner = User.discriminator(
  "restaurant_owner",
  restaurantOwnerSchema
);
const BusinessOwner = User.discriminator("business_owner", businessOwnerSchema);

module.exports = { User, Courier, RestaurantOwner, BusinessOwner };

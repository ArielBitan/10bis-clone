const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const locationSchema = require("./location.model");

const baseUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10,}/.test(v.replace(/\D/g, ""));
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },
  {
    discriminatorKey: "role",
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compare password method
baseUserSchema.methods.comparePassword = async function (password) {
  console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
};

baseUserSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model("User", baseUserSchema);

const courierSchema = new mongoose.Schema({
  current_location: { type: locationSchema },
  isDelivering: { type: Boolean, default: false },
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

baseUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Courier = User.discriminator("courier", courierSchema);
const RestaurantOwner = User.discriminator(
  "restaurant_owner",
  restaurantOwnerSchema
);
const BusinessOwner = User.discriminator("business_owner", businessOwnerSchema);

module.exports = { User, Courier, RestaurantOwner, BusinessOwner };

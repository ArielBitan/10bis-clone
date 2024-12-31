const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cuisine_types: [{ type: String }],
    image: { type: String },
    address: { type: String, required: true },
    location: { type: Object, required: true },
    phone: { type: String, required: true },
    is_kosher: { type: Boolean, required: true },
    weekly_hours: [
      {
        day: { type: String, required: true },
        open_time: { type: String, required: true },
        close_time: { type: String, required: true },
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;

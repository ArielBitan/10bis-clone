const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    available: { type: Boolean, required: true },
    category: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

menuItemSchema.index({ restaurant_id: 1 });
menuItemSchema.index({ name: 1 });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;

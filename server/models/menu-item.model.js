const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { type: String },
    description: { type: String },
    image: { type: String },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    options: [
      {
        name: { type: String },
        type: { type: String, enum: ["single", "multiple"] },
        values: [
          {
            value: { type: String },
            additionalPrice: { type: Number, default: 0 },
          },
        ],
      },
    ],
    available: { type: Boolean, default: true },
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

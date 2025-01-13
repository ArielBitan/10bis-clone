const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    menu_item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
  },
  {
    versionKey: false,
  }
);

orderItemSchema.index({ order_id: 1 });
orderItemSchema.index({ menu_item_id: 1 });

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
module.exports = OrderItem;

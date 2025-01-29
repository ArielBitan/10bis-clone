const mongoose = require("mongoose");
const MenuItem = require("./menu-item.model");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    courier_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order_items: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: [
        "Awaiting Payment",
        "Pending",
        "Open",
        "Accepted",
        "Picked Up",
        "Delivered",
      ],
      required: true,
    },
    delivered_at: { type: Date },
    special_instructions: [{ type: String }],
    payment_details: { type: Object, required: true },
    total_amount: { type: Number },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

orderSchema.index({ status: 1, courier_id: 1 });

orderSchema.pre("save", async function (next) {
  if (this.order_items && this.order_items.length > 0) {
    // Populate menu items
    const populatedItems = await MenuItem.find({
      _id: { $in: this.order_items.map((item) => item._id) },
    });
    // Calculate total amount
    this.total_amount = this.order_items.reduce((sum, orderItem) => {
      const menuItem = populatedItems.find((item) =>
        item._id.equals(orderItem._id)
      );
      return menuItem ? sum + menuItem.price * orderItem.quantity : sum;
    }, 0);
  } else {
    this.total_amount = 0;
  }
  next();
});

// Method to get total amount for existing orders
orderSchema.methods.calculateTotalAmount = async function () {
  const items = await MenuItem.find({ _id: { $in: this.order_items } });
  this.total_amount = items.reduce((sum, item) => sum + item.price, 0);
  return this.total_amount;
};

// Static method to get order with total amount
orderSchema.statics.findByIdWithTotal = async function (id) {
  const order = await this.findById(id);
  if (order) {
    await order.calculateTotalAmount();
  }
  return order;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

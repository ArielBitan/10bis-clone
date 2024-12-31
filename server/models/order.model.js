const mongoose = require("mongoose");

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
    courier_id: { type: mongoose.Schema.Types.ObjectId, ref: "Courier" },
    order_items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
    status: { type: String, required: true },
    delivered_at: { type: Date },
    special_instructions: [{ type: String }],
    payment_details: { type: Object, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for total order amount
orderSchema.virtual("total_amount").get(async function () {
  const OrderItem = mongoose.model("OrderItem");

  // Retrieve the associated order items
  const items = await OrderItem.find({ _id: { $in: this.order_items } });

  // Calculate the total amount by summing up the price * quantity of each item
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return total;
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

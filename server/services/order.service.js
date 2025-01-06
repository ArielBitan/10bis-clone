const Order = require("../models/order.model");

exports.createOrder = async (orderData) => {
  return await Order.create(orderData);
};

exports.getAllOrders = async () => {
  return await Order.find()
    .populate("user_id", "name email")
    .populate("restaurant_id", "name address")
    .populate("order_items");
};

exports.getOrdersByStatus = async (status) => {
  try {
    const orders = await Order.find({
      status: { $regex: new RegExp(`^${status}$`, "i") },
    })
      .populate("user_id", "name phone")
      .populate("restaurant_id", "name address phone")
      .populate("order_items");
    return orders;
  } catch (error) {
    throw new Error(
      `Error fetching orders with status ${status}: ${error.message}`
    );
  }
};

exports.getOrderById = async (id) => {
  return await Order.findById(id)
    .populate("user_id", "name email")
    .populate("restaurant_id", "name address")
    .populate("courier_id", "name phone")
    .populate("order_items");
};

exports.getOrdersByUser = async (userId) => {
  return await Order.find({ user_id: userId })
    .populate("restaurant_id", "name address")
    .populate("order_items");
};

exports.updateOrder = async (id, orderData) => {
  return await Order.findByIdAndUpdate(id, orderData, { new: true })
    .populate("user_id", "name email")
    .populate("restaurant_id", "name address")
    .populate("courier_id", "name phone")
    .populate("order_items");
};

exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

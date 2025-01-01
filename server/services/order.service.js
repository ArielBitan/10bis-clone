const Order = require("../models/order.model");

exports.createOrder = async (orderData) => {
  return await Order.create(orderData);
};

exports.getAllOrders = async () => {
  return await Order.find()
    .populate("user_id", "name email")
    .populate("restaurant_id", "name address")
    .populate("courier_id", "name phone")
    .populate("order_items");
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

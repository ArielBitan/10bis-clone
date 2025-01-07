const Order = require("../models/order.model");
const { User } = require("../models/user.model");

exports.createOrder = async (orderData) => {
  return await Order.create(orderData);
};

exports.getAllOrders = async () => {
  return await Order.find()
    .populate("user_id", "name email")
    .populate("restaurant_id", "name address")
    .populate("order_items");
};

exports.acceptOrder = async (id, userId) => {
  try {
    const courier = await User.findOneAndUpdate(
      { _id: userId },
      { isDelivering: true }
    );
    const order = Order.findOneAndUpdate(
      { _id: id },
      { courier_id: userId, status: "Accepted" }
    );
    return order;
  } catch (error) {
    throw new Error(`Error updating: ${error.message}`);
  }
};

exports.getActiveOrder = async (courierId) => {
  try {
    const order = await Order.findOne({
      courier_id: courierId,
    })
      .populate("user_id")
      .populate("restaurant_id")
      .populate("order_items");
    return order;
  } catch (error) {
    throw new Error(`Error finding order: ${error.message}`);
  }
};

exports.getOrdersByStatus = async (status) => {
  try {
    const orders = await Order.find({
      status: { $regex: new RegExp(`^${status}$`, "i") },
    })
      .populate("user_id")
      .populate("restaurant_id")
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

exports.updateOrderStatus = async (id, status) => {
  console.log(id);
  const order = await Order.findOneAndUpdate(
    { _id: id },
    { status: status },
    { new: true }
  )
    .populate("user_id", "name email")
    .populate("restaurant_id", "name address")
    .populate("courier_id", "name phone")
    .populate("order_items");
  if (status === "Delivered") {
    await User.findOneAndUpdate(
      { _id: order.courier_id },
      { isDelivering: false }
    );
  }
  return order;
};

exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

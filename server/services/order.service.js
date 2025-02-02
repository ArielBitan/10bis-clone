const { default: mongoose } = require("mongoose");
const Order = require("../models/order.model");
const { User, Courier } = require("../models/user.model");

exports.createOrder = async (orderData) => {
  return await Order.create(orderData);
};

exports.getAllOrders = async () => {
  return await Order.find()
    .populate("user_id", "name email")
    .populate("restaurant_id", "name address phone")
    .populate("order_items");
};

exports.acceptOrder = async (id, userId) => {
  try {
    const courier = await Courier.findOneAndUpdate(
      { _id: userId },
      { isDelivering: true },
      { new: true }
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
      status: { $ne: "Delivered" },
    })
      .populate("user_id")
      .populate("restaurant_id")
      .populate("courier_id")
      .populate({
        path: "order_items._id",
        model: "MenuItem",
      });
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
      .populate("courier_id")
      .populate({
        path: "order_items._id",
        model: "MenuItem",
      });
    return orders;
  } catch (error) {
    throw new Error(
      `Error fetching orders with status ${status}: ${error.message}`
    );
  }
};

exports.getOrderById = async (id) => {
  return await Order.findById(id)
    .populate("user_id")
    .populate("restaurant_id")
    .populate("courier_id")
    .populate({
      path: "order_items._id",
      model: "MenuItem",
    });
};

exports.getOrdersByUser = async (userId) => {
  return await Order.find({ user_id: userId })
    .populate("user_id")
    .populate("restaurant_id")
    .populate("courier_id")
    .populate({
      path: "order_items._id",
      model: "MenuItem",
    });
};

exports.getOrdersByRestaurant = async (restaurantId) => {
  return await Order.find({ restaurant_id: restaurantId })
    .populate("user_id")
    .populate("restaurant_id")
    .populate("courier_id")
    .populate({
      path: "order_items._id",
      model: "MenuItem",
    });
};

exports.updateOrderStatus = async (id, status) => {
  try {
    const validStatuses = ["Open", "Accepted", "Picked Up", "Delivered"];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order ID");
    }
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    const order = await Order.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    )
      .populate("user_id", "name email")
      .populate("restaurant_id", "name address phone")
      .populate("order_items");

    if (!order) {
      throw new Error("Order not found");
    }
    if (status === "Delivered") {
      await Courier.findOneAndUpdate(
        { _id: order.courier_id },
        { isDelivering: false }
      );
    }

    return order;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

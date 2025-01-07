const Order = require("../models/order.model");
const orderService = require("../services/order.service");

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.acceptOrder = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const courierId = req.user._id;
    const order = await orderService.acceptOrder(orderId, courierId);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getActiveOrder = async (req, res) => {
  try {
    const courierId = req.user._id;
    const order = await orderService.getActiveOrder(courierId);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await orderService.getOrdersByStatus(status);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    console.log(status);

    const updatedOrder = await orderService.updateOrderStatus(id, status);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderService.deleteOrder(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Routes
router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:status", orderController.getOrdersByStatus);
router.get("/:id", orderController.getOrderById);
router.get("/user/:userId", orderController.getOrdersByUser);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;

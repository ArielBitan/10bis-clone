const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const {
  authenticateCourier,
  checkCourierActiveOrder,
} = require("../middleware/courierAuth.middleware");

const { authenticateUser } = require("../middleware/auth.middleware");

// Routes
router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:status", orderController.getOrdersByStatus);
router.get("/:id", orderController.getOrderById);
router.get(
  "/courier/active",
  authenticateCourier,
  orderController.getActiveOrder
);
router.get("/user/:userId", orderController.getOrdersByUser);
router.put(
  "/:id/accept",
  authenticateCourier,
  checkCourierActiveOrder,
  orderController.acceptOrder
);
router.put("/:id/status/:status", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);

router.post(
  "/checkout/create-checkout-session",
  authenticateUser,
  orderController.createCheckoutSession
);

module.exports = router;

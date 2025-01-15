const Stripe = require("stripe");
const orderService = require("../services/order.service");
const Restaurant = require("../models/restaurant.model");
const MenuItem = require("../models/menu-item.model");
const { getIO } = require("../socketManager");

const STRIPE = new Stripe(process.env.STRIPE_API_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL;

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const checkoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    // Create the order in your database after the session is created
    const orderData = {
      user_id: req.user._id,
      restaurant_id: restaurant._id,
      userAddress: checkoutSessionRequest.userAddress,
      order_items: checkoutSessionRequest.cartItems.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
      })),
      status: "Pending",
      delivery_fee: restaurant.delivery_fee,
      payment_details: { method: "Card", amount: 0 },
    };

    const order = await orderService.createOrder(orderData);

    const lineItems = await createLineItems(checkoutSessionRequest);

    // Create the checkout session
    const session = await createSession(
      lineItems,
      order._id.toString(),
      restaurant.delivery_fee,
      restaurant._id.toString()
    );

    if (!session.url) {
      return res.status(500).json({ message: "Error creating stripe session" });
    }
    order.payment_details.amount = session.amount_total;
    const io = getIO();
    console.log(`emitting order-update to ${order._id}`);
    io.to(order._id).emit("order-update", {
      message: `Your order #${order._id} is now Pending.`,
      status: order.status,
      orderId: order._id,
    });

    io.to(restaurant._id).emit("order-received", {
      message: `Order received from ${req.user._id}`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const { id } = req.params;

    const order = await orderService.getOrderById(id);
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
    const io = getIO();

    io.to(orderId).emit("order-update", {
      message: `Order #${orderId} has been accepted by the courier.`,
      status: order.status,
      orderId: order._id,
    });
    console.log(`event emitted to ${orderId}`);
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

exports.getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByRestaurant(
      req.params.restaurantId
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.params;

    const updatedOrder = await orderService.updateOrderStatus(id, status);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    const io = getIO();

    io.to(id).emit("order-update", {
      message: `The status of order #${id} has been updated to ${status}.`,
      status: updatedOrder.status,
      orderId: updatedOrder._id,
    });

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

const createLineItems = async (checkoutSessionRequest) => {
  const lineItems = await Promise.all(
    checkoutSessionRequest.cartItems.map(async (cartItem) => {
      const menuItem = await MenuItem.findById(cartItem._id);
      if (!menuItem) {
        throw new Error("Menu item not found " + cartItem._id);
      }
      const priceInAgorot = menuItem.price * 100;

      const line_item = {
        quantity: cartItem.quantity,
        price_data: {
          currency: "ils",
          unit_amount: priceInAgorot,
          product_data: {
            name: menuItem.name,
          },
        },
      };
      return line_item;
    })
  );
  return lineItems;
};

const createSession = async (
  lineItems,
  orderId,
  deliveryPrice,
  restaurantId
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "ils",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order/${orderId}`,
    cancel_url: `${FRONTEND_URL}/restaurant/${restaurantId}?cancelled=true`,
  });
  return sessionData;
};

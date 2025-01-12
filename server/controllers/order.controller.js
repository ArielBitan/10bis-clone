const Stripe = require("stripe");
const orderService = require("../services/order.service");
const Restaurant = require("../models/restaurant.model");
const MenuItem = require("../models/menu-item.model");

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

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.order_items
    );

    const session = await createSession(
      lineItems,
      "TEST_ORDER_ID",
      restaurant.delivery_fee,
      restaurant._id.toString()
    );
    if (!session.url) {
      return res.status(500).json({ message: "Error creating stripe session" });
    }
    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status.json({ message: error.raw.message });
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

const createLineItems = (checkoutSessionRequest, orderItems) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = MenuItem.findById(cartItem._id);
    if (!menuItem) {
      throw new Error("Menu item not found " + cartItem._id);
    }
    const line_item = {
      price_data: {
        currency: "ils",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
    };
    return line_item;
  });
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
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/restaurant/${restaurantId}?cancelled=true`,
  });
  return sessionData;
};

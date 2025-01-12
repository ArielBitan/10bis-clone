const Order = require("../models/order.model");

const handleWebhook = async (request, response) => {
  const event = request.body;
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
  } catch (err) {
    console.error("Error processing webhook:", err);
    response.status(500).json({ error: "Webhook processing failed" });
  }
};

const handleCheckoutCompleted = async (session) => {
  const orderId = session.metadata.orderId;
  try {
    await Order.findByIdAndUpdate(orderId, "Open");
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

module.exports = {
  handleWebhook,
};

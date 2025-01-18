const chatService = require("../services/chat.service");

exports.sendMessage = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { message, sender } = req.body;

    const chatMessage = await chatService.sendMessage(orderId, sender, message);
    res.status(200).json(chatMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessagesByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const messages = await chatService.getMessagesByOrder(orderId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

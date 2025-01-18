const { getIO } = require("../socketManager"); 
const ChatMessage = require("../models/chatMessage");

exports.sendMessage = async (orderId, sender, message) => {
  try {
    const chatMessage = new ChatMessage({
      orderId,
      sender,
      message,
    });

    await chatMessage.save();

    const io = getIO();
    io.to(orderId).emit("new-message", chatMessage); 

    return chatMessage;
  } catch (error) {
    throw new Error("Error sending message: " + error.message);
  }
};

exports.getMessagesByOrder = async (orderId) => {
  try {
    const messages = await ChatMessage.find({ orderId }).sort({ timestamp: 1 });
    return messages;
  } catch (error) {
    throw new Error("Error fetching messages: " + error.message);
  }
};

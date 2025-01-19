const ChatMessage = require("../models/chatMessage");

const saveMessage = async (room, username, messageText, createdAt) => {
  const message = new ChatMessage({
    room,
    sender: username,
    text: messageText,
    createdAt,
  });
  await message.save();
  return message;
};

const getMessagesForRoom = async (room) => {
  return await ChatMessage.find({ room });
};

module.exports = { saveMessage, getMessagesForRoom };

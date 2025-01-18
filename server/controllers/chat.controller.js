const { saveMessage, getMessagesForRoom } = require("../services/chat.service");

const joinRoom = async (req, res) => {
  const { room } = req.params;
  const messages = await getMessagesForRoom(room);
  res.json(messages);
};

const sendMessage = async (req, res) => {
  const { room, username, messageText } = req.body;
  const message = await saveMessage(room, username, messageText);
  res.json(message);
};

module.exports = { joinRoom, sendMessage };

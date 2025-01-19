const { saveMessage, getMessagesForRoom } = require("./services/chat.service");

const setupChatSocket = (io) => {
  io.on("connection", (socket) => {
    let currentRoom = "";

    // Join the chat room
    socket.on("join-chat", async ({ username, room }) => {
      socket.username = username; // Store username
      currentRoom = room; // Store room name

      socket.join(room); // Join the room in Socket.IO
      // console.log(`${username} joined chat in room ${room}`);

      const messages = await getMessagesForRoom(room); // Get previous messages

      socket.emit("previous-messages", messages); // Send previous messages to the new user

      // socket.broadcast.to(room).emit("message", {
      // Notify others that a user has joined
      // by: "System",
      // text: `${socket.username} has joined the chat`,
      // });
    });

    // Send a new message
    socket.on("message", async (messageData) => {
      const { room, sender, text } = messageData;
      if (!sender || !text) {
        console.log("Error: Missing required fields");
        return;
      }

      const message = await saveMessage(room, sender, text); // Save message to the database

      // io.to(room).emit("message", {
      //   // Broadcast the new message to the room
      //   by: sender,
      //   text,
      io.to(room).emit("message", {
        room,
        sender,
        text,
        createdAt: new Date().toISOString(),
      });

      // });
    });

    // Notify others that a user is typing
    // socket.on("user-typing-message", () => {
    //   socket.broadcast
    //     .to(currentRoom)
    //     .emit("user-typing-message", socket.username);
    // });

    // Handle disconnection
    socket.on("disconnect", () => {
      if (!socket.username) return;
      console.log(`${socket.username} left the chat`);

      // io.to(currentRoom).emit("message", {
      // Notify others when a user leaves the chat
      // by: "System",
      // text: `${socket.username} has left the chat`,
      // });
    });
  });
};

module.exports = setupChatSocket;

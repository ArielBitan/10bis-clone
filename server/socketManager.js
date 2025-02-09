const { Server } = require("socket.io");
const setupChatSocket = require("./chatSocket");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.FRONTEND_URL
          : "http://localhost:5173",
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  setupChatSocket(io);

  const handleSocket = (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join-room", async ({ roomId }) => {
      try {
        await socket.join(roomId);
        console.log(`Socket ${socket.id} joined room: ${roomId}`);
      } catch (error) {
        console.error(`Error joining room ${roomId}:`, error);
        socket.emit("error", { message: "Failed to join room" });
      }
    });

    // Handle courier location updates
    socket.on("courierLocation", async (data) => {
      try {
        const { orderId, location } = data;
        console.log(
          `Received courier location for order ${orderId}:`,
          location
        );

        socket.to(orderId.toString()).emit("courierLocation", {
          orderId,
          location,
        });
      } catch (error) {
        console.error("Error handling courier location:", error);
      }
    });

    socket.on("leave-room", async ({ roomId }) => {
      try {
        await socket.leave(roomId);
        console.log(`Socket ${socket.id} left room: ${roomId}`);
        socket.to(roomId).emit("user-left", { socketId: socket.id });
      } catch (error) {
        console.error(`Error leaving room ${roomId}:`, error);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
    });

    socket.on("error", (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  };

  io.on("connection", handleSocket);

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIO };

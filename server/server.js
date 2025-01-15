const http = require("http");
const app = require("./app");
const { scrapeData } = require("./config/scrapeData");
const { v2: cloudinary } = require("cloudinary");
const connectToDatabase = require("./config/database");
const { initializeSocket } = require("./socketManager");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize server with proper error handling
const initializeServer = async () => {
  try {
    await connectToDatabase();

    // Initialize Socket.io
    initializeSocket(server);

    server.listen(port);
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

initializeServer();

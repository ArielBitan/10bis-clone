const http = require("http");
const app = require("./app");
const { scrapeData } = require("./config/scrapeData");
const { v2 } = require("cloudinary");
const connectToDatabase = require("./config/database");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    server.listen(port);
    console.log(`Server running on port ${port}`);
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

scrapeData();

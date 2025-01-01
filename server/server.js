const http = require("http");
const app = require("./app");
const { automateSearch } = require("./config/scrapeData");

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

// automateSearch();

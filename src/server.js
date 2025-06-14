require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    // Test the database connection
    const res = await connectDB.query("SELECT NOW()");
    console.log("Connected to the database. Current time:", res.rows[0]);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to the database:", err.stack);
    process.exit(1); // Exit if database connection fails
  }
};

startServer();

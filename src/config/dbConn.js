const { Pool } = require("pg");

// Configure the connection to your 'recipe' database
const connectDB = new Pool({
  user: process.env.DB_USERNAME,
  host: "localhost",
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Export the pool for use in other files
module.exports = connectDB;

require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cons = require("consolidate");
const dust = require("dustjs-helpers");
const pg = require("pg");
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

// custom middleware logger
app.use(logger);

// Handle options credential check before cors
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle url encoded data i.e form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// assign dust engine to .dus files
app.engine("dust", cons.dust);

// set .dust as the default extension
app.set("view engine", "dust");
app.set("views", path.join(__dirname, "views"));

// ROUTE
app.use("/", require("./routes/api"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("dust")) {
    res.render("404");
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found." });
  } else {
    res.type("txt").send("404 Not Found.");
  }
});

app.use(errorHandler);

module.exports = app;

const express = require("express");
const api = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

//  ROUTES
api.use("/", require("./root"));

// protected routes
// api.use(verifyJWT);

module.exports = api;

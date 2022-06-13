const express = require("express");
const mongoose = require("mongoose");
const app = express();

// configs
require("dotenv").config();

const port = process.env.PORT || 3005;

const server = app.listen(port, () => [
  console.log("💥 server running port " + port),
]);

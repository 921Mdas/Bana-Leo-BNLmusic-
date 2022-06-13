const express = require("express");
const mongoose = require("mongoose");
const app = express();

// routes config
var indexRouter = require("./routes/index");
var artistsRouter = require("./routes/artists");
var tracksRouter = require("./routes/tracks");
var usersRouter = require("./routes/user");

// general configs
require("dotenv").config();

// basic setting confis
const port = process.env.PORT || 3005;

const server = app.listen(port, () => [
  console.log("💥 server running port " + port),
]);

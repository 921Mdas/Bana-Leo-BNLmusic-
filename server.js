const mongoose = require("mongoose");
const app = require("./config/app");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

// general configs
require("dotenv").config();
require("./config/db");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3005/" }));

// compile
// app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

// routers config
var indexRouter = require("./routes/index");
var artistsRouter = require("./routes/artists");
var tracksRouter = require("./routes/tracks");
var usersRouter = require("./routes/user");

// routers
app.use("/", indexRouter);
app.use("/artists", artistsRouter);
app.use("/tracks", tracksRouter);
app.use("/user", usersRouter);

// send html back
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// basic setting confis
const port = process.env.PORT || 3005;

const server = app.listen(port, () => [
  console.log("💥 server running port " + port),
]);

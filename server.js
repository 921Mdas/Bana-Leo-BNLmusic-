// External imports
const mongoose = require("mongoose");
const app = require("./config/app");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

// general configs
require("dotenv").config();
require("./config/db");
require("./config/passport.config");
require("./config/passportGoogle");
app.use(
  session({
    secret: "ABC",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 1000000,
  })
);
app.use(logger("dev"));

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
  })
);

// compile
app.use(express.static(path.join(__dirname, "build")));
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

// send html back - server side rendering
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// basic setting confis
const port = process.env.PORT || 3005;

const server = app.listen(port, () => [
  console.log("💥 server running port " + port),
]);

const mongoose = require("mongoose");
const app = require("./config/app");

// general configs
require("dotenv").config();
require("./config/db");
app.set("view engine", "ejs");

// routes config
var indexRouter = require("./routes/index");
var artistsRouter = require("./routes/artists");
// var tracksRouter = require("./routes/tracks");
// var usersRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/artists", artistsRouter);
// app.use("/tracks", tracksRouter);
// app.use("/user", usersRouter);

// basic setting confis
const port = process.env.PORT || 3005;

const server = app.listen(port, () => [
  console.log("💥 server running port " + port),
]);

// External imports
var express = require("express");
var app = express();
var router = express.Router();

// Internal imports
var ctrl = require("../controller/user.controller");

// user home route
router.get("/", (req, res, next) => {
  res.send("welcome to the user route 👋");
});

// manual register user
router.post("/register", ctrl.register);

// user manual login
router.post("/userlogin", (req, res, next) => {
  ctrl.sendUser(req, res, next);
});

// google
router.post("/google-login", (req, res, next) => {
  ctrl.NewGoogleUser(req, res, next);
});

module.exports = router;

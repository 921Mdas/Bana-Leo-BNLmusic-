var express = require("express");
var router = express.Router();
const passport = require("passport");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user.model");

// to add google OAuth in future here

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const users = [];

// isLoggedIn move from here to home protected route
function isLoggedIn(req, res, next) {
  req.user ? next() : res.send("you are logged out!");
}

router.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  console.log("payload", ticket.getPayload());
});

// google
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// router.get(
//   "/oauth2callback",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get("/oauth2callback", (req, res) => {
//   res.send("hello world");
// });

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    //   success bring them to the protected route
    successRedirect: process.env.CLIENT_URL,
    // failure bring them back home
    failureRedirect: "/login/failed",
    failureMessage: "cannot login",
  }),
  (req, res) => {
    res.send("thank you");
  }
);

router.get("/login/failed", (req, res) => {
  res.status(401).send("failed to login");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;

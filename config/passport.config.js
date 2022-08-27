const passport = require("passport");

const User = require("../models/user.model");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;
require("dotenv").config();

passport.use(
  new StrategyJWT(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    function (jwtPayload, done) {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then(user => {
          return done(null, user);
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

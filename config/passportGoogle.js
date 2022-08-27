const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:3005/oauth2callback",
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        name: profile.displayName,
        email: profile.emails[0].value,
        password: "",
        photo: profile.photos[0].value,
        googleId: profile.id,
      };

      const isExist = await User.isEmailTaken(profile.emails[0].value);
      const existingUser = User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log("exist");
        return cb(null, existingUser);
      }

      if (!existingUser) {
        User.create(defaultUser);
      }

      //   const user = await User.findOrCreate({
      //     where: { googleId: profile.id },
      //     defaults: defaultUser,
      //   }).catch(err => {
      //     console.log("error signing up");
      //     cb(err, null);
      //   });

      //   if (user && user[0]) {
      //     return cb(null, user && user[0]);
      //   }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

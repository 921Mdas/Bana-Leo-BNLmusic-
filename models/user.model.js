// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");
// const SALT_I = 10;
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // const userSchema = new Schema(
// //   {
// //     name: String,
// //     email: String,
// //     googleId: String,
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );
// const userSchema = new Schema(
//   {
//     name: { type: String, default: "" },
//     email: { type: String, default: "" },
//     password: { type: String, default: "" },
//     googleId: { type: String, default: "" },
//   },
//   {
//     timestamps: true,
//   }
// );

// // hashing
// userSchema.pre("save", async function (next) {
//   const user = this;
//   //   omly if user password is modified
//   //   avoid arrow function with bcrypt
//   if (user.isModified("password")) {
//     const salt = await bcrypt.genSalt(SALT_I);
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//     next();
//   } else {
//     next();
//   }
// });

// // generate token
// userSchema.methods.generateToken = function () {
//   const user = this;
//   const token = jwt.sign(process.env.TOKEN_SECRET, user.email);
//   return token;
// };

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   let user = this;
//   const match = await bcrypt.compare(candidatePassword, user.password);
//   return match;
// };

// module.exports = mongoose.model("User", userSchema);

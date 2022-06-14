// const User = require("../models/user.model");
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const users = [];

// function upsert(array, item) {
//   const i = array.findIndex(_item => _item.email === item.email);
//   if (i > -1) array[i] = item;
//   else array.push(item);
// }

// const NewUser = async (req, res, next) => {
//   const { token } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,
//   });

//   const { name, email, picture } = ticket.getPayload();
//   upsert(users, { name, email, picture });
//   res.status(201);
//   res.json({ name, email, picture });
// };

// const sendUser = async (req, res, next) => {
//   const {
//     localUser: { email, password },
//   } = req.body;
//   const foundUser = await User.findOne({ email: email });

//   if (!foundUser) return res.send("user not found");

//   const match = foundUser.comparePassword(password);

//   let Auth = false;
//   if (match) {
//     Auth = true;
//     let token = foundUser.generateToken();
//     let userDeets = parseUserDetails(foundUser);
//     return res
//       .cookie("Auth", token)
//       .json({ token: token, user: userDeets, isAuth: Auth });
//   }

//   if (!match) {
//     Auth = false;
//     return res.send("wrong password");
//   }
// };

// const register = async (req, res, next) => {
//   try {
//     await User.create(req.body, (err, user) => {
//       if (err) console.log(err);
//       return res.send(parseUserDetails(user));
//     });
//   } catch (error) {
//     if (error) return res.status(500).send({ message: "couldnt save", error });
//   }
// };

// const parseUserDetails = user => {
//   return {
//     email: user.email,
//   };
// };

// module.exports = {
//   NewUser,
//   sendUser,
//   register,
// };

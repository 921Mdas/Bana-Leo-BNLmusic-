// External import
const { OAuth2Client } = require("google-auth-library");
const { StatusCodes } = require("http-status-codes");

// Internal import
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../models/user.model");

const users = [];

// user info
function upsert(array, item) {
  const i = array.findIndex(_item => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

// Google New user sign in - POST
const NewGoogleUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    upsert(users, { name, email, picture });
    return res.status(StatusCodes.OK).json({ name, email, picture });
  } catch (error) {
    console.log(error);
    if (error)
      return res.status(StatusCodes.NOT_ACCEPTABLE).send("cant register");
  }
};

// JWT manual register new user - POST
const register = async (req, res, next) => {
  try {
    let isUserTaken = await User.isEmailTaken(req.body.email);
    if (await isUserTaken)
      return res.status(StatusCodes.NOT_ACCEPTABLE).send("user already exists");

    await User.create(req.body, (error, user) => {
      if (error) console.log(error);
      return res.status(StatusCodes.OK).send(parseUserDetails(user));
    });
  } catch (erroror) {
    if (erroror)
      return res.status(500).send({ message: "couldnt save", erroror });
  }
};

// JWT manual login - POST
const sendUser = async (req, res, next) => {
  try {
    const receivedUser = req.body;
    const email = receivedUser.email;
    const password = receivedUser.password;
    let Auth = false;

    const foundUser = await User.findOne({ email: email });
    if (!foundUser)
      return res.status(StatusCodes.NOT_FOUND).send("user not found, register");

    const match = await foundUser.comparePassword(password);

    if (match) {
      Auth = true;
      let token = foundUser.generateToken();
      let userDeets = parseUserDetails(foundUser);
      return res.json({ token: token, user: userDeets, isAuth: Auth });
    }

    if (!match) {
      Auth = false;
      return res.status(StatusCodes.UNAUTHORIZED).send("wrong password");
    }
  } catch (error) {
    console.log(error);
    if (error)
      return res.status(StatusCodes.NOT_ACCEPTABLE).send("User not found");
  }
};

// truncate user details
const parseUserDetails = user => {
  return {
    email: user.email,
  };
};

module.exports = {
  NewGoogleUser,
  sendUser,
  register,
};

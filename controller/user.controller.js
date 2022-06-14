const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const users = [];

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
  } catch (err) {
    console.log(err);
    if (err)
      return res.status(StatusCodes.NOT_ACCEPTABLE).send("cant register");
  }
};

// JWT manual register new user - POST
const register = async (req, res, next) => {
  try {
    let isUserTaken = await User.isEmailTaken(req.body.email);
    if (await isUserTaken)
      return res.status(StatusCodes.NOT_ACCEPTABLE).send("user already exists");

    await User.create(req.body, (err, user) => {
      if (err) console.log(err);
      return res.status(StatusCodes.OK).send(parseUserDetails(user));
    });
  } catch (error) {
    if (error) return res.status(500).send({ message: "couldnt save", error });
  }
};

// JWT manual login - POST
const sendUser = async (req, res, next) => {
  try {
    //   only with react - try simplify
    const {
      localUser: { email, password },
    } = req.body;

    // const { email, password } = req.body;

    let Auth = false;

    const foundUser = await User.findOne({ email: email });

    if (!foundUser)
      return res.status(StatusCodes.NOT_FOUND).send("user not found");

    const match = foundUser.comparePassword(password);

    if (match) {
      Auth = true;
      let token = foundUser.generateToken();
      let userDeets = parseUserDetails(foundUser);
      return res
        .cookie("bnlauth", token)
        .json({ token: token, user: userDeets, isAuth: Auth });
    }

    if (!match) {
      Auth = false;
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "wrong password",
        token: null,
        user: null,
        isAuth: Auth,
      });
    }
  } catch (err) {
    console.log(err);
    if (err)
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

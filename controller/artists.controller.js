// External import
const Artist = require("../models/artists.model");

// Internal import
const { StatusCodes } = require("http-status-codes");

// register new artist - POST
const addArtist = async (req, res) => {
  try {
    if (await Artist.alreadyExists(req.body.name))
      return res.send(req.body.name + " already exists 🛑");

    const newArtist = await Artist.create({
      name: req.body.name,
      picture: req.body.picture,
      song: req.body.song,
      country: req.body.country,
      bio: req.body.bio,
      year: req.body.year,
      copyright: "",
    });

    return res.status(StatusCodes.OK).send(`${newArtist.name} added 💥`);
  } catch (err) {
    if (err)
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ message: "🛑 can't create artists" });
    console.log(err);
  }
};

// retrieve all existing artists - GET
const sendArtists = async (req, res) => {
  try {
    const musicians = await Artist.find({});
    return res.status(StatusCodes.OK).send(musicians);
  } catch (err) {
    console.log(err);
    if (err)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "oops couldnt get artists" });
  }
};

// delete artist by ID - POST
const deleteArtists = (req, res) => {
  const id = req.params.id;
  const identity = id.split(":")[1];
  Artist.deleteOne({ _id: identity }, (err, artist) => {
    if (err) console.log(err);
    return res
      .status(StatusCodes.OK)
      .json({ "💥 successfully deleted": artist });
  });
};

// update artists by ID (req.body.id) - POST
const updateArtists = async (req, res) => {
  try {
    const id = req.params.id;
    const newInfo = req.body;

    const foundAndUpdated = await Artist.findByIdAndUpdate(id, { ...newInfo });
    return res
      .status(StatusCodes.OK)
      .send(" 💥 successfullty updated " + foundAndUpdated.name);
  } catch (err) {
    console.log(err);
    if (err)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("🛑 couldn't update, not found");
  }
};

module.exports = {
  addArtist,
  sendArtists,
  deleteArtists,
  updateArtists,
};

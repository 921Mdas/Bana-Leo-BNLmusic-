const Artist = require("../models/artists.model");
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
      copyright: req.body.copyright,
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

// catches all artists in the database and send them back to the home link
// in the client we are using axios to listen to the link and making an api call to get the info

// on click on the delete button we are sending a post request with axios
// to the remove link by passing an id on the link with ${} and we grabbing it here to find artist to delete

// the update button on the client is making a post request to the update route with id
// same as delete, it's sending new info with the form
// when we clicked on the update button all the artist info is sent on the link

const Artist = require("../models/artists.model");
const Tracks = require("../models/tracks.model");

const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

// register a new track in the DB - POST
const createTrack = async (req, res) => {
  // update to req.body.track
  // update req.body.title
  try {
    const id = req.params.id;
    const newTrack = await Tracks.create({
      title: req.body.name,
      track: req.body.song,
    });
    const Musician = await Artist.findById(id);
    await Musician.tracks.push(newTrack);

    const Track = await Tracks.findOne({ title: req.body.name });
    await Track.artists.push(Musician);

    await Musician.save();
    await Track.save();

    console.log(newTrack.artists);

    return res
      .status(StatusCodes.OK)
      .send("new track added 💥 " + newTrack.title);
  } catch (err) {
    if (err) console.log(err);
    return res.status(StatusCodes.NOT_FOUND).send("couldnt save new track");
  }
};

// get track by artists id - GET
const showTrack = async (req, res) => {
  try {
    const tracks = Artist.findById(req.params.id)
      .populate("tracks")
      .exec((err, person) => {
        console.log(person);
        return res.status(StatusCodes.OK).send(person);
      });
  } catch (err) {
    if (err)
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("couldnt retrieve artist tracks");
  }
};

// get all tracks in db - GET
const getallTracks = async (req, res) => {
  try {
    const alltracks = await Tracks.find({});
    return res.status(StatusCodes.OK).send(alltracks);
  } catch (err) {
    console.log(err);
    if (err) return res.status(StatusCodes.NOT_FOUND).send("no tracks found");
  }
};

module.exports = {
  showTrack,
  createTrack,
  getallTracks,
};

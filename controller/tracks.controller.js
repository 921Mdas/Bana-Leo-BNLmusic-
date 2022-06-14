// const Artist = require("../models/index.model");
// const Tracks = require("../models/tracks.model");
// const mongoose = require("mongoose");
// const httpStatus = require("http-status-codes");
// const bucket = "banaleo2";
// const s3config = require("../config/s3.config");
// const Grid = require("gridfs-stream");
// const db = mongoose.connection;
// let gfs;

// gfs = Grid(db, mongoose.mongo);

// // post request
// const gridCreateTrack = (req, res) => {
//   const id = req.params.id;
//   const { file } = req;

//   console.log("artists id:", id, "file received:", req.body);

//   Tracks.create(
//     {
//       title: req.body.name,
//       track: req.body.song,
//     },
//     (err, doc) => {
//       Artist.findById(id).then(singer => {
//         singer.tracks.push(doc);
//         console.log("here is the singer:", singer);
//         doc.artists.push(singer);
//         singer.save().then(err => {
//           res.json(doc);
//         });
//       });
//     }
//   );

//   console.log("track created, create POST");
// };

// // get request
// const showTrack = (req, res) => {
//   const tracks = Artist.findById(req.params.id)
//     .populate("tracks")
//     .exec((err, person) => {
//       res.send(person);
//     });
// };

// const getallTracks = (req, res) => {
//   Tracks.find({}, (err, doc) => {
//     console.log(doc);
//     res.send(doc);
//   });
// };

// module.exports = {
//   showTrack,
//   gridCreateTrack,
//   getallTracks,
// };

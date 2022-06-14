var express = require("express");
var router = express.Router();

var ctrl = require("../controller/tracks.controller");

// get all DB saved tracks
router.get("/alltracks", (req, res) => {
  ctrl.getallTracks(req, res);
});

// get musician's tracks by ID
router.get("/:id/uploadsongs", (req, res) => {
  ctrl.showTrack(req, res);
});

//create tracks by id
router.post("/:id/uploadsongs", (req, res) => {
  console.log("reached here");
  ctrl.createTrack(req, res);
});

module.exports = router;

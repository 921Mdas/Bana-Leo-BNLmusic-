// External imports
var express = require("express");
var router = express.Router();
const multer = require("multer");

// Internal imports
var ctrl = require("../controller/tracks.controller");

// multer storage config
const fileStorageEngine = multer.memoryStorage();
const upload = multer({
  storage: fileStorageEngine,
});

// get all DB saved tracks
router.get("/alltracks", (req, res) => {
  ctrl.getallTracks(req, res);
});

// get musician's tracks by ID
router.get("/:id/uploadsongs", (req, res) => {
  ctrl.showTrack(req, res);
});

//create tracks by id, define how many uploads allowed here
router.post("/:id/uploadsongs", upload.single("file"), (req, res) => {
  ctrl.createTrack(req, res);
});

module.exports = router;

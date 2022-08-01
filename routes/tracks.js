var express = require("express");
var router = express.Router();
const multer = require("multer");

var ctrl = require("../controller/tracks.controller");

const fileStorageEngine = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, "../middleware/uploads");
  },
});

const upload = multer({ storage: fileStorageEngine });

// get all DB saved tracks
router.get("/alltracks", (req, res) => {
  ctrl.getallTracks(req, res);
});

// get musician's tracks by ID
router.get("/:id/uploadsongs", (req, res) => {
  ctrl.showTrack(req, res);
});

//create tracks by id
router.post("/:id/uploadsongs", upload.single("file"), (req, res) => {
  ctrl.createTrack(req, res);
});

module.exports = router;

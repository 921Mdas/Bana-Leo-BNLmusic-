var express = require("express");
var router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;
var ctrl = require("../controller/tracks.controller");

// const upload = multer({ dest: "uploadFolder/" });

// const multiUpload = upload.fields([
//   { name: "lyrics", maxCount: 1 },
//   { name: "title", maxCount: 1 },
// ]);

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[0] === "audio/mpeg") {
//     cb(null, true);
//   } else {
//     cb(new Error("incorrect file type"), true);
//   }
// };

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploadFolder");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid()}-${originalname}`);
//   },
// });

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

//create tracks by id
router.post("/:id/uploadsongs", upload.single("file"), (req, res) => {
  ctrl.createTrack(req, res);
});

module.exports = router;

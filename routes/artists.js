var app = require("../config/app");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var ctrl = require("../controller/artists.controller");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get all artists in the DB
router.get("/", (req, res, next) => {
  ctrl.sendArtists(req, res);
});

// register a new artist
router.post("/", (req, res, next) => {
  ctrl.addArtist(req, res);
});

// delete an artist by id
router.post("/remove/:id", (req, res) => {
  ctrl.deleteArtists(req, res);
});

// update artist info
router.post("/update/:id", (req, res) => {
  ctrl.updateArtists(req, res);
});

module.exports = router;

/* GET users listing. */
// this artist route sends information and the front end with axios.get is listening and gets that info
// because backend is sending to the same route front end is listening to

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  albumName: { type: String, default: "unkown" },
  releaseYear: { type: String, default: "unkown" },
  imageCover: { type: String, default: "" },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
});

module.exports = mongoose.model("Album", AlbumSchema);

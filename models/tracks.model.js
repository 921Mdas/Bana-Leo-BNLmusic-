var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const trackSchema = new Schema(
  {
    title: {
      type: String,
      default: "unkown song",
    },
    track: {
      type: String,
    },
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    lyrics: {
      type: String,
      default: "no lyrics",
    },
    copyright: {
      type: Boolean,
      default: "socoda",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tracks", trackSchema);

// add artists and you can reference multiple
// bring your artists into tracks
// reference differently

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// song audio schema
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
      type: String,
      default: "socoda",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tracks", trackSchema);

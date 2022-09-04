const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// artist's schema
const artistSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      default: "unknown",
      require: true,
    },
    picture: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1597169428712-04e8348af42d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1501&q=80",
    },
    song: {
      type: String,
      default: "unkown",
      maxlength: 100,
    },
    country: {
      type: String,
      default: "DR Congo",
    },
    bio: {
      type: String,
      default:
        "Unkown is a Congolese musician. Since childhood,spent every single moment in the music scenes attending. Very quickly his passion for music grew, and instead of going to classes, he started drumming for various groups of Kinshasa.",
    },
    year: {
      type: Number,
      default: 1986,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "tracks",
      },
    ],
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
  },
  { timestamps: true }
);

artistSchema.statics.alreadyExists = async function (name) {
  let Artist = this;
  let ArtistRegistered = await Artist.findOne({ name: name });
  return !!ArtistRegistered;
};

module.exports = mongoose.model("Artist", artistSchema);

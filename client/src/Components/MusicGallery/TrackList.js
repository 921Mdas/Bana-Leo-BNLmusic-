// External Imports
import React from "react";
import { BsSpotify } from "react-icons/bs";
import { FaSoundcloud } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { SiTidal } from "react-icons/si";
import { GiDrum } from "react-icons/gi";
import { math, random } from "canvas-sketch-util";
import { COLORPICKER } from "../../Context/helper";

// Internal Imports
import img from "../../images-client/concert.jpeg";
import AudioPlayerCtrl from "../UtilComponent/AudioPlayer";

const TRACK_LIST = ({ tracks }) => {
  return (
    <div className="track" id="track_all">
      <div className="info">
        <div className="image_avatar_song">
          <GiDrum
            className="playlist_icon_logo"
            color={random.pick(COLORPICKER(12))}
          />
        </div>
        <div className="audio_playlist_item">
          <p>{tracks.title}</p>
          <AudioPlayerCtrl audio={tracks.track} />
        </div>
      </div>
    </div>
  );
};

export default TRACK_LIST;

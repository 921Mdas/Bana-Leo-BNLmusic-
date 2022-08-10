import React from "react";
import { BsSpotify } from "react-icons/bs";
import { FaSoundcloud } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { SiTidal } from "react-icons/si";
import img from "../../images-client/concert.jpeg";

const TRACK_LIST = ({ tracks }) => {
  return (
    <div className="track" id="track_all">
      <div className="info">
        <div className="image_avatar_song">
          <img src={img} alt="" />
        </div>
        <div className="audio_playlist_item">
          <p>{tracks.title}</p>
          <audio
            src={tracks.track}
            controls
            className="audio_play_item"
          ></audio>
        </div>
        <div className="icon_audio_player">
          <BsSpotify className="music_icon_player" />
          <FaSoundcloud className="music_icon_player" />
          <SiApplemusic className="music_icon_player" />
          <SiTidal className="music_icon_player" />
        </div>
      </div>
    </div>
  );
};

export default TRACK_LIST;

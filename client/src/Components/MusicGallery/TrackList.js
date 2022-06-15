import React from "react";

const TRACK_LIST = ({ tracks }) => {
  return (
    <div className="track" id="track_all">
      <div className="artist_info">
        <div className="info">
          <h5>{tracks.title}</h5>
          <audio src={tracks.track} controls className="audiofilectrl"></audio>
        </div>
        <div className="track_actions"></div>
      </div>
    </div>
  );
};

export default TRACK_LIST;

import React, { useState } from "react";

import Actionbar from "./Actionbar";

const SongCtrl = ({ track }) => {
  return (
    <div className="detail_song">
      <div className="detail_info">
        <h5>{track.title}</h5>
        <audio src={track.track} controls />
      </div>
      <div className="track_actions">
        <Actionbar />
      </div>
    </div>
  );
};

export default SongCtrl;

import React, { useState } from "react";

import Actionbar from "./Actionbar";

const TrackCtrl = ({ track }) => {
  return (
    <div className="artist_info_bio artist_info">
      <div className="info">
        <h5>{track.title}</h5>
        <audio src={track.track} controls />
      </div>
      <div className="track_actions">
        <Actionbar />
      </div>
    </div>
  );
};

export default TrackCtrl;

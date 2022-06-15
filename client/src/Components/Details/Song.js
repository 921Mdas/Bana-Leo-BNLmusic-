import React, { useState, useEffect } from "react";

// components
import SongCtrl from "./SongCtrl";
import Loader from "../UtilComponent/Loader";

const Song = ({ state, dispatch, COMMANDS, playlist, name }) => {
  if (playlist?.length > 0) {
    return playlist.map(track => {
      return <SongCtrl track={track} key={track._id} />;
    });
  } else {
    return <Loader />;
  }
};

export default Song;

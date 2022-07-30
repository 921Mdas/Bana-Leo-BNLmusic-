import React, { useState, useEffect, useRef } from "react";

// components
import SongCtrl from "./SongCtrl";
import Loader from "../UtilComponent/Loader";
import { CongoPlayLists } from "./Stack";
import e from "cors";

const Song = ({ playlist }) => {
  const AddTrackToStack = MusicList => {
    MusicList.map(track => {
      CongoPlayLists.push(track);
    });
  };

  useEffect(() => {
    if (playlist.length > 0) CongoPlayLists.reset();
    AddTrackToStack(playlist);
  }, [playlist]);

  console.log("verify change", playlist, CongoPlayLists.length);

  if (playlist.length > 0) {
    return <SongCtrl />;
  } else {
    return <Loader />;
  }
};

export default Song;

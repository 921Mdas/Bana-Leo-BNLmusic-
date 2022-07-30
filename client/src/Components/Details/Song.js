import React, { useState, useEffect, useRef } from "react";

// components
import SongCtrl from "./SongCtrl";
import Loader from "../UtilComponent/Loader";
import { CongoPlayLists } from "./Stack";

const Song = () => {
  const savedData = localStorage.getItem("detailSongs")
    ? JSON.parse(localStorage.getItem("detailSongs"))
    : null;

  const AddTrackToStack = MusicList => {
    MusicList.map(track => {
      CongoPlayLists.push(track);
    });
  };

  useEffect(() => {
    if (CongoPlayLists.length > 0) CongoPlayLists.reset();
    AddTrackToStack(savedData?.tracks);
  }, [savedData]);

  if (CongoPlayLists.length > 0) {
    return <SongCtrl ctrlMusic={CongoPlayLists} playList={savedData} />;
  } else {
    return <Loader />;
  }
};

export default Song;

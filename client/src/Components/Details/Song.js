import React, { useState, useEffect, useRef } from "react";

// components
import SongCtrl from "./SongCtrl";
import Loader from "../UtilComponent/Loader";
import { CongoPlayLists } from "./Stack";

const Song = ({ playlist }) => {
  playlist.map(track => {
    CongoPlayLists.push(track);
  });

  if (playlist.length > 0) {
    return <SongCtrl />;
  } else {
    return <Loader />;
  }
};

export default Song;

import React, { useState, useEffect, useRef } from "react";

// components
import SongCtrl from "./SongCtrl";
import Loader from "../UtilComponent/Loader";
import { CongoPlayLists } from "./Stack";

const Song = () => {
  const savedData = localStorage.getItem("detailSongs")
    ? JSON.parse(localStorage.getItem("detailSongs"))
    : null;

  if (CongoPlayLists.length > 0) {
    return <SongCtrl ctrlMusic={CongoPlayLists} playList={savedData} />;
  } else {
    return <Loader />;
  }
};

export default Song;

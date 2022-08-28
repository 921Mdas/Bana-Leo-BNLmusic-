// External Imports
import React from "react";

// Internal Imports
import SongCtrl from "./SongCtrl";
import Loader from "../UtilComponent/Loader";
import { CongoPlayLists } from "./Stack";

const Song = ({ setCanvaAudio }) => {
  const savedData = localStorage.getItem("detailSongs")
    ? JSON.parse(localStorage.getItem("detailSongs"))
    : null;
  // prettier-ignore
  if (CongoPlayLists.length > 0) {
    return (
      <SongCtrl
        ctrlMusic={CongoPlayLists}
        playList={savedData}
        setCanvaAudio={setCanvaAudio}
      />
    );
  } else {
    // prettier-ignore
    return (
      <div className="loader">
        <Loader />
      </div>
    )
  }
};

export default Song;

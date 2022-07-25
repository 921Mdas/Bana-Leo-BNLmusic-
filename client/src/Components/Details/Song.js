import React, { useState, useEffect, useRef } from "react";

// components
import SongCtrl from "./SongCtrl";
import Loader from "../UtilComponent/Loader";

const Song = ({ state, dispatch, COMMANDS, playlist, name }) => {
  const [play, setPlay] = useState(false);
  const nowPlaying = useRef(null);

  const starTrack = () => {
    setPlay(!play);
  };

  if (playlist?.length > 0) {
    return playlist.map(track => {
      return (
        <SongCtrl
          track={track}
          key={track._id}
          starTrack={starTrack}
          nowPlaying={nowPlaying}
        />
      );
    });
  } else {
    return <Loader />;
  }
};

export default Song;

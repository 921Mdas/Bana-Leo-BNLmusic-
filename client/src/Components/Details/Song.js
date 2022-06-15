import React, { useState, useEffect } from "react";

// components
import SongCtrl from "./SongCtrl";
import Loader from "../UtilComponent/Loader";

const Song = ({ state, dispatch, COMMANDS, playlist, name }) => {
  const [savedPlayList, getSavedPlaylist] = useState(
    localStorage.getItem("playlists")
      ? JSON.parse(localStorage.getItem("playlists"))
      : null
  );

  const savePlaylist = async () => {
    const data = await playlist;
    if (!data) return;
    localStorage.setItem("playlists", JSON.stringify(data));
  };

  useEffect(() => {
    savePlaylist();
  }, [playlist]);

  // need to change this

  if (playlist?.length > 0) {
    return playlist.map(track => {
      return <SongCtrl track={track} key={track._id} />;
    });
  } else {
    return <Loader />;
  }
};

export default Song;

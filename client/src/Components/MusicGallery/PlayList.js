// state
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/index.context";
import Navbar from "../navbar";
import Footer from "../Footer";
import Goback from "../UtilComponent/Goback";
import Loader from "../UtilComponent/Loader";

// components
import TRACK_LIST from "./TrackList";

const toCapitaliseKeyword = input => {
  const Capitalised = input.charAt(0).toUpperCase() + input.substring(1);
  return Capitalised;
};

function PlayList({ state }) {
  const tracks = JSON.parse(localStorage.getItem("songs"));

  const [query, setQuery] = useState("");
  const [playList, setPlayList] = useState(
    state.alltracks.length > 0 ? state.alltracks : tracks
  );

  console.log(state.alltracks);

  const handleChange = e => {
    const value = e.target.value;
    const CapitalisedKeywordInput = toCapitaliseKeyword(value);
    setQuery(CapitalisedKeywordInput);

    if (query) {
      let sortedPlaylist = playList.filter(song => {
        return song.title.startsWith(query);
      });

      setPlayList(sortedPlaylist);
    }

    if (query.length <= 1) {
      setPlayList(state.alltracks.length > 0 ? state.alltracks : tracks);
    }
  };

  const handleSubmit = () => {
    if (query) {
      let sortedPlaylist = playList.filter(song => {
        return song.title.startsWith(query);
      });

      setPlayList(sortedPlaylist);
    }
  };

  return (
    <>
      <Navbar />
      <div className="alltracks">
        <div className="alltracks-content">
          <Goback direction={"/home"} />
          <div className="playlist_search_bar">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search songs, artists, albums"
              onChange={e => handleChange(e)}
            />
            <button onClick={() => handleSubmit()}>Search</button>
          </div>

          {playList?.length > 0 ? (
            playList?.map(track => {
              return (
                <div className="single_track" key={track._id}>
                  <TRACK_LIST tracks={track} state={state} />
                </div>
              );
            })
          ) : (
            <div className="loader">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PlayList;

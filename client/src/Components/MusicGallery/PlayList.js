// External Imports
import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import { AiOutlineSearch } from "react-icons/ai";

// Internal Imports
import TRACK_LIST from "./TrackList";
import Navbar from "../navbar";
import Goback from "../UtilComponent/Goback";
import Loader from "../UtilComponent/Loader";

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
            <button onClick={() => handleSubmit()}>
              <AiOutlineSearch className="search_icon_alltracks" />
            </button>
          </div>

          {playList?.length > 0 ? (
            playList?.map(track => {
              return (
                <div className="single_track" key={track._id}>
                  <Slide triggerOnce direction="up">
                    <TRACK_LIST tracks={track} state={state} />
                  </Slide>
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

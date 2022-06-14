// state
import React, { useContext, useEffect } from "react";
import { MyContext } from "../Context/index.context";
import Navbar from "./navbar";
import Footer from "./Footer";

// components
import TRACK_LIST from "./TrackList";

function AllTracks() {
  const { state } = useContext(MyContext);
  const tracks = JSON.parse(localStorage.getItem("songs"));
  const MyPlayList = state.alltracks.length > 0 ? state.alltracks : tracks;

  return (
    <>
      <Navbar />
      <div className="alltracks">
        <div className="alltracks-content">
          {MyPlayList.length > 0 ? (
            MyPlayList.map(track => {
              return (
                <div className="single_track" key={track._id}>
                  <TRACK_LIST tracks={track} state={state} />
                </div>
              );
            })
          ) : (
            <h1>No tracks found</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default AllTracks;

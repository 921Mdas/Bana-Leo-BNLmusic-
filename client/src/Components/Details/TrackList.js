import React from "react";
import { FiDisc } from "react-icons/fi";

const TrackList = ({ songs }) => {
  return (
    <div className="track_list_section">
      <div className="track_list_title">Popular Songs:</div>
      <div className="track_list_songs">
        {songs?.length > 0
          ? songs.map((song, idx) => (
              <div className="popular_song" key={idx}>
                <FiDisc /> {song?.title.split(".mp3")[0]}
              </div>
            ))
          : "No songs uploaded"}
      </div>
    </div>
  );
};

export default TrackList;

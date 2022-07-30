import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";

import Actionbar from "./Actionbar";
import { CongoPlayLists } from "./Stack";

const SongCtrl = ({ playList, ctrlMusic }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  const ChangeSong = () => {};

  useEffect(() => {
    setCurrentTrack(ctrlMusic.start());
    console.log("current track", currentTrack);
  }, [playList]);

  return (
    <div className="detail_song">
      <div className="detail_info">
        <h5>{currentTrack?.value?.title}</h5>
        <ReactPlayer
          controls={true}
          url={currentTrack?.value?.track}
          width={"100%"}
          height={"100%"}
          volume={0.2}
        />
      </div>
      <div className="track_actions">
        <Actionbar nextTrack={currentTrack} ChangeSong={ChangeSong} />
      </div>
    </div>
  );
};

export default SongCtrl;

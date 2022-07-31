import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";

import Actionbar from "./Actionbar";

const SongCtrl = ({ playList, ctrlMusic }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  let [counter, setCounter] = useState(0);

  const NextSong = () => {
    if (ctrlMusic.length >= counter) {
      setCurrentTrack(ctrlMusic.start());
      setCounter(0);
    }
    if (currentTrack === null) {
      setCurrentTrack(ctrlMusic.start());
      setCounter(0);
    }

    setCurrentTrack(currentTrack.next);
    setCounter((counter += 1));
  };

  const PrevSong = () => {
    setCurrentTrack(ctrlMusic.prev());
  };

  useEffect(() => {
    setCurrentTrack(ctrlMusic.start());
  }, [playList, ctrlMusic]);

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
        <Actionbar
          nextTrack={currentTrack}
          NextSong={NextSong}
          PrevSong={PrevSong}
        />
      </div>
    </div>
  );
};

export default SongCtrl;

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { IoIosMusicalNote } from "react-icons/io";
import { CgPlayTrackNextR } from "react-icons/cg";
import { FiPlayCircle } from "react-icons/fi";

import Actionbar from "./Actionbar";
import CreateAudio from "../Canvas/CreateAudio";

const SongCtrl = ({ playList, ctrlMusic, setCanvaAudio, addListener }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  let [counter, setCounter] = useState(0);
  let [showEqualizer, setShowEqualizer] = useState(false);

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
    // setCanvaAudio(currentTrack);
    setCounter((counter += 1));
  };

  const PrevSong = () => {
    setCurrentTrack(ctrlMusic.prev());
    // setCanvaAudio(currentTrack);
  };

  useEffect(() => {
    setCurrentTrack(ctrlMusic.start());
    // setCanvaAudio(currentTrack);
  }, [ctrlMusic, currentTrack]);

  return (
    <div className="detail_song">
      <div className="detail_info">
        <div className="detail_info_music">
          <div className="title_playing playing_now">
            <h6>
              <IoIosMusicalNote /> Now Playing:
            </h6>
            <h6 className="bio_title_song_playing">
              {currentTrack?.value?.title.split(".mp3")[0].substring(0, 20)}
            </h6>
          </div>
          <div className="title_playing coming_up_next">
            <h6>
              <CgPlayTrackNextR className="icon_coming_up" /> Coming up:
            </h6>
            <h6 className="bio_title_song_playing playing_next">
              {currentTrack?.next?.value?.title}
            </h6>
          </div>
        </div>

        {/* <ReactPlayer
          controls={true}
          url={currentTrack?.value?.track}
          width={"100%"}
          height={"100%"}
          volume={0.2}
          onStart={() => addListener()}
          onPause={() => setShowEqualizer(false)}
        /> */}
      </div>
      <div className="track_actions">
        <Actionbar
          NextSong={NextSong}
          PrevSong={PrevSong}
          showEqualizer={showEqualizer}
        />
      </div>
    </div>
  );
};

export default SongCtrl;

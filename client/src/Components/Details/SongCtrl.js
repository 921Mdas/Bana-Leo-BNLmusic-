// External Imports
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { IoIosMusicalNote } from "react-icons/io";
import { CgPlayTrackNextR } from "react-icons/cg";

// Internal Imports
import Actionbar from "./Actionbar";
import AudioPlayerCtrl from "../UtilComponent/AudioPlayer";

const SongCtrl = ({ ctrlMusic, addListener }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  let [counter, setCounter] = useState(0);
  let [showEqualizer, setShowEqualizer] = useState(false);

  const NextSong = () => {
    if (ctrlMusic.length >= counter) {
      setCurrentTrack(ctrlMusic.start());
      setCounter(0);
    }

    if (currentTrack.next.next === null) {
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
  }, [ctrlMusic]);

  return (
    <div className="detail_song">
      <div className="detail_info">
        <div className="detail_info_music">
          <div className="title_playing playing_now">
            <h6 className="main_song_playing">
              <IoIosMusicalNote /> Now Playing:
            </h6>
            <h6 className="bio_title_song_playing playing_now">
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
      </div>
      <div className="audio_player">
        <AudioPlayerCtrl audio={currentTrack?.value?.track} />
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

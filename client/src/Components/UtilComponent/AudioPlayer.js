import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AudioPlayerCtrl = ({ audio }) => {
  return (
    <AudioPlayer
      src={audio}
      onPlay={e => console.log("")}
      style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
        background: "none",
      }}
      // other props here
    />
  );
};

export default AudioPlayerCtrl;

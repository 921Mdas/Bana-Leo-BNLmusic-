import React from "react";

let audio, audioContext, sourceNode, analyzerNode, audioData;

const CreateAudio = url => {
  try {
    audio = document.createElement("audio");
    audio.src = url;
    audio.crossOrigin = "anonymous";
    audioContext = new AudioContext();
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(audioContext.destination);
    analyzerNode = audioContext.createAnalyser();
    sourceNode.connect(analyzerNode);
    analyzerNode.fftSize = 512;
    audioData = new Float32Array(analyzerNode.frequencyBinCount);
    return { audioData, audioContext, analyzerNode };
  } catch (error) {
    console.log(error);
  }
};

export default CreateAudio;

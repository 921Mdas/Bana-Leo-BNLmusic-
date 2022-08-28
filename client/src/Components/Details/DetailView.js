// External Imports
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { math } from "canvas-sketch-util";

// Internal Imports
import UploadForm from "./UploadForm";
import Song from "./Song";
import Goback from "../UtilComponent/Goback";
import { CongoPlayLists } from "./Stack";
import Navbar from "../navbar";
import TrackList from "./TrackList";

let dateCreator = (data, val) => {
  if (data)
    return (
      new Date(data[val]).getDay().toString() +
      "-" +
      (new Date(data[val]).getMonth() + 1).toString() +
      "-" +
      new Date(data[val]).getFullYear().toString()
    );
};

let audio, audioContext, sourceNode, analyzerNode, audioData, newSong, manager;

function DetailView({ state, dispatch, COMMANDS, playMusic, sendMusic }) {
  const playlist = state.playlist;
  const [list] = playlist;
  const savedData = localStorage.getItem("detailSongs")
    ? JSON.parse(localStorage.getItem("detailSongs"))
    : null;
  const image = savedData?.picture ? <img src={savedData?.picture} /> : null;
  const [canvaaudio, setCanvaAudio] = useState(null);
  const navigate = useNavigate();

  // canvas
  const canvasRef = useRef(null);
  const player = useRef(null);

  newSong = CongoPlayLists.start();

  const NextSong = async () => {
    newSong = await newSong?.next();
  };

  const CreateAudio = async () => {
    audio = await document.createElement("audio");
    audio.src = await newSong?.value.track;
    audio.crossOrigin = "anonymous";

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sourceNode = audioContext.createMediaElementSource(audio);
    analyzerNode = audioContext.createAnalyser();
    sourceNode.connect(analyzerNode);
    analyzerNode.connect(audioContext.destination);
    analyzerNode.fftSize = 512;

    audioData = new Float32Array(analyzerNode.frequencyBinCount);
  };

  useEffect(() => {
    CreateAudio();
  });

  const addListener = () => {
    player.current?.addEventListener("mouseup", () => {
      console.log(audio);

      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let x = canvas.width * 0.5;
    let y = canvas.height * 0.5;

    let animationFrameId;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const bins = [179, 30, 11, 30, 12, 24, 53, 8, 179];

    let numCircles = 5;
    let slices = 6;
    let radius = 200;
    let slice = (Math.PI * 2) / slices;

    const render = () => {
      // call createaudio
      if (!audioData) return;
      analyzerNode?.getFloatFrequencyData(audioData);

      context.save();
      // instead of the above point, we can also draw a quadratic curve
      context.lineWidth = 2;
      context.strokeStyle = "white";
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.translate(x, y);
      context.beginPath();
      for (let i = 0; i < bins.length; i++) {
        const bin = bins[i];
        const mapped = math.mapRange(
          audioData[bin],
          analyzerNode.minDecibels,
          analyzerNode.maxDecibels,
          0,
          1,
          true
        );
        const radius = Math.floor(mapped * 100);
        context.save();
        context.beginPath();
        context.rotate((30 * i * Math.PI) / 60);
        context.lineWidth = i * 10;

        context.arc(0, 0, radius + i * 50, 0, slice);

        context.stroke();
        context.restore();
      }

      context.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    addListener();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      analyzerNode?.disconnect();
      sourceNode?.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <canvas
        className="canvas"
        ref={canvasRef}
        width={window.innerWidth}
        height={500}
      ></canvas>
      <div className="tracks">
        <Goback direction={"/home"} />
        <div className="Tracks-Preview">
          <div className="top_preview_section">
            <UploadForm
              sendMusic={sendMusic}
              playMusic={playMusic}
              savedData={savedData}
            />

            <div className="artist-preview">
              <div className="aritst-pic">{image}</div>

              <div className="bio-titles">
                <h6>PLAYLIST</h6>
                <h2>{savedData?.name || "No artist"}</h2>
                <p>{savedData?.bio}</p>

                <TrackList songs={savedData?.tracks} />

                <div className="metadata">
                  <p>
                    Created By: <span>Banaleo</span> /
                  </p>
                  <p>
                    Artist added on: {dateCreator(savedData, "createdAt")} /{" "}
                  </p>
                  <p>Last updated: {dateCreator(savedData, "updatedAt")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="Detail_Playlist">
            <Song
              playlist={savedData?.tracks}
              name={savedData?.name}
              state={state}
              dispatch={dispatch}
              COMMANDS={COMMANDS}
              setCanvaAudio={setCanvaAudio}
              addListener={addListener}
            />

            <button ref={player}>Play</button>
            <button onClick={() => NextSong}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailView;

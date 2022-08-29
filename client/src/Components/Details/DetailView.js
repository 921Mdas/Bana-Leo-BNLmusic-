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
import { dateCreator } from "../../Context/helper";

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

  return (
    <>
      <Navbar />
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
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailView;

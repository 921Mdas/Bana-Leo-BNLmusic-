// External Imports
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { math } from "canvas-sketch-util";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Internal Imports
import UploadForm from "./UploadForm";
import Song from "./Song";
import Goback from "../UtilComponent/Goback";
import { CongoPlayLists } from "./Stack";
import Navbar from "../navbar";
import TrackList from "./TrackList";
import { dateCreator } from "../../Context/helper";
import SliderComp from "../UtilComponent/Slider";
import { concertInfo } from "../../Context/data_dummy";

function DetailView({ state, dispatch, COMMANDS, playMusic, sendMusic }) {
  const playlist = state.playlist;
  const [list] = playlist;
  const savedData = localStorage.getItem("detailSongs")
    ? JSON.parse(localStorage.getItem("detailSongs"))
    : null;
  const image = savedData?.picture ? <img src={savedData?.picture} /> : null;
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
  };

  return (
    <>
      <Navbar />
      <div className="tracks">
        <Goback direction={"/home"} />
        <div className="Tracks-Preview">
          <div className="artist_slider">
            <SliderComp settings={settings} data={concertInfo} />
          </div>
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

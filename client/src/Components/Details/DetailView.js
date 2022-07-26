// state & components
import React, { useState, useContext, useEffect, useRef } from "react";
import { MyContext } from "../../Context/index.context";

// components
import UploadForm from "./UploadForm";
import Song from "./Song";

// icons
import { AiOutlineInstagram, AiFillYoutube } from "react-icons/ai";
import { BsTwitch } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";

import Navbar from "../navbar";
import Footer from "../Footer";

function DetailView({
  state,
  dispatch,
  COMMANDS,
  LoadArtists,
  removeArtist,
  updateArtist,
  playMusic,
  registerArtist,
  sendMusic,
}) {
  const playlist = state.playlist;
  const [list] = playlist;

  const savedData = localStorage.getItem("detailSongs")
    ? JSON.parse(localStorage.getItem("detailSongs"))
    : null;

  const image = savedData?.picture ? <img src={savedData?.picture} /> : null;

  return (
    <>
      <Navbar />
      <div className="tracks">
        <div className="Tracks-Preview">
          <UploadForm
            sendMusic={sendMusic}
            playMusic={playMusic}
            savedData={savedData}
          />

          <div className="artist-preview">
            <div className="aritst-pic">{image}</div>

            <div className="bio-titles">
              <h2>{savedData?.name || "No artist"}</h2>
              <div className="social_icons">
                <FaFacebookSquare className="fb social_ic" />{" "}
                <AiFillYoutube className="yt social_ic" />{" "}
                <BsTwitch className="tw social_ic" />{" "}
                <AiOutlineInstagram className="insta social_ic" />
              </div>
              <h5>Banaleo copyright</h5>
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

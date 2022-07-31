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

let dateCreator = (data, val) => {
  return (
    new Date(data[val]).getDay().toString() +
    "-" +
    (new Date(data[val]).getMonth() + 1).toString() +
    "-" +
    new Date(data[val]).getFullYear().toString()
  );
};

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

  console.log(savedData.updatedAt);

  return (
    <>
      <Navbar />
      <div className="tracks">
        <div className="Tracks-Preview">
          {/* <UploadForm
            sendMusic={sendMusic}
            playMusic={playMusic}
            savedData={savedData}
          /> */}

          <div className="artist-preview">
            <div className="aritst-pic">{image}</div>

            <div className="bio-titles">
              <h6>PLAYLIST</h6>
              <h2>{savedData?.name || "No artist"}</h2>
              <p>{savedData?.bio}</p>
              <div className="metadata">
                <p>
                  Created By: <span>Banaleo</span> /
                </p>
                <p>{savedData.tracks.length} tracks uploaded / </p>
                <p>Artist added: {dateCreator(savedData, "createdAt")} / </p>
                <p>Last updated: {dateCreator(savedData, "updatedAt")}</p>
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

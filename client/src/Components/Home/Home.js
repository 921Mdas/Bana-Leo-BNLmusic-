// External Exports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// components
import Welcome from "../UtilComponent/welcome";
import Navbar from "../navbar";
import Searchbar from "../UtilComponent/Searchbar";
import Intro from "./Intro";
import Artists from "../Artists/Artists";
import Origines from "../Home/Origines";
import { BsFillPersonPlusFill } from "react-icons/bs";

function Home({
  state,
  dispatch,
  COMMANDS,
  LoadArtists,
  removeArtist,
  updateArtist,
  playMusic,
  getAllTracks,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar getAllTracks={getAllTracks} />
      <div className="landingpage">
        <Welcome state={state} />
        <Intro />
        <Searchbar state={state} dispatch={dispatch} COMMANDS={COMMANDS} />
      </div>
      <div className="contentPage">
        <div>
          <Artists
            state={state}
            dispatch={dispatch}
            COMMANDS={COMMANDS}
            LoadArtists={LoadArtists}
            removeArtist={removeArtist}
            updateArtist={updateArtist}
            playMusic={playMusic}
          />
          <Button
            className="nextpage"
            variant="success"
            onClick={() => navigate("/form")}
          >
            <BsFillPersonPlusFill />
          </Button>
        </div>
      </div>
      <div className="originesContentPage">
        <Origines state={state} dispatch={dispatch} COMMANDS={COMMANDS} />
      </div>
    </>
  );
}

export default React.memo(Home);

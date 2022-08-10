// state
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Welcome from "../UtilComponent/welcome";
import Navbar from "../navbar";
import Searchbar from "../UtilComponent/Searchbar";
import Intro from "./Intro";
import Artists from "../Artists/Artists";
import ArtistForm from "../Artists/ArtistForm";
import Footer from "../Footer";
import Origines from "../Home/Origines";

// icons
import { BsFillPersonPlusFill } from "react-icons/bs";

// Bootstrap
import { Button } from "react-bootstrap";

function Home({
  state,
  dispatch,
  COMMANDS,
  LoadArtists,
  removeArtist,
  updateArtist,
  playMusic,
  registerArtist,
  sendMusic,
  getAllTracks,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const FIRST_PAGE = 1;
  const SECOND_PAGE = 2;
  const isPageChange = currentPage === FIRST_PAGE;

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
            setCurrentPage={setCurrentPage}
            FIRST_PAGE={FIRST_PAGE}
            SECOND_PAGE={SECOND_PAGE}
            currentPage={currentPage}
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

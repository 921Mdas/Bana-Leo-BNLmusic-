// state
import React, { useState } from "react";
import { Link } from "react-router-dom";

// bootstrap
import { Button, Form } from "react-bootstrap";
import Goback from "../UtilComponent/Goback";

// libraries
import axios from "axios";
import { toast } from "react-toastify";

// components
import MusicianForm from "./MusicianForm";
import { useNavigate } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import { NavigateSomewhere } from "../../Context/helper";

const ArtistForm = ({
  state,
  dispatch,
  COMMANDS,
  registerArtist,
  updateArtist,
  setCurrentPage,
  FIRST_PAGE,
  SECOND_PAGE,
  currentPage,
}) => {
  const navigate = useNavigate();

  const MoveBack = direction => {
    navigate(direction);
  };

  const handleOnChange = e => {
    e.preventDefault();
    const inputname = e.target.name;
    const value = e.target.value;
    dispatch({ type: COMMANDS.SET_ARTISTS, payload: { inputname, value } });
  };

  // const addArtistForm = async () => {
  //   const { name, picture, song, bio, country, year, copyright: cop } = state;
  //   await registerArtist({ name, picture, song, bio, country, year, cop });
  //   setCurrentPage(FIRST_PAGE);
  // };
  const addArtistForm = async () => {
    const {
      newArtist: { name = "unkown", picture, song, bio, country, year },
    } = state;

    await state.newArtist;

    registerArtist({ name, picture, song, bio, country, year });
  };

  const updateArtistForm = async () => {
    const id = state.update[1];
    const { name, picture, song, bio, country, year, copyright: cop } = state;
    await axios
      .post(`/artists/update/${id}`, {
        id,
        name,
        picture,
        song,
        bio,
        country,
        year,
        cop: cop === "on",
      })
      .then(res => {
        console.log(
          `artist update request successfully sent : ${res.data.name}`
        );
      });

    toast.success(` ${name} updated`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });

    MoveBack("/home");
  };

  return (
    <header className="App-header-form">
      {state.update[0] ? (
        <UpdateForm
          state={state}
          dispatch={dispatch}
          COMMANDS={COMMANDS}
          addArtistForm={addArtistForm}
          MoveBack={MoveBack}
          updateArtist={updateArtist}
          updateArtistForm={updateArtistForm}
          registerArtist={registerArtist}
          handleOnChange={handleOnChange}
          updateArtistForm={updateArtistForm}
        />
      ) : (
        <MusicianForm
          state={state}
          dispatch={dispatch}
          COMMANDS={COMMANDS}
          addArtistForm={addArtistForm}
          MoveBack={MoveBack}
          updateArtist={updateArtist}
          updateArtistForm={updateArtistForm}
          registerArtist={registerArtist}
        />
      )}
    </header>
  );
};

export default ArtistForm;

// state
import React, { useState } from "react";
import { Link } from "react-router-dom";

// bootstrap
import { Button, Form } from "react-bootstrap";

// libraries
import axios from "axios";
import { toast } from "react-toastify";

// components
import MusicianForm from "./MusicianForm";

const ArtistForm = ({
  state,
  dispatch,
  COMMANDS,
  registerArtist,
  setCurrentPage,
  FIRST_PAGE,
  SECOND_PAGE,
  currentPage,
}) => {
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
      newArtist: { name, picture, song, bio, country, year },
    } = state;
    await registerArtist({ name, picture, song, bio, country, year });
    setCurrentPage(FIRST_PAGE);
  };

  const updateArtistForm = () => {
    const id = state.update[1];
    const { name, picture, song, bio, country, year, copyright: cop } = state;
    dispatch({ type: COMMANDS.GOTO_PREVIOUS_PAGE });
    setCurrentPage(FIRST_PAGE);
    toast.success(` ${name} updated`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });

    axios
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
  };

  return (
    <header className="App-header-form">
      <MusicianForm
        state={state}
        dispatch={dispatch}
        COMMANDS={COMMANDS}
        addArtistForm={addArtistForm}
      />
    </header>
    // <header className="App-header-form">
    //   <h3>Add a new Artist</h3>
    //   <Form className="artist-submission">
    //     <Form.Label htmlFor="name">
    //       <Form.Control
    //         placeholder="enter name"
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={state.name}
    //         onChange={e => handleOnChange(e)}
    //       />
    //     </Form.Label>
    //     <Form.Label htmlFor="picture">
    //       <Form.Control
    //         placeholder="enter URL for picture"
    //         type="text"
    //         id="picture"
    //         name="picture"
    //         value={state.picture}
    //         onChange={e => handleOnChange(e)}
    //       />
    //     </Form.Label>
    //     <Form.Label htmlFor="song">
    //       <Form.Control
    //         type="text"
    //         id="song"
    //         name="song"
    //         placeholder="Hit song title"
    //         value={state.song}
    //         onChange={e => handleOnChange(e)}
    //       />
    //     </Form.Label>
    //     <Form.Label htmlFor="country">
    //       <Form.Control
    //         type="text"
    //         id="country"
    //         name="country"
    //         placeholder="Country"
    //         value={state.country}
    //         onChange={e => handleOnChange(e)}
    //       />
    //     </Form.Label>
    //     <Form.Label htmlFor="year">
    //       <Form.Control
    //         type="number"
    //         id="year"
    //         name="year"
    //         value={state.year}
    //         placeholder="Hit song year of release"
    //         onChange={e => handleOnChange(e)}
    //       />
    //     </Form.Label>
    //     <Form.Label htmlFor="bio">
    //       <Form.Control
    //         as="textarea"
    //         rows={3}
    //         id="bio"
    //         name="bio"
    //         value={state.bio}
    //         placeholder="Quick description"
    //         onChange={e => handleOnChange(e)}
    //       />
    //     </Form.Label>
    //   </Form>
    //   <div className="submission_btns">
    //     <Link to="/home">
    //       <Button className="cancel" onClick={() => setCurrentPage(FIRST_PAGE)}>
    //         Cancel
    //       </Button>
    //     </Link>

    //     {state.update[0] ? (
    //       <Button className="submission" onClick={updateArtistForm}>
    //         Update info
    //       </Button>
    //     ) : (
    //       <Button className="submission" onClick={addArtistForm}>
    //         Submit artist
    //       </Button>
    //     )}
    //   </div>
    // </header>
  );
};

export default ArtistForm;

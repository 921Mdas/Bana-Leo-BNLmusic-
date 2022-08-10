import React from "react";
import ArtistForm from "../Artists/ArtistForm";
import Navbar from "../navbar";
import { GoDiffAdded } from "react-icons/go";
import Goback from "../UtilComponent/Goback";

const Form = ({ state, dispatch, COMMANDS, registerArtist, updateArtist }) => {
  return (
    <>
      <Navbar />
      <div className="artist_form_editor">
        <Goback direction={"/home"} />
        <div className="form_header">
          {state.update[0] ? (
            <h1>Update {state.name}</h1>
          ) : (
            <>
              <GoDiffAdded className="form_header_icon" />
              <h1>Add a new artist</h1>
            </>
          )}
        </div>
        <ArtistForm
          state={state}
          dispatch={dispatch}
          COMMANDS={COMMANDS}
          registerArtist={registerArtist}
          updateArtist={updateArtist}
        />
      </div>
    </>
  );
};

export default Form;

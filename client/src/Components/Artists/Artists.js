// state
import React, { useEffect, useState } from "react";

// components
import CardArtist from "../card";

// libraries
// import { useSpring, animated } from "react-spring";

function Artists({
  state,
  LoadArtists,
  removeArtist,
  updateArtist,
  playMusic,
  getAllTracks,
  dispatch,
  COMMANDS,
  setCurrentPage,
  FIRST_PAGE,
  SECOND_PAGE,
  currentPage,
}) {
  const handleDeleteArtist = id => {
    removeArtist(id);
  };

  const handleUpdateArtist = id => {
    updateArtist(id);
    setCurrentPage(SECOND_PAGE);
  };

  useEffect(() => {
    LoadArtists();
  }, []);

  const ArtistList = () => {
    const { artists } = state;
    return (
      artists.length !== 0 &&
      artists.map(artist => {
        const { name, country, song, bio, picture, year, copyright, _id } =
          artist;

        return (
          <div key={_id} className="artists">
            <CardArtist
              name={name}
              song={song}
              picture={picture}
              country={country}
              bio={bio}
              year={year}
              copyright={copyright}
              _id={_id}
              handleDeleteArtist={handleDeleteArtist}
              handleUpdateArtist={handleUpdateArtist}
              playMusic={playMusic}
              FIRST_PAGE={FIRST_PAGE}
              SECOND_PAGE={SECOND_PAGE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        );
      })
    );
  };

  return (
    <div className="cardGallery ">
      {state.artists?.length > 0 ? (
        <ArtistList />
      ) : (
        <h1 className="noartists">no artists please add </h1>
      )}
    </div>
  );
}

export default Artists;

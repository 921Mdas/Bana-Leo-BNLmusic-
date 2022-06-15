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
}) {
  const [opacity, setOpacity] = useState({
    SHOW_OPACITY: 1,
    HIDE_OPACITY: 0,
  });

  const handleDeleteArtist = id => {
    removeArtist(id);
  };

  const handleUpdateArtist = id => {
    updateArtist(id);
  };

  // const styles = useSpring({
  //   to: { opacity: opacity.SHOW_OPACITY, y: 0 },
  //   from: { opacity: opacity.HIDE_OPACITY, y: 100 },
  //   delay: 500,
  //   config: { duration: 500 },
  // });

  console.log(state);

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

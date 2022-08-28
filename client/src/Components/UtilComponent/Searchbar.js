// External Imports
import React, { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";

// Internal Imports

const Searchbar = ({ state, COMMANDS, dispatch }) => {
  // search bar functions
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = e => {
    e.preventDefault();
    const keywordInput = e.target.value;
    setSearchQuery(keywordInput);
  };

  const toCapitaliseKeyword = input => {
    const Capitalised = input.charAt(0).toUpperCase() + input.substring(1);
    return Capitalised;
  };

  const launchSearch = () => {
    // if no keywords update state with original artist list
    if (!searchQuery) {
      dispatch({ type: COMMANDS.SEARCH_ARTIST, payload: state.allArtists });
      return;
    }
    const CapitalisedKeywordInput = toCapitaliseKeyword(searchQuery);

    const matchingArtists = state.artists.filter(artist =>
      artist.name.startsWith(CapitalisedKeywordInput)
    );

    if (matchingArtists.length === 0) console.log("no artist found");

    dispatch({ type: COMMANDS.SEARCH_ARTIST, payload: matchingArtists });
  };

  useEffect(() => {
    launchSearch();
  }, [searchQuery]);

  return (
    <form action="" className="searchbar">
      <label htmlFor="search" className="searchbar">
        <BiSearchAlt className="seachIcon" />
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={e => handleSearchChange(e)}
        />
      </label>
    </form>
  );
};

export default Searchbar;

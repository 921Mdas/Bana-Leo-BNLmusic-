import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { COMMANDS } from "./type";
import { resetStorage } from "./helper";
import { CongoPlayLists } from "../Components/Details/Stack";

const MyContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case COMMANDS.GET_ALL_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        singers: [...state.singers, action.payload],
      };
    case COMMANDS.STORE_ALL_ARTISTS:
      return { ...state, allArtists: [...action.payload] };
    case COMMANDS.GETALL_TRACKS:
      return { ...state, alltracks: [...action.payload] };
    case COMMANDS.GET_TRACKS_BY_ID:
      resetStorage("detailSongs", action.payload);
      return { ...state, playlist: [action.payload] };
    case COMMANDS.LOGGEDIN:
      return { ...state, loggedInUser: action.payload };
    case COMMANDS.REMOVE_AN_ARTIST:
      return { ...state, artists: action.payload };
    case COMMANDS.UPDATE_ARTIST:
      const { country, name, song, bio, year, picture, copyright } =
        action.payload.artistToUpdate;
      return {
        ...state,
        stage: 2,
        update: [true, action.payload.id],
        name: name,
        song: song,
        bio: bio,
        picture: picture,
        year: year,
        country: country,
        copyright: copyright,
        singers: [...state.singers, ...state.artists],
      };
    case COMMANDS.GOTO_NEXT_PAGE:
      return { ...state, stage: 2 };
    case COMMANDS.GOTO_PREVIOUS_PAGE:
      return { ...state, stage: 1 };
    case COMMANDS.SEARCH_ARTIST:
      return { ...state, artists: action.payload };
    case COMMANDS.SET_ARTISTS:
      return { ...state, [action.payload.inputname]: action.payload.value };
    case COMMANDS.UPDATE_USERONLINE:
      const {
        name: user_name,
        email: mail,
        picture: profile_pic,
      } = action.payload;
      return {
        ...state,
        username: user_name,
        email: mail,
        profilepic: profile_pic,
      };
    case COMMANDS.PLAYTRACK:
      return { ...state, trackisPlaying: !state.trackisPlaying };
    default:
      return state;
  }
};

const defaultState = {
  name: "",
  picture: "",
  country: "",
  year: "",
  bio: "",
  copyright: false,
  stage: 1,
  update: [false, 0],
  playlist: [],
  singers: [],
  artists: [],
  allArtists: [],
  alltracks: [],
  username: "",
  email: "",
  profilepic: "",
  trackisPlaying: false,
  loggedInUser: {},
};

function MyProvider(props) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [dataTracker, setdataTracker] = useState(
    localStorage.getItem("detailSongs")
      ? JSON.parse(localStorage.getItem("detailSongs"))
      : null
  );

  // create a new artist
  const registerArtist = async args => {
    try {
      console.log("new artist info", args);
      await axios.post("/artists", args);
      toast.success(` successfully added`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
      dispatch({ type: COMMANDS.GOTO_PREVIOUS_PAGE });
    } catch (error) {
      if (error)
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      console.log(error);
    }
  };

  // initial api call to retrieve and localstore artists list
  const LoadArtists = async () => {
    try {
      await axios.get(`/artists`).then(res => {
        dispatch({ type: COMMANDS.GET_ALL_ARTISTS, payload: res.data });
        dispatch({ type: COMMANDS.STORE_ALL_ARTISTS, payload: res.data });
      });
    } catch (error) {
      if (error)
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      console.log(error);
    }
  };

  // delete artist
  const removeArtist = id => {
    const { artists } = state;
    axios.post(`/artists/remove/:${id}`);
    const removedArtist = artists.find(artist => artist._id === id);
    const newArtists = artists.filter(artist => artist._id !== id);
    dispatch({ type: COMMANDS.REMOVE_AN_ARTIST, payload: newArtists });

    toast.error(` ${removedArtist.name} removed`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  };

  // update artists
  const updateArtist = async id => {
    try {
      const { artists } = state;
      const artistToUpdate = artists.find(artist => artist._id === id);
      dispatch({
        type: COMMANDS.UPDATE_ARTIST,
        payload: { artistToUpdate, id },
      });
    } catch (err) {
      if (err) console.log(err);
      toast.error(`💥 successfully updated`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
  };

  // retrieving music of specific artists by id
  const playMusic = async id => {
    CongoPlayLists.reset();

    try {
      await axios.get(`/tracks/${id}/uploadsongs`).then(res => {
        dispatch({ type: COMMANDS.GET_TRACKS_BY_ID, payload: res.data });
        let newMusic = res.data?.tracks;
        if (CongoPlayLists.length === 0) {
          newMusic.map(music => CongoPlayLists.push(music));
        }
      });
    } catch (error) {
      if (error)
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      console.log(error);
    }
  };

  // uploading music
  const sendMusic = async data => {
    try {
      const receivedData = await data;
      const musicSent = await axios.post(
        `/tracks/${dataTracker._id}/uploadsongs`,
        receivedData
      );
      toast.success("💥 new track uploaded", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
      console.log(error);
    }
  };

  // retrieve all songs
  const getAllTracks = async () => {
    try {
      const tracks = await axios.get(`/tracks/alltracks`);
      await dispatch({ type: COMMANDS.GETALL_TRACKS, payload: tracks.data });
      localStorage.setItem("songs", JSON.stringify(tracks.data));
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
      console.log(error);
    }
  };

  return (
    <>
      <MyContext.Provider
        value={{
          dispatch,
          COMMANDS,
          state,
          LoadArtists,
          playMusic,
          sendMusic,
          getAllTracks,
          removeArtist,
          registerArtist,
          updateArtist,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </>
  );
}

export { MyContext, MyProvider };

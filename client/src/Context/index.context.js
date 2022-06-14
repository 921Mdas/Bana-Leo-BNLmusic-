import React, { useState, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURLtype, COMMANDS } from "./type";
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
      return { ...state, playlist: [action.payload] };
    case COMMANDS.LOGGEDIN:
      console.log(action.payload);
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

// const localDevArt = `${baseURLtype}/artists`;
// const localDevPlayMusic = `${baseURLtype}/tracks/${id}/uploadsongs`;
// const localDevUpload = `${baseURLtype}/tracks/${idTracker}/uploadsongs`;
// const localDevRemoveArt = `${baseURLtype}/artists/remove/:${id}`;

// const onlineDevArt = `/artists`;
// const onlineDevPlayMusic = `/tracks/${id}/uploadsongs`;
// const onlineDevUpload = `/tracks/${idTracker}/uploadsongs`;
// const onlineDevRemoveArt = `/artists/remove/:${id}`;

function MyProvider(props) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [idTracker, setIdTracker] = useState(null);

  // initial api call to retrieve and localstore artists list
  const LoadArtists = async () => {
    try {
      await axios.get(`/artists`).then(res => {
        dispatch({ type: COMMANDS.GET_ALL_ARTISTS, payload: res.data });
        dispatch({ type: COMMANDS.STORE_ALL_ARTISTS, payload: res.data });
      });
    } catch (error) {
      if (error)
        toast.error("oops something is wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      console.log(error);
    }
  };

  // retrieving music of specific artists by id
  const playMusic = async id => {
    try {
      setIdTracker(id);
      await axios.get(`/tracks/${id}/uploadsongs`).then(res => {
        dispatch({ type: COMMANDS.GET_TRACKS_BY_ID, payload: res.data });
        console.log("this singer music", res.data);
      });
    } catch (err) {
      if (err)
        toast.error("couldnt retrieve music", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      console.log(err);
    }
  };

  // uploading music
  const sendMusic = async data => {
    try {
      const receivedData = await data;
      await axios.post(`/tracks/${idTracker}/uploadsongs`, receivedData);
      toast.success("💥 new track uploaded", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    } catch (err) {
      toast.error("couldn't upload the new song", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
      console.log(err);
    }
  };

  // retrieve all songs
  const getAllTracks = async () => {
    try {
      await axios.get(`/tracks/alltracks`).then(res => {
        dispatch({ type: COMMANDS.GETALL_TRACKS, payload: res.data });
        localStorage.setItem("songs", JSON.stringify(res.data));
      });
    } catch (err) {
      toast.error("couldn't retrieve playlist", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
      console.log(err);
    }
  };

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
          updateArtist,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </>
  );
}

export { MyContext, MyProvider };

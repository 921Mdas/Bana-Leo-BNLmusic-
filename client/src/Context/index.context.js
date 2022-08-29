// External Imports
import React, { useState, useReducer } from "react";
import axios from "axios";

// Internal Imports
import { CongoPlayLists } from "../Components/Details/Stack";
import { COMMANDS } from "./type";
import { ToasterError, ToasterSuccess, resetStorage } from "./helper";

const MyContext = React.createContext();
let headers = new Headers();

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
    case COMMANDS.RESETUPDATE:
      return { ...state, update: [false, 0] };
    case COMMANDS.GOOGLE_LOGIN:
      return { ...state, google_login: true, google_data: action.payload };
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
    case COMMANDS.CREATE_NEW_ARTISTS:
      return { ...state, newArtist: action.payload };
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
  song: "",
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
  google_login: false,
  loggedInUser: {},
  google_data: {},
};

function MyProvider(props) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [uploadId, setUploadId] = useState("");

  // create a new artist
  const registerArtist = async args => {
    try {
      const artistAdded = await axios.post("/artists", args);
      ToasterSuccess(artistAdded.data);
    } catch (error) {
      if (error) ToasterError(error?.response?.data?.message);
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
      if (error) ToasterError(error?.response?.data?.message);
      console.log(error);
    }
  };

  // delete artist work perfect
  const removeArtist = id => {
    try {
      const { artists } = state;
      axios.post(`/artists/remove/:${id}`);
      const removedArtist = artists.find(artist => artist._id === id);
      const newArtists = artists.filter(artist => artist._id !== id);
      dispatch({ type: COMMANDS.REMOVE_AN_ARTIST, payload: newArtists });
      ToasterSuccess(`${removedArtist.name} removed`);
    } catch (error) {
      if (error) console.log(error);
      ToasterError(error?.response.data.message);
    }
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
    } catch (error) {
      if (error) console.log(error);
      ToasterError(error?.response.data.message);
    }
  };

  // retrieving music of specific artists by id
  const playMusic = async id => {
    CongoPlayLists.reset();
    setUploadId(id);

    try {
      await axios
        .get(`/tracks/${id}/uploadsongs`, {
          crossdomain: true,
          headers: headers,
        })
        .then(res => {
          dispatch({ type: COMMANDS.GET_TRACKS_BY_ID, payload: res.data });
          let newMusic = res.data?.tracks;
          if (CongoPlayLists.length === 0) {
            newMusic.map(music => CongoPlayLists.push(music));
          }
        });
    } catch (error) {
      if (error) ToasterError(error?.response.data.message);
      console.log(error);
    }
  };

  // uploading music
  const sendMusic = async (data, filename) => {
    let progress;
    try {
      const receivedData = await data;
      const trackUploaded = await axios.post(
        `/tracks/${uploadId}/uploadsongs`,
        receivedData,
        {
          onUploadProgress: data => {
            progress = Math.round((data.loaded / data.total) * 100);
          },
        }
      );

      playMusic(trackUploaded?.data);
      ToasterSuccess(`💥 ${filename} uploaded`);
      return progress;
    } catch (error) {
      ToasterError(error?.response?.data.message);
      console.log(error);
    }
  };

  // retrieve all songs
  const getAllTracks = async () => {
    try {
      const tracks = await axios.get(`/tracks/alltracks`, (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
      });
      await dispatch({ type: COMMANDS.GETALL_TRACKS, payload: tracks.data });
      localStorage.setItem("songs", JSON.stringify(tracks.data));
    } catch (error) {
      ToasterError(error?.response.data.message);
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

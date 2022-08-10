// state
import React, { useContext } from "react";
import { MyContext } from "./Context/index.context";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Components/Home/Home";
import Form from "./Components/Form/Form";
// main components
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import PlayList from "./Components/MusicGallery/PlayList";
import ErrorPage from "./Components/error";
import DetailView from "./Components/Details/DetailView";
import Login from "./Components/Login";

// Libraries
import { ToastContainer } from "react-toastify";

// constants

function App() {
  const {
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
  } = useContext(MyContext);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login getAllTracks={getAllTracks} />} />
          <Route
            path="/home"
            element={
              <Home
                state={state}
                dispatch={dispatch}
                COMMANDS={COMMANDS}
                LoadArtists={LoadArtists}
                removeArtist={removeArtist}
                updateArtist={updateArtist}
                playMusic={playMusic}
                registerArtist={registerArtist}
                sendMusic={sendMusic}
                getAllTracks={getAllTracks}
              />
            }
          ></Route>
          <Route
            path="/form"
            element={
              <Form
                state={state}
                dispatch={dispatch}
                COMMANDS={COMMANDS}
                LoadArtists={LoadArtists}
                removeArtist={removeArtist}
                updateArtist={updateArtist}
                playMusic={playMusic}
                registerArtist={registerArtist}
                sendMusic={sendMusic}
                getAllTracks={getAllTracks}
              />
            }
          ></Route>
          <Route
            path="/bio/:id"
            element={
              <DetailView
                state={state}
                dispatch={dispatch}
                COMMANDS={COMMANDS}
                LoadArtists={LoadArtists}
                removeArtist={removeArtist}
                updateArtist={updateArtist}
                playMusic={playMusic}
                registerArtist={registerArtist}
                sendMusic={sendMusic}
              />
            }
          ></Route>
          <Route
            path="/tracks"
            element={
              <PlayList
                state={state}
                dispatch={dispatch}
                COMMANDS={COMMANDS}
                LoadArtists={LoadArtists}
                removeArtist={removeArtist}
                updateArtist={updateArtist}
                playMusic={playMusic}
                registerArtist={registerArtist}
                sendMusic={sendMusic}
              />
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );

  //  <LandingPage state={state} dispatch={dispatch} COMMANDS={COMMANDS} />

  // );
}

export default App;

// once back end and front end are connected with axios, we can now make a request
// if on the back end we are sending info, with axios on the front end we are listening (get method)
// we must have a route on the backend end pointing to the link we are listening to
// listening to /artists can cause us some problems because on the client side its a different localhost than the server side
// localhost:3000/artists (front end) doenst exist and // localhost:3001/artists (backend exists)
// to solve this, we have to proxy the the backend link in the client package.json (now even the front end will also point to the backend address)
//  add artist

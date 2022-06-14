// state
import React, { useContext } from "react";
import { MyContext } from "./Context/index.context";

// Bootstrap
import { Button } from "react-bootstrap";

// components
import HomepageContent from "./Components/HomepageContent";
import Artists from "./Components/artists";
import ARTISTFORM from "./Components/form";
import LandingPage from "./Components/LandingPage";

// icons
import { BsFillPersonPlusFill } from "react-icons/bs";

// constants
const PAGE_NUM = 1;

function App() {
  const {
    state,
    dispatch,
    COMMANDS,
    LoadArtists,
    removeArtist,
    updateArtist,
    playMusic,
  } = useContext(MyContext);

  const AddNewArtist = () => {
    dispatch({ type: COMMANDS.GOTO_NEXT_PAGE });
  };

  const isPageChange = state.stage === PAGE_NUM;

  return (
    <div className="App">
      <LandingPage state={state} dispatch={dispatch} COMMANDS={COMMANDS} />
      <div className="contentPage">
        {isPageChange ? (
          <Artists
            state={state}
            dispatch={dispatch}
            COMMANDS={COMMANDS}
            LoadArtists={LoadArtists}
            removeArtist={removeArtist}
            updateArtist={updateArtist}
            playMusic={playMusic}
          />
        ) : (
          <ARTISTFORM state={state} dispatch={dispatch} COMMANDS={COMMANDS} />
        )}
        {isPageChange && (
          <Button className="nextpage" variant="success" onClick={AddNewArtist}>
            <BsFillPersonPlusFill />
          </Button>
        )}
      </div>
      <HomepageContent state={state} dispatch={dispatch} COMMANDS={COMMANDS} />
    </div>
  );
}

export default App;

// once back end and front end are connected with axios, we can now make a request
// if on the back end we are sending info, with axios on the front end we are listening (get method)
// we must have a route on the backend end pointing to the link we are listening to
// listening to /artists can cause us some problems because on the client side its a different localhost than the server side
// localhost:3000/artists (front end) doenst exist and // localhost:3001/artists (backend exists)
// to solve this, we have to proxy the the backend link in the client package.json (now even the front end will also point to the backend address)
//  add artist

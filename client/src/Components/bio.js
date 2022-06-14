// state & components
import React, { useState, useContext, useEffect, useRef } from "react";
import { MyContext } from "../Context/index.context";

//  Boostrap
import { Button, Form } from "react-bootstrap";

// icons
import {
  AiOutlineHeart,
  AiTwotoneHeart,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { BsBookmarkCheckFill, BsBookmark, BsTwitch } from "react-icons/bs";
import { BiEqualizer } from "react-icons/bi";
import { FaFacebookSquare } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiUpload } from "react-icons/hi";

import Navbar from "./navbar";
import Footer from "./Footer";

function Bio(props) {
  const { state, dispatch } = useContext(MyContext);
  const playlist = state.playlist;
  const [list] = playlist;

  const image =
    list?.picture === undefined ? <NoImage /> : <img src={list?.picture} />;

  return (
    <>
      <Navbar />
      <div className="tracks">
        <div className="Tracks-Preview">
          <Upload />

          <div className="artist-preview">
            <div className="aritst-pic">{image}</div>

            <div className="bio-titles">
              <h1>{list?.name || "No artist"}</h1>
              <div className="social_icons">
                <FaFacebookSquare className="fb social_ic" />{" "}
                <AiFillYoutube className="yt social_ic" />{" "}
                <BsTwitch className="tw social_ic" />{" "}
                <AiOutlineInstagram className="insta social_ic" />
              </div>
              <h5>Banaleo copyright</h5>
            </div>
          </div>

          <div className="AllTracks">
            <SONG playlist={list?.tracks} name={list?.name} />
          </div>
        </div>
      </div>
    </>
  );
}

const Upload = () => {
  const { sendMusic } = useContext(MyContext);
  const [songstate, setSongState] = useState({
    songname: "",
    song: "",
  });

  const handleChange = e => {
    e.preventDefault();
    const targetName = e.target.name;
    if (targetName === "songname") {
      setSongState({ ...songstate, songname: e.target.value });
    } else {
      let targetValue = e.target.value;

      setSongState({ ...songstate, song: targetValue });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", songstate.songname);
    data.append("song", songstate.song);

    await sendMusic(data);
    setSongState({ songname: "", song: " " });
    // https://httpbin.org/anything  - use this  link to test if the post is working should return data back to you
    // axios.post('http://localhost:3001/tracks/:id/uploadsongs', data).then(res => console.log(res)).catch(err =>{
    //    console.log(err)
    // })
  };

  return (
    <Form
      className="uploadform"
      action="/tracks/:id/uploadsongs"
      method="POST"
      encType="multipart/form-data"
    >
      <BiEqualizer className="equalizer_icon" />
      <Form.Label htmlFor="songname">
        <Form.Control
          type="text"
          name="songname"
          id="songname"
          placeholder="enter track name"
          value={songstate.songname}
          onChange={e => handleChange(e)}
        />
      </Form.Label>
      <Form.Label htmlFor="song">
        <Form.Control
          type="text"
          name="song"
          id="song"
          placeholder="Song url / Aws format"
          onChange={e => handleChange(e)}
        />
      </Form.Label>
      <Button className="uploadBtn" onClick={e => handleSubmit(e)}>
        <HiUpload className="upload_icon_btn" />
      </Button>
    </Form>
  );
};

const SONG = props => {
  const { state, dispatch, COMMANDS } = useContext(MyContext);

  const [savedPlayList, getSavedPlaylist] = useState(
    localStorage.getItem("playlists")
      ? JSON.parse(localStorage.getItem("playlists"))
      : null
  );

  const { playlist, name } = props;

  console.log("this is the saved playlist", savedPlayList);

  const savePlaylist = async () => {
    const data = await playlist;
    if (!data) return;
    localStorage.setItem("playlists", JSON.stringify(data));
  };

  useEffect(() => {
    savePlaylist();
  }, [playlist]);

  // need to change this

  if (playlist?.length > 0) {
    return playlist.map(track => {
      return (
        <div className="bio_track" key={track._id}>
          <Controls track={track} />
        </div>
      );
    });
  } else if (savedPlayList) {
    return savedPlayList.map(list => {
      console.log("here is the list", list);
      return (
        <div className="bio_track" key={list._id}>
          <Controls track={list} />
        </div>
      );
    });
  } else {
    return <NoMusic />;
  }
};

const Controls = ({ track }) => {
  const [play, setPlay] = useState(false);
  const { state, dispatch, COMMANDS } = useContext(MyContext);

  const handleTrack = track => {
    // const sound = new Howl({src:[track],
    // html5:true});
    setPlay(!play);
    // play ? sound.seek() : sound.play();
  };

  return (
    <div className="artist_info_bio artist_info">
      {/* {
                 play  ?
                 <BsFillPauseCircleFill className='playBTn' onClick={()=>handleTrack(track.track)} /> :
                 <BsFillPlayCircleFill className='playBTn' onClick={()=>handleTrack(track.track)} /> 
               } */}

      <div className="info">
        <h5>{track.title}</h5>
        <audio src={track.track} controls />
      </div>
      <div className="track_actions">
        <SongList />
      </div>
    </div>
  );
};

const NoMusic = () => {
  const [nom, setNom] = useState(true);

  useEffect(() => {
    const timing = setTimeout(() => {
      setNom(!nom);
    }, 2000);

    return () => {
      clearTimeout(timing);
    };
  }, []);

  if (nom) {
    return <h1>Loading...</h1>;
  } else {
    return <h3 className="nomusic">Oops no tracks</h3>;
  }
};

const NoImage = () => {
  return <div className="avatar"></div>;
};

const SongList = () => {
  const [bookmark, setBookmark] = useState(false);
  const [like, setLike] = useState(false);

  const Like = () => {
    setLike(!like);
  };

  const Bookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <div className="content_likeBook">
      <div className="like">
        {like ? (
          <AiTwotoneHeart
            className="trackIcon heart heart-full"
            onClick={() => Like()}
          />
        ) : (
          <AiOutlineHeart onClick={() => Like()} className="trackIcon heart " />
        )}
      </div>
      <div className="bookmark">
        {bookmark ? (
          <BsBookmarkCheckFill
            onClick={() => Bookmark()}
            className="trackIcon book-full"
          />
        ) : (
          <BsBookmark className="trackIcon" onClick={() => Bookmark()} />
        )}
      </div>
      <div className="download">
        <FiDownload className="trackIcon" />
      </div>
    </div>
  );
};

export default Bio;

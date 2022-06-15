// state
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/index.context";

// icons
import { AiOutlineHome } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { GiDrum } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { state: userOnline, getAllTracks } = useContext(MyContext);

  const LogOut = () => {
    localStorage.removeItem("loginData");
    localStorage.clear();
  };

  return (
    <div className="navigation glass">
      <Link to="/home" className="logoContainer">
        <GiDrum className="logoIcon" /> <span>BANALEO</span>
      </Link>

      <div className="contentnavSection">
        <Link to="/home" className="logoContainer">
          <AiOutlineHome />
        </Link>
        <Link to="/tracks" className="logoContainer">
          <BsMusicNoteList />
        </Link>
        <Link to="/" className="logoContainer ">
          <IoIosLogOut onClick={() => LogOut()} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

// create a pathname with details and a query
/* <Link to={{
      pathname:'/addArtist',
      hash:"#Luambo",
      search:'?true=enabled'
  }} >
  ADD ARTIST
  </Link> */

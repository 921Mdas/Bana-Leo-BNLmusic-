// Internal imports
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../Context/index.context";
import { LogOut } from "../Context/helper";

// External imports
import { AiOutlineHome } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { GiDrum } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { GoogleLogin, GoogleLogout } from "@leecheuk/react-google-login";

const GOOGLE_CLIENT_ID =
  "772173664744-m0eu6jh0ijf2ivbb1hvdi1lvt6mlai5u.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";

const Navbar = () => {
  const navigate = useNavigate();
  const { state, getAllTracks, dispatch, COMMANDS } = useContext(MyContext);

  const clearAllFormData = () => {
    dispatch({ type: COMMANDS.RESETUPDATE });
  };

  return (
    <div className="navigation glass">
      <Link to="/home" className="logoContainer">
        <GiDrum className="logoIcon" /> <span>BANALEO</span>
      </Link>

      <div className="contentnavSection">
        <Link
          to="/home"
          className="logoContainer"
          onClick={() => clearAllFormData()}
        >
          <AiOutlineHome />
        </Link>
        <Link
          to="/form"
          className="logoContainer"
          onClick={() => clearAllFormData()}
        >
          <BsPencilSquare />
        </Link>
        <Link
          to="/tracks"
          className="logoContainer"
          onClick={() => getAllTracks()}
        >
          <BsMusicNoteList />
        </Link>
        <div>
          <Link to="/" className="logoContainer ">
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              className="google_logout_container"
              onLogoutSuccess={() => {
                localStorage.clear();
                LogOut("loginData");
                navigate("/");
              }}
            >
              <IoIosLogOut className="google_logout" />
            </GoogleLogout>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// External imports
import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { GiDrum } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { GoogleLogout } from "@leecheuk/react-google-login";

// Internal imports
import { MyContext } from "../Context/index.context";
import { LogOut } from "../Context/helper";

const Navbar = () => {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [useStick, setUseStick] = useState(false);
  let navbar;
  const { state, getAllTracks, dispatch, COMMANDS } = useContext(MyContext);
  const clearAllFormData = () => {
    dispatch({ type: COMMANDS.RESETUPDATE });
  };

  // scroll detection
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setUseStick(true);
    } else {
      setUseStick(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navigation glass ${useStick ? "sticky_nav" : ""} `}
      ref={navbarRef}
    >
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
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
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

// state
import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../Context/index.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURLtype } from "../Context/type";

// google
import GoogleLogin from "react-google-login";

// bootstrap
import { Button, Form } from "react-bootstrap";

// icons
import { MdHorizontalRule } from "react-icons/md";
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { GiDrum } from "react-icons/gi";
import { RiErrorWarningLine } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";

// libraries
import { toast } from "react-toastify";

// assets
import jazz from "../videos/pexels-anthony-shkraba-production-8043616.mp4";

function Login() {
  const { dispatch, COMMANDS, state } = useContext(MyContext);
  let navigate = useNavigate();

  const [localUser, setlocalUser] = useState({
    email: "",
    password: "",
  });
  const [validateEmail, setValidateEmail] = useState("");
  const [validatePass, setValidatePass] = useState("");
  const [register, setRegister] = useState(false);

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  // const handleLogin = async googleData => {
  //   try {
  //     const res = await fetch(`/user/google-login`, {
  //       method: "POST",
  //       body: JSON.stringify({ token: googleData.tokenId }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await res.json();
  //     setLoginData(data);

  //     data.email ? navigate("/home") : navigate("/");
  //     localStorage.setItem("loginData", JSON.stringify(data));
  //     const userLogged = JSON.parse(localStorage.getItem("loginData"));

  //     userLogged.email ? navigate("/home") : navigate("/");

  //     if (!loginData.email) {
  //       setLoginData(userLogged);
  //     }
  //   } catch (err) {
  //     if (err) console.log(err);
  //   }
  // };

  const handleSignIn = async e => {
    try {
      e.preventDefault();
      const SignedUser = await axios.post(`/user/userlogin`, {
        localUser,
      });
      SignedUser.data.isAuth ? navigate("/home") : navigate("/");
      dispatch({ type: COMMANDS.LOGGEDIN, payload: SignedUser });
    } catch (error) {
      if (error)
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      console.log(error);
    }
  };

  const handleSignUp = async e => {
    try {
      e.preventDefault();
      const RegisteredUser = await axios.post("user/register", localUser);
      setRegister(false);
      toast.success(`Success ${RegisteredUser.data.email}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    } catch (error) {
      if (error)
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      console.log(error);
    }
  };

  // const handleFailure = err => {
  //   toast.error("🛑 couldn't login, try later", {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 500,
  //   });
  // };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  useEffect(() => {
    if (!loginData) return;
    dispatch({ type: COMMANDS.UPDATE_USERONLINE, payload: loginData });
  }, [loginData]);

  const EmailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "g"
  );
  const passwordRegex = new RegExp(/[0-9]/, "g");

  const handleManualChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setlocalUser({ ...localUser, [name]: value });

    const emailTest = EmailRegex.test(localUser.email);
    const passwordTest = passwordRegex.test(localUser.password);

    if (emailTest) {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }

    if (passwordTest) {
      setValidatePass(true);
    } else {
      setValidatePass(false);
    }
  };

  return (
    <div className="loginpage">
      <div className="bgc-vid">
        <video
          src={jazz}
          autoPlay={true}
          loop={true}
          className="videobg"
        ></video>
      </div>

      <div className="sign_inpageContent"></div>
      <div className="sign_in_form">
        <div className="loginTitle">
          <div className="titles">
            <GiDrum className="logoIcon" />
            <h1>Welcome Back</h1>
            <h4>
              Log in to <span>BanaLeo</span>{" "}
            </h4>
          </div>
          <div className="sign_in">
            {/* <div className="google">
              <GoogleLogin
                className="loginBtn"
                clientId={
                  "772173664744-lr5pa17sih47aeb539m8svtht2v2oe1v.apps.googleusercontent.com"
                }
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </div> */}
            <div className="alternative">
              <MdHorizontalRule className="line" /> OR{" "}
              <MdHorizontalRule className="line" />
            </div>
            <Form action="" className="Signinform">
              <div className="inputController">
                {!validateEmail ? (
                  <RiErrorWarningLine className="success notif" />
                ) : (
                  <FcApproval className="failure notif" />
                )}

                <HiOutlineMail className="iconplaceholder mail" />
                <Form.Control
                  name="email"
                  type="text"
                  className="inputfield"
                  onChange={e => handleManualChange(e)}
                />
              </div>
              <div className="inputController">
                {!validatePass ? (
                  <RiErrorWarningLine className="success notif" />
                ) : (
                  <FcApproval className="failure notif" />
                )}
                <HiOutlineKey className="iconplaceholder key" />
                <Form.Control
                  name="password"
                  type="password"
                  className="inputfield"
                  onChange={e => handleManualChange(e)}
                />
              </div>
              {register ? (
                <Button
                  type="submit"
                  className="signinBtn"
                  onClick={e => handleSignUp(e)}
                >
                  Sign up
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="signinBtn"
                  onClick={e => handleSignIn(e)}
                >
                  Sign in
                </Button>
              )}
              <Button variant="light" onClick={() => setRegister(!register)}>
                {register ? "Want to Login ?" : "Want to create account ?"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

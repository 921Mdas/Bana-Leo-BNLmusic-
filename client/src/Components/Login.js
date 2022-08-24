// External Imports
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
// icons
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { GiDrum } from "react-icons/gi";
import { RiErrorWarningLine } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";

// Internal imports
import { MyContext } from "../Context/index.context";
import jazz from "../videos/pexels-anthony-shkraba-production-8043616.mp4";
import {
  UserAuthentication,
  ToasterError,
  ToasterSuccess,
  EmailRegex,
  PasswordRegex,
  getStorage,
  setStorage,
} from "../Context/helper";

function Login() {
  const { dispatch, COMMANDS } = useContext(MyContext);
  let navigate = useNavigate();

  const [localUser, setlocalUser] = useState({
    email: "",
    password: "",
  });
  const [validateEmail, setValidateEmail] = useState("");
  const [validatePass, setValidatePass] = useState("");
  const [register, setRegister] = useState(false);

  // session stored, userdata, token
  let getLoginData = getStorage("userLoginData");
  let createLoginData;

  //  load storage login userData
  useEffect(() => {
    if (!getLoginData) return;
    dispatch({ type: COMMANDS.UPDATE_USERONLINE, payload: getLoginData });
    console.log(getLoginData);
  }, [createLoginData]);

  // sign in
  const handleSignIn = async e => {
    try {
      e.preventDefault();
      const SignedUser = await UserAuthentication(`user/userlogin`, localUser);
      // manual sign in
      if (SignedUser?.data.isAuth) {
        createLoginData = setStorage("userLoginData", SignedUser);
        dispatch({ type: COMMANDS.LOGGEDIN, payload: SignedUser });
        ToasterSuccess(`welcome ${SignedUser?.data.user.email}`);
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error) console.log(error.message);
    }
  };

  // sign up
  const handleSignUp = async e => {
    try {
      e.preventDefault();
      const RegisteredUser = await UserAuthentication(
        `user/register`,
        localUser
      );
      setRegister(false);
      ToasterSuccess(`Success ${RegisteredUser.data.email}`);
    } catch (error) {
      if (error) ToasterError(error.response.data);
      console.log(error);
    }
  };

  const handleManualChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setlocalUser({ ...localUser, [name]: value });

    const emailTest = EmailRegex.test(localUser.email);
    const passwordTest = PasswordRegex.test(localUser.password);

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
            <div className="google"></div>
            {/* <div className="alternative">
              <MdHorizontalRule className="line" /> OR{" "}
              <MdHorizontalRule className="line" />
            </div> */}
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

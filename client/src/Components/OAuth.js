import React from "react";
import { GoogleLogin, GoogleLogout } from "@leecheuk/react-google-login";
import { useNavigate } from "react-router-dom";

const HandleGoogleLogin = googleData => {
  console.log("success", googleData);
  let navigate = useNavigate();
  navigate("/home");
};

const HandleGoogleFailure = result => {
  console.log("fail", result);
};

const handleGoogleLogout = () => {
  console.log("logout");
};

const GOOGLE_CLIENT_ID =
  "772173664744-m0eu6jh0ijf2ivbb1hvdi1lvt6mlai5u.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";

export const GoogleOAuthLogin = () => {
  return (
    <GoogleLogin
      className="loginBtn"
      clientId={GOOGLE_CLIENT_ID}
      buttonText="GOOGLE LOGIN "
      onSuccess={HandleGoogleLogin}
      onFailure={HandleGoogleFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    ></GoogleLogin>
  );
};

export const GoogleOAuthLogout = () => {
  return (
    <GoogleLogout
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={handleGoogleLogout}
    ></GoogleLogout>
  );
};

// clientID: "772173664744-lr5pa17sih47aeb539m8svtht2v2oe1v.apps.googleusercontent.com"

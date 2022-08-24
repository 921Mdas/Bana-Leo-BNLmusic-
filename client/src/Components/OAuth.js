import React from "react";
import GoogleLogin from "react-google-login";

const handleGoogleLogin = () => {};

const handleGoogleFailure = () => {};

export const GoogleOAuth = clientID => {
  return (
    <div>
      <GoogleLogin
        className="loginBtn"
        clientId={clientID}
        buttonText="Log in with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleFailure}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    </div>
  );
};

// clientID: "772173664744-lr5pa17sih47aeb539m8svtht2v2oe1v.apps.googleusercontent.com"

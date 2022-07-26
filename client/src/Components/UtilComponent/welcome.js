import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/index.context";

// react icon
import { IoIosLogIn } from "react-icons/io";
import { FcApproval } from "react-icons/fc";

const Welcome = ({ state }) => {
  // const {
  //   loggedInUser: {
  //     data: {
  //       user: { email },
  //     },
  //   },
  // } = state;
  // const { loggedUser, setLoggedUser } = useState({});
  // const storageUser = JSON.parse(localStorage.getItem("loginData"));

  return (
    <div className="welcome_message">
      <p>Welcome Home</p>
      {/* {storageUser?.name ? (
        <p>
          Welcome <span>{storageUser?.name}</span>{" "}
        </p>
      ) : (
        <p>
          Welcome{" "}
          {state.loggedInUser ? state?.loggedInUser?.data?.user?.email : "Home"}
        </p>
      )} */}

      <FcApproval />
    </div>
  );
};

export default Welcome;

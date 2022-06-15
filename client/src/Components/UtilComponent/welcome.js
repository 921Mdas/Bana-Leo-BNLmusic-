import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/index.context";

// react icon
import { IoIosLogIn } from "react-icons/io";
import { FcApproval } from "react-icons/fc";

const Welcome = ({ state }) => {
  const {
    loggedInUser: {
      data: {
        user: { email },
      },
    },
  } = state;
  const { loggedUser, setLoggedUser } = useState({});
  const storageUser = JSON.parse(localStorage.getItem("loginData"));

  return (
    <div className="welcome_message">
      {/* <div>
        <img src={storageUser?.picture} alt="" />
      </div> */}

      {storageUser?.name ? (
        <p>
          Welcome <span>{storageUser?.name}</span>{" "}
        </p>
      ) : (
        <p>Welcome {email}</p>
      )}

      <FcApproval />
    </div>
  );
};

export default Welcome;

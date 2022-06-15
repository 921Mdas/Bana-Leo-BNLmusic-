import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/index.context";

// react icon
import { IoIosLogIn } from "react-icons/io";

const Welcome = () => {
  const { state: userOnline } = useContext(MyContext);
  const { loggedUser, setLoggedUser } = useState({});
  const storageUser = JSON.parse(localStorage.getItem("loginData"));

  return (
    <div className="welcome_message">
      <div>
        <img src={storageUser?.picture} alt="" />
      </div>

      {storageUser?.name ? (
        <p>
          Welcome <span>{storageUser?.name}</span>{" "}
        </p>
      ) : null}
    </div>
  );
};

export default Welcome;

import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { TbMusicOff } from "react-icons/tb";
import { Load } from "../../Context/helper";

function GrowExample() {
  return <Spinner animation="grow" variant="light" />;
}

const Loader = () => {
  const [nom, setNom] = useState(true);

  useEffect(() => {
    const timing = setTimeout(() => {
      setNom(!nom);
    }, 2000);

    return () => {
      clearTimeout(timing);
    };
  }, []);

  if (nom) {
    // prettier-ignore

    return (
      <div className="loader">
        <GrowExample />
      </div>
    );
  } else {
    // prettier-ignore
    return (
      <h3 className="nomusic">
        {" "}
        <TbMusicOff />
        No Tracks Found, Upload{" "}
      </h3>
    );
  }
};

export default Loader;

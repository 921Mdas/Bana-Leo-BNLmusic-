import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

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
    return (
      <div className="loader">
        <GrowExample />;
      </div>
    );
  } else {
    return <h3 className="nomusic">Oops no tracks</h3>;
  }
};

export default Loader;

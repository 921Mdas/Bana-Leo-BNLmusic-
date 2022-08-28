// External Imports
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

// Internal Imports

const Goback = ({ direction }) => {
  const navigate = useNavigate();

  return (
    <div className="navigation">
      <div className="navigate_home" onClick={() => navigate(direction)}>
        <AiOutlineArrowLeft className="navigate_icon" />
      </div>
    </div>
  );
};

export default Goback;

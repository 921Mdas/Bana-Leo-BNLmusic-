// External Imports
import React from "react";
import { IoSend } from "react-icons/io5";

// Internal Imports

const SubmitBtn = ({ handleSubmit, isSubmitting }) => {
  return (
    <div className="submit_btn_artist">
      <button
        className="submit_btn_artist_el"
        onClick={handleSubmit}
        type="button"
      >
        <IoSend className="send_icon" />
      </button>
    </div>
  );
};

export default SubmitBtn;

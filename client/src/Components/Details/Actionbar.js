import { useState } from "react";

// icons
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsBookmarkCheckFill, BsBookmark } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { GrNext } from "react-icons/gr";

import { CongoPlayLists } from "./Stack";

const Actionbar = ({ nextTrack, ChangeSong }) => {
  return (
    <div className="content_likeBook">
      <div className="next_song">
        <button className="next_song_btn" onClick={() => ChangeSong()}>
          {<GrNext color="white" className="next_song_icon" />}
        </button>
        <div className="next_song_detail">
          <h5>
            Next : <span> {nextTrack?.next?.value?.title}</span>{" "}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Actionbar;

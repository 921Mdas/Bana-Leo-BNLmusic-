import { useState } from "react";

// icons
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsBookmarkCheckFill, BsBookmark } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { GrNext, GrPrevious } from "react-icons/gr";

import { CongoPlayLists } from "./Stack";

const Actionbar = ({ NextSong, PrevSong, showEqualizer }) => {
  return (
    <div className="content_likeBook">
      <div className="next_song">
        <button className="next_song_btn" onClick={() => PrevSong()}>
          {<GrPrevious color="white" className="next_song_icon" />}
        </button>
        <button className="next_song_btn" onClick={() => NextSong()}>
          {<GrNext color="white" className="next_song_icon" />}
        </button>
      </div>

      {showEqualizer ? (
        <div className="equalizer">
          <iframe
            src="https://giphy.com/embed/LM1ABxQPuMyeCl7Vj6"
            width="100px"
            height="100px"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
          <p></p>
        </div>
      ) : null}
    </div>
  );
};

export default Actionbar;

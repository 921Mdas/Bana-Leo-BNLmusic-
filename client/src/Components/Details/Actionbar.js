// External Imports
import { GrNext, GrPrevious } from "react-icons/gr";

// Internal Imports

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

import { useState } from "react";

// icons
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsBookmarkCheckFill, BsBookmark } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";

const Actionbar = () => {
  const [bookmark, setBookmark] = useState(false);
  const [like, setLike] = useState(false);

  const Like = () => {
    setLike(!like);
  };

  const Bookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <div className="content_likeBook">
      <div className="like">
        {like ? (
          <AiTwotoneHeart
            className="trackIcon heart heart-full"
            onClick={() => Like()}
          />
        ) : (
          <AiOutlineHeart onClick={() => Like()} className="trackIcon heart " />
        )}
      </div>
      <div className="bookmark">
        {bookmark ? (
          <BsBookmarkCheckFill
            onClick={() => Bookmark()}
            className="trackIcon book-full"
          />
        ) : (
          <BsBookmark className="trackIcon" onClick={() => Bookmark()} />
        )}
      </div>
      <div className="download">
        <FiDownload className="trackIcon" />
      </div>
    </div>
  );
};

export default Actionbar;

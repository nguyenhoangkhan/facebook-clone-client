import { useState } from "react";
import reacts from "../../assets/data/reacts";
import { reactPost } from "../../functions/post";

const ReactsPopup = ({ setShowReactsPopup, postId, token }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReactPost = async (react) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    await reactPost(postId, react, token);
    setIsLoading(false);
  };

  return (
    <div
      className="reacts_popup"
      onMouseOver={() =>
        setTimeout(() => {
          setShowReactsPopup(true);
        }, 500)
      }
      onMouseLeave={() =>
        setTimeout(() => {
          setShowReactsPopup(false);
        }, 500)
      }
    >
      {reacts.map((react, idx) => (
        <button
          type="button"
          key={idx}
          className="react"
          onClick={() => handleReactPost(react.name)}
        >
          <img src={react.image} alt="" />
        </button>
      ))}
    </div>
  );
};

export default ReactsPopup;

import { useState } from "react";
import reacts from "../../assets/data/reacts";
import { reactPost } from "../../functions/post";

const ReactsPopup = ({ setShowReactsPopup, handleReactPost }) => {
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

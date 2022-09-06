import React from "react";

const PostError = ({ error, setError }) => {
  return (
    <div className="postError">
      <div className="postError_error">{error}</div>
      <button
        className="blue_btn"
        onClick={() => {
          setError("");
        }}
      >
        Thử lại
      </button>
    </div>
  );
};

export default PostError;

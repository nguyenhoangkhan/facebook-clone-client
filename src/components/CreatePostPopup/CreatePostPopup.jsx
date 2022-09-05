import { useState, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { useClickOutside } from "../../Hooks";
import {
  AddToYourPost,
  EmojiPicker,
  CreatePostHeader,
  ImagePreview,
} from "./Components";
import submitPost from "../../functions/submitPost";

const CreatePostPopup = ({ user, setShowCreatePostPopup }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const createPostPopupRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useClickOutside(createPostPopupRef, () => {
    setShowCreatePostPopup(false);
  });

  const handleSubmitPost = async () => {
    if (background) {
      setLoading(true);
      await submitPost(null, background, text, null, user.id, user.token);
      setLoading(false);
      setText(false);
      setBackground("");
      setBackground([]);
      setShowCreatePostPopup(false);
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={createPostPopupRef}>
        <CreatePostHeader
          setShowCreatePostPopup={setShowCreatePostPopup}
          user={user}
        />
        {!showPrev ? (
          <EmojiPicker
            user={user}
            showPrev={showPrev}
            setShowPrev={setShowPrev}
            text={text}
            setText={setText}
            background={background}
            setBackground={setBackground}
          />
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        )}

        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className={`post_submit ${!text && "empty-text"} ${
            loading && "loading"
          }`}
          onClick={handleSubmitPost}
        >
          {loading ? <PulseLoader color="white" size={5} /> : "Đăng"}
        </button>
      </div>
    </div>
  );
};
export default CreatePostPopup;

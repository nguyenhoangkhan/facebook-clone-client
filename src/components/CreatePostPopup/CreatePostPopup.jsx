import { useState, useRef } from "react";
import { useClickOutside } from "../../Hooks";
import {
  AddToYourPost,
  EmojiPicker,
  CreatePostHeader,
  ImagePreview,
} from "./Components";

const CreatePostPopup = ({ user, setShowCreatePostPopup }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const createPostPopupRef = useRef(null);

  useClickOutside(createPostPopupRef, () => {
    setShowCreatePostPopup(false);
  });

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
        <button className={`post_submit ${!text && "empty-text"}`}>Đăng</button>
      </div>
    </div>
  );
};
export default CreatePostPopup;

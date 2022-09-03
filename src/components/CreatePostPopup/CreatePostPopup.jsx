import { useState } from "react";
import {
  AddToYourPost,
  EmojiPicker,
  CreatePostHeader,
  ImagePreview,
} from "./Components";

const CreatePostPopup = ({
  user,
  setShowCreatePostPopup = { setShowCreatePostPopup },
}) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);

  return (
    <div className="blur">
      <div className="postBox">
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

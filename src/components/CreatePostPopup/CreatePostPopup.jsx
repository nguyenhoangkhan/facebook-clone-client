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
import dataURItoBlob from "../../helpers/dataURItoBlob";
import uploadImages from "../../functions/uploadImages";

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

  const submitPostSuccessfully = () => {
    setLoading(false);
    setText(false);
    setBackground("");
    setImages([]);
    setShowCreatePostPopup(false);
  };

  const handleSubmitPost = async () => {
    if (background) {
      setLoading(true);
      await submitPost(null, background, text, null, user.id, user.token);
      submitPostSuccessfully();
    } else if (images && images.length > 0) {
      setLoading(true);
      const path = `${user.username}/Post Images`;
      const postImages = images.map((image) => dataURItoBlob(image));
      const formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => formData.append("file", image));
      const response = await uploadImages(formData, path, user.token);
      await submitPost(null, null, text, response, user.id, user.token);
      submitPostSuccessfully();
    } else if (text) {
      setLoading(true);
      await submitPost(null, null, text, null, user.id, user.token);
      submitPostSuccessfully();
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
          className={`post_submit ${!text && "empty-text"}  ${
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

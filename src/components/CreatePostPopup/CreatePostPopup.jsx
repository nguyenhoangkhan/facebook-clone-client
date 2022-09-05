import { useState, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { useClickOutside } from "../../Hooks";
import {
  AddToYourPost,
  EmojiPicker,
  CreatePostHeader,
  ImagePreview,
} from "./Components";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { submitPost, uploadImages } from "../../functions";

const CreatePostPopup = ({ user, setShowCreatePostPopup }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const createPostPopupRef = useRef(null);
  const [loading, setLoading] = useState(false);
  console.log(images.length);
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
      // Submit Post
      await submitPost(null, background, text, null, user.id, user.token);
      submitPostSuccessfully();
    } else if (images && images.length > 0) {
      setLoading(true);

      // Create path
      const path = `${user.username}/Post Images`;

      // Convert URL type to Blob type
      const postImages = images.map((image) => dataURItoBlob(image));

      // Create form data to upload image files
      const formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => formData.append("file", image));

      const responseImages = await uploadImages(formData, user.token);

      // Submit Post
      await submitPost(null, null, text, responseImages, user.id, user.token);
      submitPostSuccessfully();
    } else if (text) {
      setLoading(true);

      // Submit Post
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
          className={`post_submit ${
            !text && images.length === 0 ? "empty-text" : ""
          }  ${loading && "loading"}`}
          onClick={handleSubmitPost}
        >
          {loading ? <PulseLoader color="white" size={5} /> : "Đăng"}
        </button>
      </div>
    </div>
  );
};
export default CreatePostPopup;
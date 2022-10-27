import { useState, useRef, memo } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch } from "react-redux";
import axios from "axios";

import { useClickOutside } from "../../Hooks";
import {
  AddToYourPost,
  EmojiPicker,
  CreatePostHeader,
  ImagePreview,
  PostError,
} from "./Components";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { submitPost, uploadImages } from "../../functions";
import * as actions from "../../redux/actions";

const CreatePostPopup = ({ user, setShowCreatePostPopup }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const createPostPopupRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

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
      const res = await submitPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      if (res === "Successfully") {
        submitPostSuccessfully();
      } else {
        setLoading(false);
        setError(res);
      }
    } else if (images && images.length > 0) {
      setLoading(true);
      // Create path
      const path = `${user.username}/posts_images`;

      // Convert URL type to Blob type
      const postImages = images.map((image) => dataURItoBlob(image));

      // Create form data to upload image files
      const formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => formData.append("file", image));

      const responseImages = await uploadImages(formData, user.token);

      // Submit Post
      const res = await submitPost(
        null,
        null,
        text,
        responseImages,
        user.id,
        user.token
      );
      if (res === "Successfully") {
        submitPostSuccessfully();
      } else {
        setLoading(false);
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      // Submit Post
      const res = await submitPost(null, null, text, null, user.id, user.token);
      if (res === "Successfully") {
        submitPostSuccessfully();
      } else {
        setLoading(false);
        setError(res);
      }
    }
    // get Posts from API after created
    getPostsFromAPI();
  };

  const getPostsFromAPI = async () => {
    try {
      const serverURL = process.env.REACT_APP_BACKEND_URL;
      const { data } = await axios.get(serverURL + "/post/getAllPosts", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      dispatch(actions.POST_SUCCESS(data));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={createPostPopupRef}>
        {error && <PostError error={error} setError={setError} />}
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
            setError={setError}
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
            setError={setError}
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
export default memo(CreatePostPopup);

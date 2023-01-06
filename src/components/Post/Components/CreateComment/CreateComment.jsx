import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { createComment } from "../../../../functions/post";
import uploadImages from "../../../../functions/uploadImages";
import { dataURItoBlob } from "../../../../helpers";
import ClipLoader from "react-spinners/ClipLoader";

const CreateComment = ({ user, postId, setComments, setCount }) => {
  const [picker, setPicker] = useState(false);
  const [comment, setComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [commentImage, setCommentImage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();

  const textRef = useRef(null);
  const imgInput = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setComment(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`Định dạng file không được hỗ trợ.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  const handleCreateComment = async (e) => {
    if (isLoading || (!comment.trim() && !commentImage)) {
      return;
    }

    if (e.key === "Enter") {
      let imageUrl = "";
      if (commentImage) {
        setIsLoading(true);

        const path = `${user.username}/comments_images/${postId}`;

        // Convert URL type to Blob type
        const postImages = dataURItoBlob(commentImage);

        // Create form data to upload image files
        const formData = new FormData();
        formData.append("path", path);
        formData.append("file", postImages);

        imageUrl = await uploadImages(formData, user.token);
      }

      const [result, err] = await createComment(
        comment.trim(),
        imageUrl.length ? imageUrl[0].url : "",
        postId,
        user.token
      );

      setComments(result);
      setCount((prev) => ++prev);
      setComment("");
      setCommentImage("");
      setIsLoading(false);

      if (err) {
        setError(err);
      }
    }
  };

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker ? (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          ) : (
            ""
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error ? (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Thử lại
              </button>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            ref={textRef}
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => handleCreateComment(e)}
          />
          <div className="comment_circle" style={{ marginTop: "5px" }}>
            <ClipLoader size={20} color="#1876f2" loading={isLoading} />
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateComment;

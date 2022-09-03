import { useRef } from "react";
import EmojiPicker from "../EmojiPicker";

const ImagePreview = ({
  text,
  user,
  images,
  setText,
  setImages,
  setShowPrev,
}) => {
  const imageInputRef = useRef(null);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerE) => {
        const image = readerE.target.result;
        setImages((prev) => [...prev, image]);
      };
    });
  };

  const handleExitImagesPreview = (e) => {
    e.stopPropagation();
    setShowPrev(false);
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPicker text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Chỉnh sửa
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Thêm ảnh/video
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4 "
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div
            className="add_pics_inside1"
            onClick={() => imageInputRef.current.click()}
          >
            <div
              className="small_white_circle"
              onClick={(e) => handleExitImagesPreview(e)}
            >
              <i className="exit_icon"></i>
            </div>
            <div className="add_col">
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Thêm hình ảnh/video</span>
              <span>hoặc kéo và thả</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">
            Thêm ảnh và video từ thiết bị di động.
          </div>
          <span className="addphone_btn">Thêm</span>
        </div>
      </div>
    </div>
  );
};
export default ImagePreview;

import { useRef } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../../../Hooks";

const OldCovers = ({ photos, setCoverPicture, setShowOldCovers }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const mainRef = useRef(null);

  const handleClose = () => {
    setShowOldCovers(false);
    setCoverPicture("");
  };

  useClickOutside(mainRef, handleClose);
  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={mainRef}>
        <div className="box_header">
          <button type="button" className="small_circle" onClick={handleClose}>
            <i className="exit_icon"></i>
          </button>
          <span>Chọn ảnh</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Gần đây</div>
          <div className="selectCoverBox_link">Album ảnh</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <h4>Ảnh bìa</h4>
          <div className="old_pictures">
            {photos
              .filter((img) => img.folder === `${user.username}/cover_pictures`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShowOldCovers(false);
                  }}
                />
              ))}
          </div>
          <h4>Khác</h4>
          <div className="old_pictures">
            {photos
              .filter((img) => img.folder !== `${user.username}/cover_pictures`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShowOldCovers(false);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCovers;

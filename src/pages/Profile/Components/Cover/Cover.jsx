import { useEffect } from "react";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { PublicIcon } from "../../../../assets/svg";
import getCroppedImg from "../../../../helpers/getCroppedImg";
import useClickOutside from "../../../../Hooks/useClickOutside";

const Cover = ({ cover = "" }) => {
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);

  const [coverPicture, setCoverPicture] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coverWidth, setCoverWidth] = useState(null);
  const [coverHeight, setCoverHeight] = useState(null);

  const [showCoverMenu, setShowCoverMenu] = useState(false);

  useEffect(() => {
    setCoverWidth(coverRef.current.clientWidth);
    setCoverHeight(coverRef.current.clientHeight);

    window.onresize = () => {
      setCoverWidth(coverRef.current.clientWidth);
      setCoverHeight(coverRef.current.clientHeight);
    };
  }, []);

  console.log("coverHeight ", coverHeight);

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom((prev) => prev - 0.1);
    }
  };
  const handleZoomIn = () => {
    if (zoom < 3) {
      setZoom((prev) => prev + 0.1);
    }
  };

  const getCroppedImage = useCallback(
    async (show) => {
      if (isLoading || error) {
        return;
      }
      setIsLoading(true);
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          if (zoom !== 1) {
            setZoom(1);
            setCrop({ x: 0, y: 0 });
            setCoverPicture(img);
            setIsLoading(false);
          }
        } else {
          // await UpdateProfilePicture(img);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err?.response?.data?.message);
      }
    },
    [croppedAreaPixels, coverPicture]
  );

  useClickOutside(menuRef, () => setShowCoverMenu(false));

  return (
    <div ref={coverRef} className="profile_cover">
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <PublicIcon />
            Công khai
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}
            >
              Hủy
            </button>
            <button className="blue_btn">Lưu thay đổi</button>
          </div>
        </div>
      )}
      <input
        type="file"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleImage}
      />
      {coverPicture && (
        <div className="cover_cropper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            objectFit="horizontal-cover"
            aspect={coverWidth / coverHeight}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      )}
      {cover && !coverPicture ? (
        <img src={cover} className="cover" alt="" />
      ) : (
        ""
      )}
      <div className="update_cover_wrapper">
        <div
          className="open_cover_update"
          onClick={() => setShowCoverMenu((prev) => !prev)}
        >
          <i className="camera_filled_icon"></i>
          Thêm ảnh bìa
        </div>
        {showCoverMenu && (
          <div ref={menuRef} className="open_cover_menu">
            <button type="button" className="open_cover_menu_item hover1">
              <i className="photo_icon"></i>
              Chọn ảnh
            </button>
            <button
              type="button"
              className="open_cover_menu_item hover1"
              onClick={() => inputRef.current.click()}
            >
              <i className="upload_icon"></i>
              Tải ảnh lên
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cover;

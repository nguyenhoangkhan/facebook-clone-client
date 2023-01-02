import { useEffect } from "react";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { PublicIcon } from "../../../../assets/svg";
import getCroppedImg from "../../../../helpers/getCroppedImg";
import useClickOutside from "../../../../Hooks/useClickOutside";
import uploadImages from "../../../../functions/uploadImages";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import axios from "axios";
import { submitPost } from "../../../../functions";
import PulseLoader from "react-spinners/PulseLoader";
import { OldCovers } from "../OldCovers";

const Cover = ({ cover = "", photos = [] }) => {
  const dispatch = useDispatch();

  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);

  const { user, profile } = useSelector((state) => ({ ...state }));

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [coverWidth, setCoverWidth] = useState(null);
  const [coverHeight, setCoverHeight] = useState(null);

  const [coverPicture, setCoverPicture] = useState("");
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [showOldCovers, setShowOldCovers] = useState(false);

  useEffect(() => {
    setCoverWidth(coverRef.current.clientWidth);
    setCoverHeight(coverRef.current.clientHeight);

    window.onresize = () => {
      setCoverWidth(coverRef.current.clientWidth);
      setCoverHeight(coverRef.current.clientHeight);
    };
  }, []);

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

  const handleClose = () => {
    setCoverPicture("");
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(async () => {
    if (isLoading || error) {
      return;
    }
    setIsLoading(true);
    try {
      const img = await getCroppedImg(coverPicture, croppedAreaPixels);

      await updateCoverPicture(img);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err?.response?.data?.message);
    }
  }, [croppedAreaPixels, coverPicture]);

  const updateCoverPicture = async (img) => {
    try {
      let blob = await fetch(img).then((img) => img.blob());
      let path = `${user.username}/cover_pictures`;

      const formData = new FormData();
      formData.append("picture", blob);
      formData.append("path", path);

      const result = await uploadImages(formData, user.token);

      const data = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/cover-profile`,
        {
          cover: result[0].url,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        }
      );
      if (data.status === 200) {
        setError("");
        dispatch(actions.UPDATE_COVER_PROFILE(data?.data?.cover));
        const newPost = await submitPost(
          "coverPicture",
          null,
          "",
          result,
          user.id,
          user?.token
        );
        if (newPost !== "Successfully") {
          setIsLoading(false);
          setCoverPicture("");
          setError(newPost);
        }
        handleClose();
      }
    } catch (err) {
      setIsLoading(false);
      setError(err?.response?.data?.message);
    }
  };

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
            <button className="blue_btn" onClick={getCroppedImage}>
              {isLoading ? (
                <PulseLoader color="white" size={5} />
              ) : (
                "Lưu thay đổi"
              )}
            </button>
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
            aspect={16 / 8}
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
            <button
              type="button"
              className="open_cover_menu_item hover1"
              onClick={() => setShowOldCovers(true)}
            >
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
      {showOldCovers && (
        <OldCovers
          setCoverPicture={setCoverPicture}
          setShowOldCovers={setShowOldCovers}
          photos={photos}
        />
      )}
    </div>
  );
};

export default Cover;

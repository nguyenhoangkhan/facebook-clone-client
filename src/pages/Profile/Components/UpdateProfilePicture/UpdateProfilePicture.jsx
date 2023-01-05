import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../../../Hooks";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../../helpers/getCroppedImg";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../../../../redux/selectors";
import * as actions from "../../../../redux/actions";
import axios from "axios";
import uploadImages from "../../../../functions/uploadImages";
import PulseLoader from "react-spinners/PulseLoader";
import { submitPost } from "../../../../functions/post";

const UpdateProfilePicture = ({
  setImage,
  setShow,
  image,
  setError,
  error,
}) => {
  const [description, setDescription] = useState("");
  const mainRef = useRef(null);
  const user = useSelector(selectors.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleClose = () => {
    setShow(false);
    setImage("");
  };

  useClickOutside(mainRef, handleClose);

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
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          if (zoom !== 1) {
            setZoom(1);
            setCrop({ x: 0, y: 0 });
            setImage(img);
            setIsLoading(false);
          }
        } else {
          await updateProfilePicture(img);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(err?.response?.data?.message);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async (img) => {
    try {
      let blob = await fetch(img).then((img) => img.blob());
      let path = `${user.username}/profile_pictures`;

      const formData = new FormData();
      formData.append("picture", blob);
      formData.append("path", path);

      const res = await uploadImages(formData, user.token);

      const data = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/picture-profile`,
        {
          picture: res[0].url,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        }
      );
      if (data.status === 200) {
        setError("");
        dispatch(actions.UPDATE_PICTURE_PROFILE(data?.data?.picture));
        const arrayPictures = res;
        const newPost = await submitPost(
          "profilePicture",
          null,
          description,
          arrayPictures,
          user.id,
          user?.token
        );
        if (newPost !== "Successfully") {
          setError(newPost);
        }
        handleClose();
      }
    } catch (err) {
      setIsLoading(false);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="update_img_wrapper">
      <div className="postBox update_img" ref={mainRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setImage("")}>
            <i className="exit_icon"></i>
          </div>
          <span>Đăng ảnh đại diện</span>
        </div>
        <div className="update_image_desc">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea_blue details_input"
          ></textarea>
        </div>
        <div className="update_center">
          <div className="crooper">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
            />
          </div>
          <div className="slider">
            <div className="slider_circle" onClick={handleZoomOut}>
              <i className="minus_icon "></i>
            </div>
            <input
              type="range"
              name=""
              id=""
              min={1}
              step={0.1}
              max={3}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
            />
            <div className="slider_circle" onClick={handleZoomIn}>
              <i className="plus_icon "></i>
            </div>
          </div>
        </div>
        <div className="flex_up">
          <div className="gray_btn" onClick={() => getCroppedImage("show")}>
            <i className="crop_icon"></i>
            Cắt ảnh
          </div>
          <div className="gray_btn">
            <i className="temp_icon"></i>
            Đặt làm tạm thời
          </div>
        </div>
        <div className="flex_p_t">
          <i className="public_icon"> </i>
          Ảnh đại diện của bạn hiển thị công khai.
        </div>
        <div className="update_submit_wrap">
          <div className="blue_link" onClick={() => setShow(false)}>
            Hủy
          </div>
          <button className="blue_btn" onClick={() => getCroppedImage()}>
            {isLoading ? <PulseLoader color="white" size={5} /> : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;

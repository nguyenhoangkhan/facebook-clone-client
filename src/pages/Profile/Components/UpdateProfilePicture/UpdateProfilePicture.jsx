import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../../../Hooks";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../../helpers/getCroppedImg";

const UpdateProfilePicture = ({ setImage, setShow, image }) => {
  const [description, setDescription] = useState("");
  const mainRef = useRef(null);

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

  const getCroppedImage = useCallback(async () => {
    try {
      const img = await getCroppedImg(image, croppedAreaPixels);
      console.log("img ", img);
      setImage(img);
    } catch (err) {
      console.log(err);
    }
  }, [croppedAreaPixels]);

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
          <div className="gray_btn">
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
          <div className="blue_link">Hủy</div>
          <button className="blue_btn" onClick={() => getCroppedImage()}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;

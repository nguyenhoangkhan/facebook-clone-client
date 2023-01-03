import { memo } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { PublicIcon } from "../../../../assets/svg";

const Bio = ({
  infos,
  handleChangeInputsValue,
  max,
  setShowEditBio,
  handleUpdateUserDetails,
  isLoading,
  name,
}) => {
  return (
    <div className="add_bio_wrap">
      <textarea
        name={name}
        placeholder="Add Bio"
        value={infos?.[name]}
        maxLength="100"
        className="textarea_blue details_input"
        onChange={handleChangeInputsValue}
      ></textarea>
      <div className="remaining">{max} kí tự còn lại</div>
      <div className="flex">
        <div className="flex_left">
          <PublicIcon /> Công khai
        </div>
        <div className="flex flex_right">
          <button className="gray_btn" onClick={() => setShowEditBio(false)}>
            Hủy
          </button>
          <button
            className="blue_btn"
            onClick={() => handleUpdateUserDetails()}
          >
            {isLoading ? <PulseLoader size={5} color="white" /> : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default memo(Bio);

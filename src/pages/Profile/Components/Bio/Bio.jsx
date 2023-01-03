import { memo } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { PublicIcon } from "../../../../assets/svg";

const Bio = ({
  infos,
  handleBioChange,
  max,
  setShowEditBio,
  handleUpdateUserDetails,
  isLoading,
}) => {
  return (
    <div className="add_bio_wrap">
      <textarea
        placeholder="Add Bio"
        name="bio"
        value={infos?.bio}
        maxLength="100"
        className="textarea_blue details_input"
        onChange={handleBioChange}
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

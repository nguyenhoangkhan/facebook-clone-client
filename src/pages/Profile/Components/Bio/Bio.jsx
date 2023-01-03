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
  placeholder = "",
  rel,
}) => {
  return (
    <div className="add_bio_wrap">
      {rel ? (
        <select
          className="select_rel"
          name={name}
          value={infos.relationship}
          onChange={handleChangeInputsValue}
        >
          <option value="" defaultValue>
            Chọn mối quan hệ
          </option>
          <option value="Single">Độc thân</option>
          <option value="In a Relationship">Hẹn hò</option>
          <option value="Married">Đã kết hôn</option>
          <option value="Divorced">Đã li hôn</option>
        </select>
      ) : (
        <textarea
          name={name}
          placeholder={placeholder}
          value={infos?.[name]}
          maxLength="100"
          className="textarea_blue details_input"
          onChange={handleChangeInputsValue}
        ></textarea>
      )}

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
            onClick={() => {
              setShowEditBio(false);
              handleUpdateUserDetails();
            }}
          >
            {isLoading ? <PulseLoader size={5} color="white" /> : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default memo(Bio);

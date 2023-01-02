import React from "react";

const Bio = ({ infos, handleBioChange, max, setShowBio }) => {
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
        <div className="flex flex_left">
          <i className="public_icon"></i>Công khai
        </div>
        <div className="flex flex_right">
          <button className="gray_btn" onClick={() => setShowBio(false)}>
            Hủy
          </button>
          <button className="blue_btn">Lưu</button>
        </div>
      </div>
    </div>
  );
};
export default Bio;

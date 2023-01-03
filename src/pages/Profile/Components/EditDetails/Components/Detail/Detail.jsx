import { memo, useState } from "react";
import { Bio } from "../../../Bio";

const Details = ({
  header,
  img,
  isLoading,
  value,
  placeholder,
  name,
  handleChangeInputsValue,
  infos,
  rel = false,
  handleUpdateUserDetails,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      <div className="details_header">{header}</div>
      <div className="add_details_flex" onClick={() => setShowEdit(true)}>
        {value ? (
          <div className="info_profile no_underline">
            <img src={`/icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            Thêm {header}
          </>
        )}
      </div>
      {showEdit && (
        <Bio
          rel={rel}
          handleChangeInputsValue={handleChangeInputsValue}
          handleUpdateUserDetails={handleUpdateUserDetails}
          placeholder={placeholder}
          name={name}
          setShowEditBio={setShowEdit}
          infos={infos}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default memo(Details);

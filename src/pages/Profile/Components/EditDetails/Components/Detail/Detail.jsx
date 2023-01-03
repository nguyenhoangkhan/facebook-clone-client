import { memo, useState } from "react";
import { Bio } from "../../../Bio";

const Details = ({
  header,
  img,
  value,
  placeholder,
  name,
  handleChangeInputsValue,
  infos,
  rel,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      <div className="details_header">{header}</div>
      <div className="add_details_flex" onClick={() => setShowEdit(true)}>
        {value ? (
          <div className="info_profile no_underline">
            <img src={`../../../../../../assets/images/${img}.png`} alt="" />
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
          rel
          handleChangeInputsValue={handleChangeInputsValue}
          placeholder={placeholder}
          name={name}
          setShowEditBio={setShowEdit}
          infos={infos}
        />
      )}
    </div>
  );
};

export default memo(Details);

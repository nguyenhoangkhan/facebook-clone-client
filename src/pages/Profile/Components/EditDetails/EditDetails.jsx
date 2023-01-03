import { useRef } from "react";
import { useClickOutside } from "../../../../Hooks";

import { Detail } from "./Components/Detail";

const EditDetails = ({
  details,
  setShowEditDetails,
  handleChangeInputsValue,
  infos,
}) => {
  const mainRef = useRef(null);

  useClickOutside(mainRef, () => setShowEditDetails(false));
  return (
    <div className="blur">
      <div ref={mainRef} className="postBox infosBox">
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => setShowEditDetails(false)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Chỉnh sửa thông tin chi tiết</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Tùy chỉnh thông tin</span>
            <span>Thông tin của bạn sẽ được công khai</span>
          </div>
          <Detail
            infos={infos}
            header="Tên khác"
            value={details?.otherName}
            img="studies"
            name="otherName"
            handleChangeInputsValue={handleChangeInputsValue}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;

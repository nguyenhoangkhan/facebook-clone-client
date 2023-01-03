import { useRef } from "react";
import { useClickOutside } from "../../../../Hooks";

import { Detail } from "./Components/Detail";

const detailsList = [
  {
    header: "Biệt danh",
    name: "otherName",
    img: "studies",
  },
  {
    header: "Nơi làm việc",
    name: "workPlace",
    img: "job",
  },
  {
    header: "Trình độ học vấn",
    name: "highSchool",
    img: "studies",
  },
  {
    header: "Trình độ học vấn",
    name: "college",
    img: "studies",
  },
  {
    header: "Sống tại",
    name: "currentCity",
    img: "home",
  },
  {
    header: "Đến từ",
    name: "homeTown",
    img: "home",
  },
  {
    header: "Mối quan hệ",
    name: "relationship",
    img: "relationship",
  },
  {
    header: "Instagram",
    name: "instagram",
    img: "instagram",
  },
];

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
          {detailsList.map((item, idx) => (
            <Detail
              rel={item.name === "relationship"}
              key={idx}
              infos={infos}
              header={item.header}
              value={details?.[item.name]}
              img={item.img}
              name={item.name}
              handleChangeInputsValue={handleChangeInputsValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditDetails;

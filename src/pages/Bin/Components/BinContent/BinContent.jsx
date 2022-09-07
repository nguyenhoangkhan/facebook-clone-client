import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import TrashItem from "./Components/TrashItem";
import * as selectors from "../../../../redux/selectors";

const BinContent = () => {
  const checkAllInputRef = useRef(null);
  const [isCheckAll, setCheckAll] = useState(false);
  const user = useSelector(selectors.user);

  const handleCheckAll = (e) => {
    e.stopPropagation();
    setCheckAll((prev) => !prev);
  };

  console.log(isCheckAll);
  return (
    <div className="bin-content-wrapper">
      <div className="bin-content-prompt">
        Mục trong thùng rác chỉ hiển thị với bạn.
      </div>
      <div className="bin-content-options">
        <div className="bin-content-options-left-items">
          <div className="bin-content-options-left-item-input hover1">
            <input
              ref={checkAllInputRef}
              type="checkbox"
              id="bin-items-all"
              checked={isCheckAll}
              onChange={(e) => handleCheckAll(e)}
            />
          </div>
          <label htmlFor="bin-items-all">Tất cả</label>
        </div>
        <div className="bin-content-options-right">
          <div className="bin-content-options-right-items">
            <div
              className={`bin-content-options-right-item bin-content-options-right-item-storage ${
                isCheckAll && "active"
              }`}
            >
              Lưu trữ
            </div>
            <div
              className={`bin-content-options-right-item bin-content-options-right-item-restored ${
                isCheckAll && "active"
              }`}
            >
              Khôi phục
            </div>
            <div
              className={`bin-content-options-right-item bin-content-options-right-item-delete ${
                isCheckAll && "active"
              }`}
            >
              Xóa
            </div>
          </div>
        </div>
      </div>
      <div className="bin-content-trashs">
        <TrashItem user={user} />
      </div>
    </div>
  );
};

export default BinContent;

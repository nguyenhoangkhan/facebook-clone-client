import React from "react";
import { Link } from "react-router-dom";
import { arrowDownThin, Bar, Dots } from "../../../../assets/svg";
import BinLeftSideMenuItem from "./Components/BinLeftSideMenuItem";

const BinLeftSide = () => {
  return (
    <div className="BinLeftSide-wrapper">
      <div className="BinLeftSide-header">
        <h1>Bỏ đi</h1>
        <Link to="/">Trang chủ</Link>
      </div>
      <div className="BinLeftSide splitter"></div>
      <div className="BinLeftSide-menu">
        <BinLeftSideMenuItem Icon={Bar} title="Nhật ký hoạt động" />
        <BinLeftSideMenuItem
          Icon={Dots}
          SecondIcon={arrowDownThin}
          title="Kho lưu trữ"
        />
        <BinLeftSideMenuItem Icon={Bar} title="Lịch sử hoạt động" />
      </div>
    </div>
  );
};

export default BinLeftSide;

import { useState, memo } from "react";
import { Link } from "react-router-dom";

import { ArrowDown1 } from "../../../assets/svg";
import { left, shortCutData } from "../../../assets/data/home";
import { ShortCut, LeftLink } from "./Components";

const LeftHome = ({ user }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="left_home scrollbar">
      <Link to={`/${user?.username}`} className="left_link hover2">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.icon}
          text={link.name}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div
          className="left_link hover2 more-btn"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle ">
            <ArrowDown1 />
          </div>
          <span>Xem thêm</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              text={link.name}
              img={link.icon}
              notification={link.notification}
            />
          ))}
          <div
            className="left_link hover2 more-btn less"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate360 ">
              <ArrowDown1 />
            </div>
            <span>Ẩn bớt</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Lối tắt của bạn</div>
        <div className="edit_shortcut">Chỉnh sửa</div>
      </div>
      <div className="shortcut_list">
        {shortCutData.map((item, idx) => (
          <ShortCut
            key={idx}
            link={item.link}
            img={item.img}
            name={item.name}
          />
        ))}
      </div>
      <div
        className={`fb_copyright nofixed ${visible && "relative_fb_copyright"}`}
      >
        <Link to="/">Quyền riêng tư </Link>
        <span>. </span>
        <Link to="/">Điều kiện </Link>
        <span>. </span>
        <Link to="/">Quảng cáo </Link>
        <span>. </span>
        <Link to="/">
          Lựa chọn quảng cáo <i className="ad_choices_icon"></i>{" "}
        </Link>
        <span>. </span>
        <Link to="/"></Link>Cookies <span>. </span>
        <Link to="/">Xem thêm </Link>
        <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  );
};
export default memo(LeftHome);

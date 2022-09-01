import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import {
  SettingsPrivacy,
  HelpSupport,
  DisplayAccessibility,
} from "./Components";
import { useClickOutside } from "../../../../Hooks";
import * as actions from "../../../../redux/actions";

const UserMenu = ({ user, isShowUserMenu, setIsShowUserMenu }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(0);
  const userMenuRef = useRef(null);

  useClickOutside(userMenuRef, () => {
    document.onclick = (e) => {
      if (e.target.getAttribute("class")?.includes("user-menu-btn")) {
        return;
      }

      setIsShowUserMenu(false);
    };
  });

  const handleLogout = () => {
    dispatch(actions.LOGOUT());
    Cookies.remove("user");
  };

  return (
    <div className="mmenu" ref={userMenuRef}>
      {visible === 0 && isShowUserMenu && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.picture} alt="" />
            <div className="mmenu_col">
              <span>
                {user?.first_name}
                {user?.last_name}
              </span>
              <span>Xem tất cả trang cá nhân</span>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="mmenu_col">
              <div className="mmenu_span1">Gửi phản hồi</div>
              <div className="mmenu_span2">
                Giúp chúng tôi cải thiện Facebook
              </div>
            </div>
          </div>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_item hover3" onClick={() => setVisible(1)}>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Cài đặt & quyền riêng tư</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={() => setVisible(2)}>
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Trợ giúp & Hỗ trợ</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={() => setVisible(3)}>
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Màn hình & Trợ năng</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={handleLogout}>
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Đăng xuất</span>
          </div>
        </div>
      )}
      {visible === 1 && isShowUserMenu && (
        <SettingsPrivacy setVisible={setVisible} />
      )}
      {visible === 2 && isShowUserMenu && (
        <HelpSupport setVisible={setVisible} />
      )}
      {visible === 3 && isShowUserMenu && (
        <DisplayAccessibility setVisible={setVisible} />
      )}
    </div>
  );
};
export default UserMenu;

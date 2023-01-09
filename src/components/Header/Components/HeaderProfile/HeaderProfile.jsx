import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import {
  ArrowDown,
  Menu,
  Messenger,
  Notifications,
} from "../../../../assets/svg";
import MenuList from "../MenuList";
import UserMenu from "../UserMenu/UserMenu";

const HeaderProfile = () => {
  const { profile, user } = useSelector((state) => ({ ...state }));
  const [isShowMenuList, setIsShowMenuList] = useState(false);
  const [isShowUserMenu, setIsShowUserMenu] = useState(false);

  const handleShowMenuList = () => {
    setIsShowMenuList(!isShowMenuList);
  };

  return (
    <div className="header-profile-wrapper">
      <Link to={`/${user?.username}`} className="profile_link hover1">
        <img src={user?.picture} alt="" />
        <span>{user?.first_name}</span>
      </Link>
      <div
        className={`circle_icon hover1 menu-list-btn ${
          isShowMenuList && "header-profile__active"
        } `}
        onClick={() => {
          handleShowMenuList();
        }}
      >
        <Menu className="menu-list-btn" />
      </div>
      <div className="circle_icon hover1">
        <Messenger />
      </div>
      <div className="circle_icon hover1">
        <Notifications />
        <div className="right_notification">5</div>
      </div>
      <div
        className={`circle_icon hover1 user-menu-btn ${
          isShowUserMenu && "header-profile__active"
        }`}
        onClick={() => setIsShowUserMenu(!isShowUserMenu)}
      >
        <ArrowDown className="user-menu-btn" />
      </div>
      {isShowMenuList && (
        <MenuList
          isShowMenuList={isShowMenuList}
          setIsShowMenuList={setIsShowMenuList}
        />
      )}
      {isShowUserMenu && (
        <UserMenu
          setIsShowUserMenu={setIsShowUserMenu}
          isShowUserMenu={isShowUserMenu}
        />
      )}
    </div>
  );
};

export default HeaderProfile;

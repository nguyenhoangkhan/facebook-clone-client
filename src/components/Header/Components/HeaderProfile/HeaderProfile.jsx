import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as actions from "../../../../redux/actions";
import {
  ArrowDown,
  Menu,
  Messenger,
  Notifications,
} from "../../../../assets/svg";
import MenuList from "../MenuList";
import UserMenu from "../UserMenu/UserMenu";
import axios from "axios";

const HeaderProfile = () => {
  const dispatch = useDispatch();

  const { profile, user } = useSelector((state) => ({ ...state }));
  const [isShowMenuList, setIsShowMenuList] = useState(false);
  const [isShowUserMenu, setIsShowUserMenu] = useState(false);

  const handleShowMenuList = () => {
    setIsShowMenuList(!isShowMenuList);
  };
  useEffect(() => {
    const getProfile = async () => {
      try {
        dispatch(actions.PROFILE_REQUEST());

        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/${user?.username}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        dispatch(actions.PROFILE_SUCCESS(data));
      } catch (err) {
        dispatch(actions.PROFILE_ERROR(err));
      }
    };
    getProfile();
  }, [user?.token]);

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
          user={profile?.profile}
          setIsShowUserMenu={setIsShowUserMenu}
          isShowUserMenu={isShowUserMenu}
        />
      )}
    </div>
  );
};

export default HeaderProfile;

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import * as selectors from "../../../../redux/selectors";
import {
  ArrowDown,
  Menu,
  Messenger,
  Notifications,
} from "../../../../assets/svg";
import MenuList from "../MenuList";

const HeaderProfile = () => {
  const { user } = useSelector(selectors.user);
  const [isShowMenuList, setIsShowMenuList] = useState(false);

  const handleShowMenuList = () => {
    setIsShowMenuList(!isShowMenuList);
  };

  return (
    <div className="header-profile-wrapper">
      <Link to="/profile" className="profile_link hover1">
        <img src={user?.picture} alt="" />
        <span>{user?.first_name}</span>
      </Link>
      <div className="circle_icon hover1" onClick={handleShowMenuList}>
        <Menu />
      </div>
      <div className="circle_icon hover1">
        <Messenger />
      </div>
      <div className="circle_icon hover1">
        <Notifications />
        <div className="right_notification">5</div>
      </div>
      <div className="circle_icon hover1">
        <ArrowDown />
      </div>
      {isShowMenuList && (
        <MenuList
          isShowMenuList={isShowMenuList}
          setIsShowMenuList={setIsShowMenuList}
        />
      )}
    </div>
  );
};

export default HeaderProfile;

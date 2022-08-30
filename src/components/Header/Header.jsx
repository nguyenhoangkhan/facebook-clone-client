import { useState } from "react";
import { Search, MiddleIcon, HeaderProfile } from "./Components";
import MenuListMobile from "./Components/MenuListMobile";

const Header = () => {
  const [isShowMenuListMobile, setShowMenuListMobile] = useState(false);
  const handleShowMenuListMobile = () => {
    setShowMenuListMobile(!isShowMenuListMobile);
  };
  return (
    <>
      <header>
        <Search handleShowMenuListMobile={handleShowMenuListMobile} />
        <MiddleIcon />
        <HeaderProfile />
      </header>
      {isShowMenuListMobile && <MenuListMobile />}
    </>
  );
};
export default Header;

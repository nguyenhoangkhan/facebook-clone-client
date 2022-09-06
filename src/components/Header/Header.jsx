import { useState, memo } from "react";
import { useMediaQuery } from "react-responsive";

import { Search, MiddleIcon, HeaderProfile } from "./Components";
import MenuListMobile from "./Components/MenuListMobile";

const Header = () => {
  const [isShowMenuListMobile, setShowMenuListMobile] = useState(false);

  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });

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
      {isShowMenuListMobile && !desktopView && <MenuListMobile />}
    </>
  );
};
export default memo(Header);

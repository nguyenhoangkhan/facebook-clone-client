import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Logo, Search as SearchIcon, Bar } from "../../../../assets/svg";
import SearchList from "./SearchList";
import { useMediaQuery } from "react-responsive";

const Search = ({ handleShowMenuListMobile }) => {
  const [isShowSearchList, setShowSearchList] = useState(false);
  const color = "#65676b";

  const view2 = useMediaQuery({
    query: "(max-width:755px)",
  });
  const view3 = useMediaQuery({
    query: "(max-width:950px)",
  });

  return (
    <div className="search-wrapper ">
      <Link to="/" className="header_logo">
        <div className="circle">
          <Logo />
        </div>
      </Link>
      <div className="search search1" onClick={() => setShowSearchList(true)}>
        <SearchIcon className="search-header-icon" color={color} />
        <input
          type="text"
          placeholder={view3 ? "" : "Tìm kiếm trên Facebook"}
          className="hide_input search-header-input"
          onFocus={() => setShowSearchList(true)}
        />
        {isShowSearchList && (
          <SearchList
            isShowSearchList={isShowSearchList}
            setShowSearchList={setShowSearchList}
          />
        )}
      </div>
      <div className="header-bar">
        {view2 && (
          <span onClick={handleShowMenuListMobile}>
            <Bar color="#9fa0a2" />
          </span>
        )}
      </div>
    </div>
  );
};

export default Search;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Logo, Search as SearchIcon } from "../../../../assets/svg";
import SearchList from "./SearchList";

const Search = () => {
  const [isShowSearchMenu, setShowSearchList] = useState(false);

  const color = "#65676b";

  return (
    <div className="search-wrapper ">
      <Link to="/" className="header_logo">
        <div className="circle">
          <Logo />
        </div>
      </Link>
      <div className="search search1">
        <SearchIcon color={color} />
        <input
          type="text"
          placeholder="Tìm kiếm trên Facebook"
          className="hide_input"
          onFocus={() => setShowSearchList(true)}
        />
        {isShowSearchMenu && (
          <SearchList setShowSearchList={setShowSearchList} />
        )}
      </div>
    </div>
  );
};

export default Search;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Logo, Search as SearchIcon, Bar } from "../../../../assets/svg";
import SearchList from "./SearchList";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "../../../../Hooks";
import * as searchActions from "../../../../functions/search";

const Search = ({ handleShowMenuListMobile }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [isShowSearchList, setShowSearchList] = useState(false);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const color = "#65676b";

  const [search, setSearch] = useState("");

  const view2 = useMediaQuery({
    query: "(max-width:755px)",
  });
  const view3 = useMediaQuery({
    query: "(max-width:950px)",
  });

  const debouncedSearch = useDebounce(search, 600);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setUsers([]);
      return;
    }
    const searchUser = async () => {
      setIsLoading(true);
      const [result, error] = await searchActions.searchUser(
        debouncedSearch,
        user.token
      );
      if (!error) {
        setUsers(result);
        setIsLoading(false);
        return;
      }
      setError(error);
      setIsLoading(false);
    };
    searchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

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
            debouncedSearch={debouncedSearch}
            users={users}
            search={search}
            isLoading={isLoading}
            setSearch={setSearch}
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

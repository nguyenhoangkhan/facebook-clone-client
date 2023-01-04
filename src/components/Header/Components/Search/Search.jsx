import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Logo, Search as SearchIcon, Bar } from "../../../../assets/svg";
import SearchList from "./SearchList";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "../../../../Hooks";

const Search = ({ handleShowMenuListMobile }) => {
  const SERVER_URL = process.env.REACT_APP_BACKEND_URL;
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
      try {
        setIsLoading(true);
        const res = await axios.get(SERVER_URL + "/search", {
          params: {
            q: debouncedSearch.trim(),
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.status === 200) {
          setUsers(res?.data);
        }

        setIsLoading(false);
      } catch (err) {
        setError(err?.response?.data?.message);
        setIsLoading(false);
      }
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

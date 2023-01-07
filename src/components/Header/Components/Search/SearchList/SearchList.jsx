import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import { Return, Search } from "../../../../../assets/svg";
import { getSearchUserHistory } from "../../../../../functions/search";
import { useClickOutside } from "../../../../../Hooks";
import { SearchItem } from "../SearchItem";

const SearchList = ({
  color,
  setShowSearchList,
  search,
  setSearch,
  users,
  token,
  debouncedSearch,
  isLoading,
  isShowSearchList,
  setUsers,
}) => {
  const [iconVisible, setIconVisible] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [usersHistory, setUsersHistory] = useState([]);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside(menuRef, () => {
    setShowSearchList(false);
  });

  const handleGetSearchUserHistory = async () => {
    setIsFetching(true);
    const [result, error] = await getSearchUserHistory(token);
    if (!error) {
      setUsersHistory(result);
    }

    setIsFetching(false);
  };

  useEffect(() => {
    if (isShowSearchList) {
      handleGetSearchUserHistory();
    }
  }, [isShowSearchList]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="search-wrapper search_area scrollbar" ref={menuRef}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (debouncedSearch) {
                setSearch("");
              } else {
                setShowSearchList(false);
              }
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            ref={inputRef}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
          {isLoading && (
            <div
              style={{
                transform: `${
                  iconVisible ? "translateX(1px)" : "translateX(20px)"
                }`,
              }}
            >
              <ClipLoader size={18} color={color} />
            </div>
          )}
        </div>
      </div>
      {!debouncedSearch && (
        <div className="search_history_header ">
          <span>Tìm kiếm gần đây</span>
          <Link to="#" className="hover1 edit-search-history">
            Chỉnh sửa
          </Link>
        </div>
      )}
      <div className="search_history"></div>
      <div className="search_results scrollbar">
        {debouncedSearch
          ? users.map((item, idx) => <SearchItem key={idx} item={item} />)
          : usersHistory.map((item, idx) => (
              <SearchItem
                key={idx}
                item={item.user}
                usersHistory={usersHistory}
                setUsersHistory={setUsersHistory}
                history
              />
            ))}
      </div>
    </div>
  );
};
export default SearchList;

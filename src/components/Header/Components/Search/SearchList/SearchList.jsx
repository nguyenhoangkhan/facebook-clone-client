import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Return, Search } from "../../../../../assets/svg";
import { useClickOutside } from "../../../../../Hooks";
import { SearchItem } from "../SearchItem";

const SearchList = ({
  color,
  setShowSearchList,
  search,
  setSearch,
  users,
  debouncedSearch,
  isLoading,
}) => {
  const [iconVisible, setIconVisible] = useState(true);

  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside(menuRef, () => {
    setShowSearchList(false);
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="search-wrapper search_area scrollbar" ref={menuRef}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchList(false);
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
        <div className="search_history_header">
          <span>Tìm kiếm gần đây</span>
          <a>Chỉnh sửa</a>
        </div>
      )}
      <div className="search_history"></div>
      <div className="search_results scrollbar">
        {users.map((user, idx) => (
          <SearchItem key={idx} user={user} />
        ))}
      </div>
    </div>
  );
};
export default SearchList;

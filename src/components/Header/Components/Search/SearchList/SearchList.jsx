import { useEffect, useRef, useState } from "react";

import { Return, Search } from "../../../../../assets/svg";
import { useClickOutside } from "../../../../../Hooks";

const SearchList = ({ color, setShowSearchList, isShowSearchList }) => {
  const [iconVisible, setIconVisible] = useState(true);

  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside(menuRef, () => {
    setShowSearchList(false);
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  console.log(isShowSearchList);
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
            ref={inputRef}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Tìm kiếm gần đây</span>
        <a>Chỉnh sửa</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
};
export default SearchList;

import { useState } from "react";
import { Link } from "react-router-dom";
import { menuMobile, shortCutMobile } from "../../../../assets/data/menuMobile";
import { arrowUpThin, arrowDownThin } from "../../../../assets/svg";
import MenuItem from "../MenuList/Components/MenuItem";

const MenuListMobile = () => {
  const [more, setMore] = useState(5);
  const [moreShortcut, setMoreShortcut] = useState(5);

  return (
    <div className="menu-list-mobile-wrapper">
      <div className="menu-list-mobile">
        <div className="all_menu_group all_menu_group_mobile">
          {menuMobile.slice(0, `${more}`).map((item, i) => (
            <MenuItem name={item.name} icon={item.icon} key={i} />
          ))}

          {more > 5 ? (
            <MenuItem
              name="Ẩn bớt"
              svg={arrowUpThin}
              onClick={() => setMore((prev) => prev - 13)}
              className="more-btn"
            />
          ) : (
            <MenuItem
              name="Xem thêm"
              svg={arrowDownThin}
              onClick={() => setMore(menuMobile.length)}
              className="more-btn"
            />
          )}
        </div>
        <div className="all_menu_group all_menu_group_mobile">
          <div className="all_menu_header-mobile">
            <span className="all_menu_header-mobile__short-cut-header">
              Lối tắt của bạn
            </span>
          </div>
          {shortCutMobile.slice(0, `${moreShortcut}`).map((item, i) => (
            <MenuItem name={item.name} image={item.image} key={i} />
          ))}

          {moreShortcut > 5 ? (
            <MenuItem
              name="Ẩn bớt"
              svg={arrowUpThin}
              onClick={() => setMoreShortcut(5)}
              className="more-btn"
            />
          ) : (
            <MenuItem
              name="Xem thêm"
              svg={arrowDownThin}
              onClick={() => setMoreShortcut(menuMobile.length)}
              className="more-btn"
            />
          )}
        </div>
      </div>
      <div className="login_footer_wrap">
        <Link to="/">Quyền riêng tư</Link>
        <Link to="/">Diều khoản</Link>
        <Link to="/">Quảng cáo</Link>
        <Link to="/">
          Lựa chọn quảng cáo<i className="adChoices_icon"></i>
        </Link>
        <Link to="/">Cookie</Link>
        <Link to="/">Xem thêm</Link>
        <Link to="/">Meta © 2022</Link>
      </div>
    </div>
  );
};

export default MenuListMobile;

import { useRef } from "react";

import { menu, create } from "../../../../assets/data/menu";
import MenuItem from "./Components/MenuItem";
import { useClickOutside } from "../../../../Hooks";

const MenuList = ({ isShowMenuList, setIsShowMenuList }) => {
  const allMenuRef = useRef(null);

  useClickOutside(allMenuRef, () => {
    setIsShowMenuList(!isShowMenuList);
  });

  return (
    <div className="all_menu" ref={allMenuRef}>
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu" />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Xã hội</div>
            {menu.slice(0, 6).map((item, i) => (
              <MenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Giải trí</div>
            {menu.slice(6, 9).map((item, i) => (
              <MenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Mua sắm</div>
            {menu.slice(9, 11).map((item, i) => (
              <MenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Cá nhân</div>
            {menu.slice(11, 15).map((item, i) => (
              <MenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Chuyên nghiệp</div>
            {menu.slice(15, 17).map((item, i) => (
              <MenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Nguồn lực cho cộng đồng</div>
            {menu.slice(17, 21).map((item, i) => (
              <MenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Sản phẩm khác của Meta</div>
            {menu.slice(21, 23).map((item, i) => (
              <MenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
        </div>
        <div className="all_right">
          <div className="all_right_header">Tạo</div>
          {create.map((item, idx) => (
            <div key={idx} className="all_right_item hover1">
              <div className="all_right_circle">
                <i className={item.icon}></i>
              </div>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MenuList;

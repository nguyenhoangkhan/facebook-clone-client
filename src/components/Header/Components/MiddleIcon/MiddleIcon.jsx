import { NavLink } from "react-router-dom";

import {
  Friends,
  Gaming,
  HomeActive,
  Market,
  Watch,
} from "../../../../assets/svg";

const MiddleIcon = () => {
  const color = "#65676b";

  return (
    <div className="middle-icon-wrapper">
      <NavLink to="/" className="middle_icon">
        <HomeActive />
      </NavLink>
      <NavLink to="/groups" className="middle_icon hover1">
        <Friends color={color} />
      </NavLink>
      <NavLink to="/watch" className="middle_icon hover1">
        <Watch color={color} />
        <div className="middle_notification">9+</div>
      </NavLink>
      <NavLink to="/marketplace" className="middle_icon hover1">
        <Market color={color} />
      </NavLink>
      <NavLink to="/gaming" className="middle_icon hover1">
        <Gaming color={color} />
      </NavLink>
    </div>
  );
};

export default MiddleIcon;

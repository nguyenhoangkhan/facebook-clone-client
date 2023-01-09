import { NavLink } from "react-router-dom";

import {
  Friends,
  Gaming,
  Market,
  Watch,
  Bar,
  Home,
} from "../../../../assets/svg";
import { useMediaQuery } from "react-responsive";
const MiddleIcon = () => {
  const color = "#65676b";

  const view1335px = useMediaQuery({
    query: "(max-width: 1335px)",
  });

  return (
    <div className="middle-icon-wrapper">
      <NavLink to="/" className="middle_icon">
        <Home color={color} />
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
      <NavLink
        to={view1335px ? "/bookmarks" : "/gaming"}
        className="middle_icon hover1 bookmarks-btn"
      >
        {view1335px ? <Bar color="#9fa0a2" /> : <Gaming color={color} />}
      </NavLink>
    </div>
  );
};

export default MiddleIcon;

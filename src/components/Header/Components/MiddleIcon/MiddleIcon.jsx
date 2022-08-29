import { Link } from "react-router-dom";

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
      <Link to="/" className="middle_icon active">
        <HomeActive />
      </Link>
      <Link to="/" className="middle_icon hover1">
        <Friends color={color} />
      </Link>
      <Link to="/" className="middle_icon hover1">
        <Watch color={color} />
        <div className="middle_notification">9+</div>
      </Link>
      <Link to="/" className="middle_icon hover1">
        <Market color={color} />
      </Link>
      <Link to="/" className="middle_icon hover1">
        <Gaming color={color} />
      </Link>
    </div>
  );
};

export default MiddleIcon;

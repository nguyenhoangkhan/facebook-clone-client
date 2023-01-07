import { Link } from "react-router-dom";

const LeftLink = ({ link, img, text, notification }) => {
  return (
    <Link to={link} className="left_link hover2">
      <img src={`../../../left/${img}.png`} alt="" />
      {notification !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </Link>
  );
};
export default LeftLink;

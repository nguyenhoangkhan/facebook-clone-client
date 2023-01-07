import { Link } from "react-router-dom";
import { addSearchUserHistory } from "../../../../../functions/search";
import { useSelector } from "react-redux";

const SearchItem = ({ item, history = false }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleAddSearchUserHistory = async (userId) => {
    addSearchUserHistory(userId, user.token);
  };

  const handleDeleteHistory = (e) => {
    e.preventDefault();
  };

  return (
    <Link
      to={`/${item?.username}`}
      className="search-item hover1"
      onClick={() => handleAddSearchUserHistory(item?._id)}
    >
      <div className="search-item--avatar">
        <img src={item?.picture} alt="" loading="lazy" />
      </div>
      <div className="search-item--name">
        <p>
          {item?.last_name} {item?.first_name}
        </p>
      </div>
      <button className="delete-search-history" onClick={handleDeleteHistory}>
        <i className="exit_icon"></i>
      </button>
    </Link>
  );
};

export default SearchItem;

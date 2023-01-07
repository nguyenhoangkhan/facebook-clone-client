import { Link } from "react-router-dom";
import { addSearchUserHistory } from "../../../../../functions/search";
import { useSelector } from "react-redux";

const SearchItem = ({ item }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleaddSearchUserHistory = async (userId) => {
    addSearchUserHistory(userId, user.token);
  };

  return (
    <Link
      to={`/${item?.username}`}
      className="search-item hover1"
      onClick={() => handleaddSearchUserHistory(item?._id)}
    >
      <div className="search-item--avatar">
        <img src={item?.picture} alt="" loading="lazy" />
      </div>
      <div className="search-item--name">
        <p>
          {item?.last_name} {item?.first_name}
        </p>
      </div>
    </Link>
  );
};

export default SearchItem;

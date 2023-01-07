import { Link } from "react-router-dom";
import {
  addSearchUserHistory,
  deleteSearchUserHistory,
} from "../../../../../functions/search";
import { useSelector } from "react-redux";
import { useState } from "react";

const SearchItem = ({ item, history = false, setUsersHistory }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddSearchUserHistory = async (userId) => {
    const [result, error] = await addSearchUserHistory(userId, user.token);
    if (!error) {
      setUsersHistory(result ? result : []);
    }
  };
  const handleDeleteHistory = async (e) => {
    e.preventDefault();
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    const [result, error] = await deleteSearchUserHistory(item._id, user.token);
    setIsDeleting(false);

    if (!error) {
      setUsersHistory((prev) =>
        prev.filter((user) => user.user._id !== item._id)
      );
    }
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
      {history && (
        <button className="delete-search-history" onClick={handleDeleteHistory}>
          <i className="exit_icon"></i>
        </button>
      )}
    </Link>
  );
};

export default SearchItem;

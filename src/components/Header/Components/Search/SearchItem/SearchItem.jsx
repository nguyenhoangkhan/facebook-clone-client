import { Link } from "react-router-dom";

const SearchItem = ({ user }) => {
  return (
    <Link to={`/${user.username}`} className="search-item hover1">
      <div className="search-item--avatar">
        <img src={user?.picture} alt="" loading="lazy" />
      </div>
      <div className="search-item--name">
        <p>
          {user.last_name} {user.first_name}
        </p>
      </div>
    </Link>
  );
};

export default SearchItem;

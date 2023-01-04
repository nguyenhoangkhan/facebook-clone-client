import { Link } from "react-router-dom";

const FriendsList = ({ friends }) => {
  console.log("profile?.friends? ", friends);

  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Bạn bè
        <div className="profile_header_link">Xem tất cả</div>
      </div>
      {friends && (
        <div className="profile_card_count">
          {friends.length === 0
            ? ""
            : friends.length === 1
            ? "1 bạn bè"
            : `${friends.length} bạn bè`}
        </div>
      )}
      <div className="profile_card_grid">
        {friends?.length &&
          friends.slice(0, 9).map((friend) => (
            <Link to={`/${friend.username}`} className="profile_photo_card">
              <img src={friend.picture} alt="" />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;

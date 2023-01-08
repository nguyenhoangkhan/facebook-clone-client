import { memo, useState } from "react";
import { Link } from "react-router-dom";
import {
  acceptFriendRequest,
  deleteFriendRequest,
  cancelFriendRequest,
} from "../../../../functions/friendship";

const Card = ({ token, type, getList, item }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteFriendRequest = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    await deleteFriendRequest(item._id, token);
    getList();
    setIsLoading(false);
  };
  const handleAcceptFriendRequest = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    await acceptFriendRequest(item._id, token);
    getList();
    setIsLoading(false);
  };

  const handleCancelFriendRequest = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    await cancelFriendRequest(item._id, token);
    getList();
    setIsLoading(false);
  };

  return (
    <div className="req_card">
      <Link to={`/profile/${item?.username}`}>
        <img src={item?.picture} alt="" />
      </Link>
      <div className="req_name">
        {item?.first_name} {item?.last_name}
      </div>
      {type === "sent" ? (
        <button className="blue_btn" onClick={handleDeleteFriendRequest}>
          Hủy lời mời
        </button>
      ) : type === "request" ? (
        <>
          <button className="blue_btn" onClick={handleAcceptFriendRequest}>
            Xác nhận
          </button>
          <button className="gray_btn" onClick={handleCancelFriendRequest}>
            Xóa
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default memo(Card);

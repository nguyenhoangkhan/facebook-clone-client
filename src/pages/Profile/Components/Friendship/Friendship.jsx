import { memo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import { useClickOutside } from "../../../../Hooks";
import {
  acceptFriendRequest,
  addFriend,
  cancelFriendRequest,
  deleteFriendRequest,
  follow,
  unFollow,
  unFriend,
} from "../../../../functions/friendship";
import { useEffect } from "react";

const Friendship = ({ friendshipInfo, profileId }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [isLoading, setIsLoading] = useState(false);

  const [friendship, setFriendship] = useState({});

  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);

  const menuRef = useRef(null);
  const respondMenuRef = useRef(null);
  useClickOutside(menuRef, () => setFriendsMenu(false));
  useClickOutside(respondMenuRef, () => setRespondMenu(false));

  useEffect(() => {
    setFriendship(friendshipInfo);
  }, [friendshipInfo]);
  console.log("friendship ", friendship);

  const handleAddFriend = async () => {
    setIsLoading(true);
    await addFriend(profileId, user.token);
    setIsLoading(false);
  };

  const handleUnFriend = async () => {
    setIsLoading(true);
    await unFriend(profileId, user.token);
    setIsLoading(false);
  };

  const handleDeleteFriendRequest = async () => {
    setIsLoading(true);
    await deleteFriendRequest(profileId, user.token);
    setIsLoading(false);
  };

  const handleFollow = async () => {
    setIsLoading(true);
    await follow(profileId, user.token);
    setIsLoading(false);
  };

  const handleUnFollow = async () => {
    setIsLoading(true);
    await unFollow(profileId, user.token);
    setIsLoading(false);
  };

  const handleAcceptFriendRequest = async () => {
    setIsLoading(true);
    await acceptFriendRequest(profileId, user.token);
    setIsLoading(false);
  };

  const handleCancelFriendRequest = async () => {
    setIsLoading(true);
    await cancelFriendRequest(profileId, user.token);
    setIsLoading(false);
  };

  return (
    <div className="friendship">
      {friendship?.isFriend ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>Bạn bè</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Yêu thích
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/editFriends.png" alt="" />
                Chỉnh sửa danh sách bạn bè
              </div>
              {friendship?.isFollowing ? (
                <button
                  className="open_cover_menu_item hover1"
                  onClick={handleUnFollow}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Hủy theo dõi
                </button>
              ) : (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleFollow}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Theo dõi
                </div>
              )}
              <div
                className="open_cover_menu_item hover1"
                onClick={handleUnFriend}
              >
                <i className="unfriend_outlined_icon"></i>
                Hủy kết bạn
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn" onClick={handleAddFriend}>
            {isLoading ? (
              <PulseLoader color="white" size={5} />
            ) : (
              <>
                <img
                  src="../../../icons/addFriend.png"
                  alt=""
                  className="invert"
                />
                <span>Kết bạn</span>
              </>
            )}
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="blue_btn" onClick={handleDeleteFriendRequest}>
          <img
            width={15}
            height={15}
            src="../../../icons/cancelRequest.png"
            className="invert"
            alt=""
          />
          <span>Hủy bỏ lời mời</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Phản hồi</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={respondMenuRef}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleAcceptFriendRequest}
                >
                  Xác nhận
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleCancelFriendRequest}
                >
                  Xóa
                </div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.isFollowing ? (
        <button className="gray_btn">
          <img
            width={15}
            height={15}
            src="../../../icons/followed.png"
            alt=""
          />
          <span>Đang theo dõi</span>
        </button>
      ) : (
        <button className="blue_btn" onClick={handleFollow}>
          <img src="../../../icons/follow.png" className="invert" alt="" />
          <span>Theo dõi</span>
        </button>
      )}
      <button className={friendship?.isFriends ? "blue_btn" : "gray_btn"}>
        <img
          src="../../../icons/message.png"
          width={15}
          height={15}
          className={friendship?.isFriends && "invert"}
          alt=""
        />
        <span>Gửi tin nhắn</span>
      </button>
    </div>
  );
};

export default memo(Friendship);

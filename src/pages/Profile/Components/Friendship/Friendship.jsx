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

  const handleAddFriend = async () => {
    setIsLoading(true);
    await addFriend(profileId, user.token);
    setFriendship({
      ...friendship,
      requestSent: true,
      isFollowing: true,
    });
    setIsLoading(false);
  };

  const handleUnFriend = async () => {
    setIsLoading(true);
    await unFriend(profileId, user.token);
    setFriendship({
      ...friendship,
      isFriend: false,
      isFollowing: false,
    });
    setIsLoading(false);
  };

  const handleDeleteFriendRequest = async () => {
    setIsLoading(true);
    await deleteFriendRequest(profileId, user.token);
    setFriendship({
      ...friendship,
      requestSent: false,
    });
    setIsLoading(false);
  };

  const handleFollow = async () => {
    setIsLoading(true);
    await follow(profileId, user.token);
    setFriendship({
      ...friendship,
      isFollowing: true,
    });
    setIsLoading(false);
  };

  const handleUnFollow = async () => {
    setIsLoading(true);
    await unFollow(profileId, user.token);
    setFriendship({
      ...friendship,
      isFollowing: false,
    });
    setIsLoading(false);
  };

  const handleAcceptFriendRequest = async () => {
    setIsLoading(true);
    await acceptFriendRequest(profileId, user.token);
    setFriendship({
      ...friendship,
      isFriend: true,
      isFollowing: true,
      requestReceived: false,
    });
    setIsLoading(false);
  };

  const handleCancelFriendRequest = async () => {
    setIsLoading(true);
    await cancelFriendRequest(profileId, user.token);
    setFriendship({
      ...friendship,
      requestReceived: false,
    });
    setIsLoading(false);
  };

  return (
    <div className="friendship">
      {friendship?.isFriend ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img
              src="../../../icons/friends.png"
              alt=""
              width={15}
              height={15}
            />
            <span>B???n b??</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <button className="open_cover_menu_item hover1">
                <img
                  src="../../../icons/favoritesOutline.png"
                  alt=""
                  width={20}
                  height={20}
                />
                Y??u th??ch
              </button>
              <button className="open_cover_menu_item hover1">
                <img
                  src="../../../icons/editFriends.png"
                  alt=""
                  width={20}
                  height={20}
                />
                Ch???nh s???a danh s??ch b???n b??
              </button>
              {friendship?.isFollowing ? (
                <button
                  className="open_cover_menu_item hover1"
                  onClick={handleUnFollow}
                >
                  <img
                    src="../../../icons/unfollowOutlined.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                  H???y theo d??i
                </button>
              ) : (
                <button
                  className="open_cover_menu_item hover1"
                  onClick={handleFollow}
                >
                  <img
                    src="../../../icons/unfollowOutlined.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                  Theo d??i
                </button>
              )}
              <button
                className="open_cover_menu_item hover1"
                onClick={handleUnFriend}
              >
                <i
                  className="unfriend_outlined_icon"
                  width={20}
                  height={20}
                ></i>
                H???y k???t b???n
              </button>
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
                  width={15}
                  height={15}
                />
                <span>K???t b???n</span>
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
          <span>H???y b??? l???i m???i</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Ph???n h???i</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={respondMenuRef}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleAcceptFriendRequest}
                >
                  X??c nh???n
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={handleCancelFriendRequest}
                >
                  X??a
                </div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.isFollowing ? (
        <button className="gray_btn" onClick={handleUnFollow}>
          <img
            width={15}
            height={15}
            src="../../../icons/followed.png"
            alt=""
          />
          <span>??ang theo d??i</span>
        </button>
      ) : (
        <button className="blue_btn" onClick={handleFollow}>
          <img
            src="../../../icons/follow.png"
            className="invert"
            alt=""
            width={15}
            height={15}
          />
          <span>Theo d??i</span>
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
        <span>G???i tin nh???n</span>
      </button>
    </div>
  );
};

export default memo(Friendship);

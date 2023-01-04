import { memo, useRef, useState } from "react";
import { useClickOutside } from "../../../../Hooks";

const Friendship = ({ friendship }) => {
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);

  const menuRef = useRef(null);
  const respondMenuRef = useRef(null);
  useClickOutside(menuRef, () => setFriendsMenu(false));
  useClickOutside(respondMenuRef, () => setRespondMenu(false));

  return (
    <div className="friendship">
      {friendship?.friends ? (
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
              {friendship?.following ? (
                <div className="open_cover_menu_item hover1">
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Hủy theo dõi
                </div>
              ) : (
                <div className="open_cover_menu_item hover1">
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Theo dõi
                </div>
              )}
              <div className="open_cover_menu_item hover1">
                <i className="unfriend_outlined_icon"></i>
                Hủy kết bạn
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn">
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Kết bạn</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="blue_btn">
          <img
            src="../../../icons/cancelRequest.png"
            className="invert"
            alt=""
          />
          <span>Hủy bỏ yêu cầu</span>
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
                <div className="open_cover_menu_item hover1">Xác nhận</div>
                <div className="open_cover_menu_item hover1">Xóa</div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.following ? (
        <button className="gray_btn">
          <img src="../../../icons/follow.png" alt="" />
          <span>Đang theo dõi</span>
        </button>
      ) : (
        <button className="blue_btn">
          <img src="../../../icons/follow.png" className="invert" alt="" />
          <span>Theo dõi</span>
        </button>
      )}
      <button className={friendship?.friends ? "blue_btn" : "gray_btn"}>
        <img
          src="../../../icons/message.png"
          className={friendship?.friends && "invert"}
          alt=""
        />
        <span>Gửi tin nhắn</span>
      </button>
    </div>
  );
};

export default memo(Friendship);

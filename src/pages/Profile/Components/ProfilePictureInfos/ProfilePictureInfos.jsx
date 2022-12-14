import { useState } from "react";
import { Friendship } from "../Friendship";
import ProfileAvatar from "../ProfileAvatar";
import { Link } from "react-router-dom";

const ProfilePictureInfos = ({ profile = {}, photos = [], isVisitor }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="profile_img_wrap">
      {show && <ProfileAvatar setShow={setShow} photos={photos} />}

      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile?.picture})`,
            }}
          ></div>
          <div className="profile_circle hover1">
            <i className="camera_filled_icon" onClick={() => setShow(true)}></i>
          </div>
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            <p>
              {profile?.first_name} {profile?.last_name}
            </p>
            {profile?.details?.otherName && (
              <span className="othername">({profile?.details?.otherName})</span>
            )}
          </div>
          <div className="profile_friend_count">
            {profile?.friends?.length ? (
              <div className="profile_card_count">
                {`${profile?.friends.length} bạn bè`}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profile_friend_imgs">
            {profile?.friends.length
              ? profile.friends.slice(0, 6).map((friend, i) => (
                  <Link to={`/${friend.username}`} key={i}>
                    <img
                      src={friend.picture}
                      alt=""
                      style={{
                        transform: `translateX(${-i * 7}px)`,
                        zIndex: `${i}`,
                      }}
                    />
                  </Link>
                ))
              : ""}
          </div>
        </div>
      </div>
      {isVisitor ? (
        <Friendship
          friendshipInfo={profile?.friendship}
          profileId={profile?._id}
        />
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn add-to-story-btn">
            <img src="/icons/plus.png" alt="" className="invert" />
            <span>Thêm vào tin</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Chỉnh sửa trang cá nhân</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureInfos;

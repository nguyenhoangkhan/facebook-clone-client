import { useState } from "react";
import { Friendship } from "../Friendship";
import ProfileAvatar from "../ProfileAvatar";

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
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {isVisitor ? (
        <Friendship friendship={profile?.friendship} profileId={profile?._id} />
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

import { Link } from "react-router-dom";
import { Dots } from "../../../../assets/svg";

const ProfileMenu = () => {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="posts" className="profile_menu_active">
          Bài viết
        </Link>
        <Link to="about" className="hover1">
          Thông tin
        </Link>
        <Link to="friends" className="hover1">
          Bạn bè
        </Link>
        <Link to="photos" className="hover1">
          Hình ảnh
        </Link>
        <Link to="videos" className="hover1">
          Videos
        </Link>
        <Link to="more" className="hover1">
          Xem thêm
        </Link>
        <div className="p10_dots ">
          <Dots />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;

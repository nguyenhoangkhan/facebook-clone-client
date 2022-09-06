import { useRef, useState } from "react";

import PostMenuItem from "./Components/PostMenuItem";
import useOnClickOutside from "../../../../Hooks/useClickOutside";

const PostMenu = ({ postUserId, userId, imagesLength, setShowMenu }) => {
  const own = userId === postUserId ? true : false;
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));

  return (
    <ul className="post_menu" ref={menu}>
      {own && <PostMenuItem icon="pin_icon" title="Ghim bài viết" />}
      <PostMenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Thêm vào mục lưu trữ."
      />
      <div className="line"></div>
      {own && <PostMenuItem icon="edit_icon" title="Chỉnh sửa bài viết" />}
      {!own && (
        <PostMenuItem
          icon="turnOnNotification_icon"
          title="Bật thông báo cho bài viết này"
        />
      )}
      {imagesLength && <PostMenuItem icon="download_icon" title="Tải xuống" />}
      {imagesLength && (
        <PostMenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {own && (
        <PostMenuItem
          img="../../../icons/lock.png"
          title="Chỉnh sửa người xem"
        />
      )}
      {own && (
        <PostMenuItem
          icon="turnOffNotifications_icon"
          title="Tắt thông báo về bài viết này"
        />
      )}
      {own && <PostMenuItem icon="delete_icon" title="Tắt dịch tự động" />}
      {own && <PostMenuItem icon="date_icon" title="Chỉnh sửa thời gian" />}
      {own && <PostMenuItem icon="archive_icon" title="Thêm vào mục lưu trữ" />}
      {own && (
        <PostMenuItem
          icon="trash_icon"
          title="Bỏ vào thùng rác"
          subtitle="Bài viết trong thùng rác sẽ bị xóa sau 30 ngày"
        />
      )}
      {!own && <div className="line"></div>}
      {!own && (
        <PostMenuItem
          img="../../../icons/report.png"
          title="Báo cáo bài viết"
          subtitle="Tôi lo ngại về bài viết này"
        />
      )}
    </ul>
  );
};
export default PostMenu;

import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import PostMenuItem from "./Components/PostMenuItem";
import useOnClickOutside from "../../../../Hooks/useClickOutside";
import * as actions from "../../../../redux/actions";

const PostMenu = ({
  postUserId,
  userId,
  postId,
  imagesLength,
  userToken,
  setShowMenu,
}) => {
  const dispatch = useDispatch();
  const own = userId === postUserId ? true : false;
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));

  const handleDeletePost = async (postId) => {
    try {
      const serverURL = process.env.REACT_APP_BACKEND_URL;
      const { data } = await axios.patch(
        serverURL + "/post",
        {
          postId,
        },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );

      dispatch(actions.POST_SUCCESS(data));
    } catch (err) {}
  };

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
      {/* {imagesLength && <PostMenuItem icon="download_icon" title="Tải xuống" />} */}
      {/* {imagesLength && (
        <PostMenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )} */}
      {own && (
        <PostMenuItem
          img="../../../icons/lock.png"
          title="Chỉnh sửa quyền riêng tư"
        />
      )}
      {own && (
        <PostMenuItem
          icon="turnOffNotifications_icon"
          title="Tắt thông báo về bài viết này"
        />
      )}
      {/* {own && <PostMenuItem icon="delete_icon" title="Tắt dịch tự động" />} */}
      {/* {own && <PostMenuItem icon="date_icon" title="Chỉnh sửa thời gian" />} */}
      {/* {own && <PostMenuItem icon="archive_icon" title="Thêm vào mục lưu trữ" />} */}
      {own && (
        <PostMenuItem
          icon="trash_icon"
          title="Bỏ vào thùng rác"
          subtitle="Bài viết trong thùng rác sẽ bị xóa sau 30 ngày"
          onClick={() => handleDeletePost(postId)}
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

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import PostMenuItem from "./Components/PostMenuItem";
import useOnClickOutside from "../../../../Hooks/useClickOutside";
import * as actions from "../../../../redux/actions";
import { useParams } from "react-router-dom";
import {
  savePost,
  softDeletePost,
  unSavePost,
} from "../../../../functions/post";

const PostMenu = ({
  postUserId,
  userId,
  postId,
  userToken,
  setShowMenu,
  user,
  savedPosts,
  handleGetSavedPosts,
}) => {
  const dispatch = useDispatch();
  const { username } = useParams();

  const own = userId === postUserId ? true : false;

  const isOwnProfile = user.username === username;

  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));

  const [loadingSave, setLoadingSave] = useState(false);

  const handleDeletePost = async (postId) => {
    const [result, err] = await softDeletePost(postId, userToken);
    if (!err) {
      dispatch(
        isOwnProfile
          ? actions.PROFILE_POST_SUCCESS(result)
          : actions.POST_SUCCESS(result)
      );
    }
    setShowMenu(false);
  };

  const handleSavePost = async () => {
    setLoadingSave(true);
    await savePost(postId, userToken);
    handleGetSavedPosts();
    setLoadingSave(false);
  };
  const handleUnSavePost = async () => {
    setLoadingSave(true);
    await unSavePost(postId, userToken);
    handleGetSavedPosts();
    setLoadingSave(false);
  };

  return (
    <ul className="post_menu" ref={menu}>
      {own && <PostMenuItem icon="pin_icon" title="Ghim bài viết" />}
      {savedPosts && savedPosts.map((item) => item.post).includes(postId) ? (
        <PostMenuItem
          icon="save_icon"
          title="Bỏ lưu bài viết"
          subtitle="Gỡ bài viết khỏi danh sách mục lưu trữ."
          onClick={handleUnSavePost}
          loading={loadingSave}
        />
      ) : (
        <PostMenuItem
          icon="save_icon"
          title="Lưu bài viết"
          subtitle="Thêm vào danh sách mục lưu trữ."
          onClick={handleSavePost}
          loading={loadingSave}
        />
      )}

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

import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import PostMenuItem from "../../../../../../components/Post/Components/PostMenu/Components/PostMenuItem";
import { useClickOutside } from "../../../../../../Hooks";
import * as selectors from "../../../../../../redux/selectors";

const TrashItemMenu = ({ setShowTrashItemMenu, postId, getPostsDeleted }) => {
  const user = useSelector(selectors.user);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    setShowTrashItemMenu(false);
  });

  const handleRestorePost = async (postId) => {
    try {
      const serverURL = process.env.REACT_APP_BACKEND_URL;
      await axios.patch(
        serverURL + "/post/restorePosts",
        {
          postId,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      await getPostsDeleted();
    } catch (err) {
      return err?.response?.data?.message;
    }
  };
  const handleForceDeletePost = async (postId) => {
    try {
      const serverURL = process.env.REACT_APP_BACKEND_URL;
      await axios.delete(serverURL + "/post/" + postId, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      await getPostsDeleted();
    } catch (err) {
      return err?.response?.data?.message;
    }
  };

  return (
    <ul ref={menuRef} className="post_menu trash-item-menu-wrapper">
      <PostMenuItem
        icon="archive_icon"
        title="Lưu trữ"
        subtitle="Chuyển vào kho lưu trữ"
      />
      <PostMenuItem
        icon="refresh_icon"
        title="Khôi phục"
        subtitle="Khôi phục về trang cá nhân"
        onClick={() => handleRestorePost(postId)}
      />
      <PostMenuItem
        icon="trash_icon"
        title="Xóa"
        subtitle="Xóa"
        onClick={() => handleForceDeletePost(postId)}
      />
    </ul>
  );
};

export default TrashItemMenu;

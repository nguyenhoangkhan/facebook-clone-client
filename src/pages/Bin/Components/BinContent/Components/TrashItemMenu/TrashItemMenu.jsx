import { useRef } from "react";

import PostMenuItem from "../../../../../../components/Post/Components/PostMenu/Components/PostMenuItem";
import { useClickOutside } from "../../../../../../Hooks";

const TrashItemMenu = ({ setShowTrashItemMenu }) => {
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    setShowTrashItemMenu(false);
  });
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
      />
      <PostMenuItem icon="trash_icon" title="Xóa" subtitle="Xóa" />
    </ul>
  );
};

export default TrashItemMenu;

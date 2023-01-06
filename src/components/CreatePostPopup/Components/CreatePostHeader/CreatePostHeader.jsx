const CreatePostHeader = ({ user, setShowCreatePostPopup }) => {
  return (
    <>
      <div className="box_header">
        <div
          className="small_circle cursor-pointer"
          onClick={() => setShowCreatePostPopup(false)}
        >
          <i className="exit_icon"></i>
        </div>
        <span>Tạo bài viết</span>
      </div>
      <div className="box_profile">
        <img src={user?.picture} alt="" className="box_profile_img" />
        <div className="box_col">
          <div className="box_profile_name">
            {user?.first_name} {user?.last_name}
          </div>
          <div className="box_privacy">
            <img src="../../../icons/public.png" alt="" />
            <span>Công khai</span>
            <i className="arrowDown_icon"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostHeader;

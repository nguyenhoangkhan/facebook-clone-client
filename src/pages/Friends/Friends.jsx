import Header from "../../components/Header";

const Friends = () => {
  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Bạn bè</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <div className="menu_item  active_friends">
              <div className="small_circle" style={{ background: "#1876f2" }}>
                <i className="friends_home_icon invert"></i>
              </div>
              <span>Trang chủ</span>
            </div>
            <div className="menu_item hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Lời mời</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Lời mời đã gửi</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Gợi ý</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Tất cả bạn bè</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Sinh nhật</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Tùy chỉnh danh sách</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="friends_right"></div>
      </div>
    </>
  );
};

export default Friends;

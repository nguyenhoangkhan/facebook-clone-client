import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header";
import { getFriendsPageInfos } from "../../functions/friends";

const Friends = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [list, setList] = useState({});

  useEffect(() => {
    const getList = async () => {
      const [result, error] = await getFriendsPageInfos(user.token);

      if (!error) {
        console.log("result ", result);
      }

      console.log("error ", error);
    };
    getList();
  }, []);

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
            <div className="menu_item item_left  active_friends">
              <div className="small_circle" style={{ background: "#1876f2" }}>
                <i className="friends_home_icon invert"></i>
              </div>
              <span>Trang chủ</span>
            </div>
            <div className="menu_item item_left hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Lời mời</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item item_left hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Lời mời đã gửi</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item item_left hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Gợi ý</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item item_left hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Tất cả bạn bè</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item item_left hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Sinh nhật</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item item_left hover3">
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

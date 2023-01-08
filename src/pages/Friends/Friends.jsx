import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import { getFriendsPageInfos } from "../../functions/friends";
import { Card } from "./Components/Card";

const Friends = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [list, setList] = useState({
    data: {},
    isLoading: false,
    error: "",
  });

  const getList = async () => {
    setList((prev) => ({ ...prev, isLoading: true }));

    const [result, error] = await getFriendsPageInfos(user.token);

    if (error) {
      setList((prev) => ({ ...prev, isLoading: false, error: error }));

      return;
    }

    setList((prev) => ({ ...prev, isLoading: false, data: result }));
  };

  useEffect(() => {
    getList();
  }, [user.token]);

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
        <div className="friends_right">
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Yêu cầu kết bạn</h3>
              <Link to="#" className="see_link hover3">
                Xem tất cả
              </Link>
            </div>
            <div className="flex_wrap">
              {list.data.request &&
                list.data.request.map((item) => (
                  <Card
                    key={item._id}
                    token={user.token}
                    item={item}
                    getList={getList}
                    type="request"
                  />
                ))}
            </div>
          </div>
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Lời mời đã gửi</h3>
              <Link to="#" className="see_link hover3">
                Xem tất cả
              </Link>
            </div>
            <div className="flex_wrap">
              {list.data.sent &&
                list.data.sent.map((item) => (
                  <Card
                    key={item._id}
                    token={user.token}
                    item={item}
                    getList={getList}
                    type="sent"
                  />
                ))}
            </div>
          </div>
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Bạn bè</h3>
              <Link to="#" className="see_link hover3">
                Xem tất cả
              </Link>
            </div>
            <div className="flex_wrap">
              {list.data.friends &&
                list.data.friends.map((item) => (
                  <Card
                    key={item._id}
                    token={user.token}
                    item={item}
                    getList={getList}
                    type="friends"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;

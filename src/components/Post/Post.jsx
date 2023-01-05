import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useState, memo } from "react";
import "moment/locale/vi"; // without this line it didn't work

import { Dots, Public } from "../../assets/svg";
import ReactsPopup from "../ReactsPopup";
import CreateComment from "./Components/CreateComment";
import PostMenu from "./Components/PostMenu";
import { useEffect } from "react";
import { getReacts, reactPost } from "../../functions/post";

const Post = ({ post, user }) => {
  const [isShowReactsPopup, setShowReactsPopup] = useState(false);
  const [isShowMenu, setShowMenu] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [err, setErr] = useState("");

  const [reacts, setReacts] = useState([]);
  const [hasReact, setHasReact] = useState("");

  const handleReactPost = async (react) => {
    if (isReacting) {
      return;
    }

    setIsReacting(true);
    await reactPost(post._id, react, user.token);
    if (hasReact === react) {
      setHasReact("");
    } else {
      setHasReact(react);
    }
    setIsReacting(false);
  };

  const handleGetReacts = async () => {
    setIsLoading(true);

    const [result, error] = await getReacts(post._id, user.token);
    if (error) {
      return setErr(error);
    }

    setErr("");
    setReacts(result?.reacts);
    setHasReact(result?.currentUserReact);

    setIsLoading(false);
  };

  useEffect(() => {
    handleGetReacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);
  return (
    <div className="post">
      <div className="post_header">
        <Link to={`/${post.user.username}`} className="post_header_left">
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_profile">
                {post.type === "profilePicture" &&
                  `đã cập nhật ảnh đại diện của ${
                    post.user.gender === "male" ? "anh ấy" : "cô ấy"
                  }`}
                {post.type === "coverPicture" &&
                  `đã cập nhật ảnh bìa của ${
                    post.user.gender === "male" ? "anh ấy" : "cô ấy"
                  }`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : (
        <>
          {" "}
          <div className="post_text">{post.text}</div>{" "}
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, idx) => (
                <img
                  className={`img-${idx}`}
                  key={idx}
                  src={image.url}
                  alt=""
                />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            <div className="reacts_count_num"></div>
          </div>
          <div className="to_right">
            <div className="comments_count">13 bình luận</div>
            <div className="share_count">1 chia sẻ</div>
          </div>
        </div>
      </div>
      <div className="post_actions">
        {isShowReactsPopup && (
          <ReactsPopup
            handleReactPost={handleReactPost}
            setShowReactsPopup={setShowReactsPopup}
          />
        )}
        <div
          className="post_action hover1"
          onMouseOver={() =>
            setTimeout(() => {
              setShowReactsPopup(true);
            }, 500)
          }
          onMouseLeave={() =>
            setTimeout(() => {
              setShowReactsPopup(false);
            }, 500)
          }
          onClick={() => handleReactPost(hasReact ? hasReact : "like")}
        >
          {hasReact ? (
            <>
              <img
                src={`../../../reacts/${hasReact}.svg`}
                alt=""
                className="small_react"
                style={{ width: "18px" }}
              />
              <span
                style={{
                  color: `${
                    hasReact === "like"
                      ? "rgb(32, 120, 244)"
                      : hasReact === "haha"
                      ? "rgb(247, 177, 37)"
                      : hasReact === "love"
                      ? "rgb(243, 62, 88)"
                      : hasReact === "wow"
                      ? "rgb(247, 177, 37)"
                      : hasReact === "angry"
                      ? "rgb(233, 113, 15)"
                      : hasReact === "sad"
                      ? "rgb(247, 177, 37)"
                      : ""
                  }`,
                }}
              >
                {hasReact === "like"
                  ? "Thích"
                  : hasReact === "haha"
                  ? "Haha"
                  : hasReact === "love"
                  ? "Yêu thương"
                  : hasReact === "wow"
                  ? "Wow"
                  : hasReact === "angry"
                  ? "Phẫn nộ"
                  : hasReact === "sad"
                  ? "Buồn"
                  : "Thích"}
              </span>
            </>
          ) : (
            <>
              <i className="like_icon"></i>
              <span>Thích</span>
            </>
          )}
        </div>
        <div className="post_action hover1 ">
          <i className="comment_icon"></i>
          <span>Bình luận</span>
        </div>
        <div className="post_action hover1 ">
          <i className="share_icon"></i>
          <span>Chia sẻ</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComment user={user} />
      </div>
      {isShowMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          userToken={user.token}
          postId={post._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
};

export default memo(Post);

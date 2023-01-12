import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useState, memo } from "react";
import "moment/locale/vi"; // without this line it didn't work

import { Dots, Public } from "../../assets/svg";
import ReactsPopup from "../ReactsPopup";
import CreateComment from "./Components/CreateComment";
import PostMenu from "./Components/PostMenu";
import { useEffect } from "react";
import { getReacts, getSavedPosts, reactPost } from "../../functions/post";
import Comment from "./Components/Comment/Comment";

const Post = ({ post, user }) => {
  const [isShowReactsPopup, setShowReactsPopup] = useState(false);
  const [isShowMenu, setShowMenu] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [err, setErr] = useState("");

  const [reacts, setReacts] = useState([]);
  const [currentReact, setCurrentReact] = useState("");
  const [totalReacts, setTotalReacts] = useState(0);
  const [count, setCount] = useState(1);
  const [savedPosts, setSavedPosts] = useState([]);

  const [comments, setComments] = useState(
    post?.comments ? post?.comments : []
  );

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  const handleReactPost = async (react) => {
    if (isReacting) {
      return;
    }

    setIsReacting(true);
    await reactPost(post._id, react, user.token);

    if (currentReact === react) {
      setCurrentReact("");
      const index = reacts.findIndex((item) => item.react === currentReact);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotalReacts((prev) => --prev);
      }
    } else {
      setCurrentReact(react);
      const currentReactIndex = reacts.findIndex(
        (item) => item.react === react
      );
      const prevReactIndex = reacts.findIndex(
        (item) => item.react === currentReact
      );

      if (currentReactIndex !== -1) {
        setReacts([
          ...reacts,
          (reacts[currentReactIndex].count = ++reacts[currentReactIndex].count),
        ]);
        setTotalReacts((prev) => ++prev);
      }
      if (prevReactIndex !== -1) {
        setReacts([
          ...reacts,
          (reacts[prevReactIndex].count = --reacts[prevReactIndex].count),
        ]);
        setTotalReacts((prev) => --prev);
      }
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
    setReacts(result?.reacts.sort((a, b) => b.count - a.count));
    setCurrentReact(result?.currentUserReact);
    setTotalReacts(result?.total);

    setIsLoading(false);
  };

  const handleGetSavedPosts = async () => {
    const [result, err] = await getSavedPosts(user.token);
    if (!err) {
      setSavedPosts(result);
    }
  };

  useEffect(() => {
    handleGetReacts();
    handleGetSavedPosts();
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
            {reacts.length
              ? reacts
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 3)
                  .map(
                    (item, idx) =>
                      item.count > 0 && (
                        <img
                          key={idx}
                          src={`/reacts/${item.react}.svg`}
                          alt=""
                        />
                      )
                  )
              : ""}
          </div>
          <div className="reacts_count_num">
            {totalReacts > 0 && totalReacts}
          </div>
        </div>
        <div className="to_right">
          <div className="comments_count">{comments?.length} bình luận</div>
          {/* <div className="share_count">0 chia sẻ</div> */}
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
          onClick={() => handleReactPost(currentReact ? currentReact : "like")}
        >
          {currentReact ? (
            <>
              <img
                src={`../../../reacts/${currentReact}.svg`}
                alt=""
                className="small_react"
                style={{ width: "18px" }}
              />
              <span
                style={{
                  color: `${
                    currentReact === "like"
                      ? "rgb(32, 120, 244)"
                      : currentReact === "haha"
                      ? "rgb(247, 177, 37)"
                      : currentReact === "love"
                      ? "rgb(243, 62, 88)"
                      : currentReact === "wow"
                      ? "rgb(247, 177, 37)"
                      : currentReact === "angry"
                      ? "rgb(233, 113, 15)"
                      : currentReact === "sad"
                      ? "rgb(247, 177, 37)"
                      : ""
                  }`,
                }}
              >
                {currentReact === "like"
                  ? "Thích"
                  : currentReact === "haha"
                  ? "Haha"
                  : currentReact === "love"
                  ? "Yêu thương"
                  : currentReact === "wow"
                  ? "Wow"
                  : currentReact === "angry"
                  ? "Phẫn nộ"
                  : currentReact === "sad"
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
        <CreateComment
          postId={post._id}
          user={user}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div
            className="view_comments"
            onClick={() => setCount((prev) => prev + 3)}
          >
            Xem thêm bình luận
          </div>
        )}
      </div>
      {isShowMenu && (
        <PostMenu
          user={user}
          userId={user.id}
          postUserId={post.user._id}
          userToken={user.token}
          postId={post._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
          savedPosts={savedPosts}
          handleGetSavedPosts={handleGetSavedPosts}
        />
      )}
    </div>
  );
};

export default memo(Post);

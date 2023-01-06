import { memo } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <Link to={"/" + comment.commentBy.username}>
        <img src={comment.commentBy.picture} alt="" className="comment_img" />
      </Link>
      <div className="comment_col">
        <div className="comment_wrap">
          <Link to={"/" + comment.commentBy.username} className="comment_name">
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </Link>
          <div className="comment_text">{comment.comment}</div>
        </div>
        {comment.image && (
          <img src={comment.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Thích</span>
          <span>Trả lời</span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);

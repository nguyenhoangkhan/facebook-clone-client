import { Dots } from "../../../../../../assets/svg";
import { useState, useRef } from "react";
import Moment from "react-moment";
import "moment/locale/vi";

import TrashItemMenu from "../TrashItemMenu/TrashItemMenu";

const TrashItem = ({ text, user, deleteAt, images }) => {
  const [isShowTrashItemMenu, setShowTrashItemMenu] = useState(false);

  return (
    <div className="trash-item-wrapper ">
      <div className="trash-item-checkbox hover1">
        <input type="checkbox" />
      </div>
      <div className="trash-item-content hover1">
        <img
          className="trash-item-content-image"
          src={images && images.length ? images[0].url : user.picture}
          alt=""
        />
        <div className="trash-item-content-infos">
          <p className="trash-item-content-info-username">
            <b>{`${user.last_name} ${user.first_name}`}</b> đã chia sẻ một{" "}
            <b>bài viết</b>
          </p>
          <p className="trash-item-content-info-text">{text}</p>
          <div className="trash-item-content-info-icon">
            <div className="left">
              <i className="trash_icon"></i>
              <Moment fromNow interval={30}>
                {deleteAt}
              </Moment>
            </div>{" "}
            <div className="right">
              <Moment format="LT">{deleteAt}</Moment>
            </div>
          </div>
        </div>
      </div>
      <div
        className="trash-item-menu hover1 "
        onClick={() => setShowTrashItemMenu((prev) => !prev)}
      >
        <Dots />
      </div>
      {isShowTrashItemMenu && (
        <TrashItemMenu setShowTrashItemMenu={setShowTrashItemMenu} />
      )}
    </div>
  );
};

export default TrashItem;

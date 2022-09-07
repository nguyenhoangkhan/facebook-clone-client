import { Dots } from "../../../../../../assets/svg";

const TrashItem = ({ post, user }) => {
  return (
    <div className="trash-item-wrapper ">
      <div className="trash-item-checkbox hover1">
        <input type="checkbox" />
      </div>
      <div className="trash-item-content hover1">
        <img
          className="trash-item-content-image"
          src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg"
          alt=""
        />
        <div className="trash-item-content-infos">
          <p className="trash-item-content-info-username">
            <b>{`${user.last_name} ${user.first_name}`}</b> đã chia sẻ một{" "}
            <b>bài viết</b>
          </p>
          <p className="trash-item-content-info-text">hẹn</p>
          <div className="trash-item-content-info-icon">
            <div className="left">
              <i className="trash_icon"></i>
              Còn 11 ngày
            </div>{" "}
            <div className="right">15:44</div>
          </div>
        </div>
      </div>
      <div className="trash-item-menu hover1">
        <Dots />
      </div>
    </div>
  );
};

export default TrashItem;

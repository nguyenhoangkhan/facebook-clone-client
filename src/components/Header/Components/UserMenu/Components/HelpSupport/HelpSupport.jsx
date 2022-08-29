const HelpSupport = ({ setVisible }) => {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Trợ giúp & Hỗ trợ
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="help_center_icon"></i>
        </div>
        <span>Trung tâm trợ giúp</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="email_icon"></i>
        </div>
        <span>Hộp thư hỗ trợ</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="info_filled_icon"></i>
        </div>
        <span>Báo cáo sự cố</span>
      </div>
    </div>
  );
};
export default HelpSupport;

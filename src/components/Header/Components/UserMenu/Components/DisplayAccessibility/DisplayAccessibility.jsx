const DisplayAccessibility = ({ setVisible }) => {
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
        Màn hình & Trợ năng
      </div>
      <div className="menu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className="menu_col">
          <span className="menu_span1">Chế độ tối</span>
          <span className="menu_span2">
            Điều chỉnh giao diện của Facebook để giảm độ chói và cho đôi mắt
            được nghỉ ngơi.
          </span>
        </div>
      </div>
      <label htmlFor="darkOff" className="hover1">
        <span>Tắt</span>
        <input type="radio" name="dark" id="darkOff" />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>Bật</span>
        <input type="radio" name="dark" id="darkOn" />
      </label>
      <div className="menu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className="menu_col">
          <span className="menu_span1">Chế độ Thu gọn</span>
          <span className="menu_span2">
            Làm giảm kích thước phông chữ để có thêm nội dung vừa với màn hình.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Tắt</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>Bật</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>
      <div className="menu_item hover3">
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Bàn phím</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
};
export default DisplayAccessibility;

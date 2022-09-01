import { Link } from "react-router-dom";

export default function SendEmail({ user, setVisible }) {
  const handleSendMail = () => {
    setVisible(2);
  };

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Tạo mới mật khẩu</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            Bạn muốn nhận mã xác nhận bằng cách nào ?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Gửi mã thông qua mail</span>
              <span>email@email.email</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={user?.picture} alt="" />
          <span>email@email.email</span>
          <span>Người dùng Facebook</span>
        </div>
      </div>
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Không phải bạn ?
        </Link>
        <button type="submit" className="blue_btn" onClick={handleSendMail}>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

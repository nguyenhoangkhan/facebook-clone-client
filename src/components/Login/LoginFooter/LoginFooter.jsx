import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <Link to="/">Tiếng Việt</Link>
        <Link to="/">English(UK)</Link>
        <Link to="/">Français(FR)</Link>
        <Link to="/">العربية</Link>
        <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
        <Link to="/">Español (España)</Link>
        <Link to="/">italiano</Link>
        <Link to="/">Deutsch</Link>
        <Link to="/">Português (Brasil)</Link>
        <Link to="/">हिन्दी</Link>
        <Link to="/">中文(简体)</Link>
        <Link to="/">日本語</Link>
        <Link to="/" className="footer_square">
          <i className="plus_icon"></i>
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        <Link to="/">Đăng ký</Link>
        <Link to="/">Đăng nhập</Link>
        <Link to="/">Messenger</Link>
        <Link to="/">Facebook Lite</Link>
        <Link to="/">Watch</Link>
        <Link to="/">Địa điểm</Link>
        <Link to="/">Trò chơi</Link>
        <Link to="/">Marketplace</Link>
        <Link to="/">Facebook Pay</Link>
        <Link to="/">Oculus</Link>
        <Link to="/">Portal</Link>
        <Link to="/">Instagram</Link>
        <Link to="/">Bulletin</Link>
        <Link to="/">Địa phương</Link>
        <Link to="/">Chiến dịch gây quỹ</Link>
        <Link to="/">Dịch vụ</Link>
        <Link to="/">Trung tâm thông tin bỏ phiếu</Link>
        <Link to="/">Nhóm</Link>
        <Link to="/">Giới thiệu</Link>
        <Link to="/">Tạo quảng cáo</Link>
        <Link to="/">Tạo trang</Link>
        <Link to="/">Nhà phát triển</Link>
        <Link to="/">Tuyển dụng</Link>
        <Link to="/">Quyền riêng tư</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">
          Lựa chọn quảng cáo
          <i className="adChoices_icon"></i>
        </Link>
        <Link to="/">Điều khoản</Link>
        <Link to="/">Trợ giúp</Link>
        <Link to="/">
          Tải thông tin liên hệ lên & đối tượng không phải người dùng
        </Link>
      </div>
      <div className="login_footer_wrap">
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta © 2022
        </Link>
      </div>
    </footer>
  );
};

export default LoginFooter;

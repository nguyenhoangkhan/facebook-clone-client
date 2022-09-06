import axios from "axios";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

export default function SendEmail({
  setVisible,
  userInfosResult,
  setLoading,
  loading,
  setError,
  email,
}) {
  const handleSendMail = async () => {
    const serverURL = process.env.REACT_APP_BACKEND_URL;
    try {
      setLoading(true);
      await axios.post(serverURL + "/password/sendCodeResetPassword", {
        email,
      });
      setError("");
      setLoading(false);
      setVisible(2);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
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
              <span>{userInfosResult.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfosResult.picture} alt="" />
          <span>{userInfosResult.email}</span>
          <span>Người dùng Facebook</span>
        </div>
      </div>
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Không phải bạn ?
        </Link>
        <button
          type="submit"
          className={`blue_btn reset-password ${loading && "loading"}`}
          onClick={handleSendMail}
        >
          {loading ? <PulseLoader size={5} color="white" /> : "Tiếp tục"}
        </button>
      </div>
    </div>
  );
}

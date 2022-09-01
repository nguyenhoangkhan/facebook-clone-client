import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import PulseLoader from "react-spinners/PulseLoader";

import * as actions from "../../../redux/actions";
import LoginInput from "../../Inputs/LoginInput";

const LoginForm = ({ setShowRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginInfos = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const [errorLogin, setErrorLogin] = useState("");
  const [successLogin, setSuccessLogin] = useState("");
  const [loading, setLoading] = useState(false);

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Bạn cần nhập Email.")
      .email("Email bạn nhập không hợp lệ, vui lòng thử lại")
      .max(100),
    password: Yup.string().required("Bạn cần nhập mật khẩu"),
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLoginSubmit = async () => {
    try {
      const serverURL = process.env.REACT_APP_BACKEND_URL;
      setLoading(true);

      const { data } = await axios.post(serverURL + "/login", {
        email,
        password,
      });

      setErrorLogin("");
      setSuccessLogin(data.message);

      const { message, ...rest } = data;
      dispatch(actions.LOGIN(rest));
      Cookies.set("user", JSON.stringify(rest));
      navigate("/");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setSuccessLogin("");
      setErrorLogin(err.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của
          bạn.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          {errorLogin && <div className="error-text">{errorLogin}</div>}
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => handleLoginSubmit}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email hoặc số điện thoại"
                  onChange={(e) => handleLoginChange(e)}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => handleLoginChange(e)}
                />
                <button
                  type="submit"
                  className={`blue_btn login-btn ${loading && "loading"}`}
                  onClick={handleLoginSubmit}
                >
                  {loading ? (
                    <span>
                      <PulseLoader size={10} color="white" />
                    </span>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Quên mật khẩu ?
          </Link>
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup "
            onClick={() => setShowRegister(true)}
          >
            Tạo tài khoản mới
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Tạo Trang </b>
          dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

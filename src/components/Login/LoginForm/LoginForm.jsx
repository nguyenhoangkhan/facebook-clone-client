import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";

import LoginInput from "../../../components/Inputs/loginInput";

const LoginForm = () => {
  const loginInfos = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required(
        "Email hoặc số di động bạn nhập không kết nối với tài khoản nào."
      )
      .email("Email bạn nhập không hợp lệ, vui lòng thử lại")
      .max(100),
    password: Yup.string().required("Bạn cần nhập mật khẩu"),
  });

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
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
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
                <button type="submit" className="blue_btn">
                  Đăng nhập
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Quên mật khẩu ?
          </Link>
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signup">Tạo tài khoản mới</button>
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

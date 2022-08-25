import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Tippy from "@tippyjs/react/headless";

import RegisterInput from "../../../components/Inputs/registerInput";

const RegisterForm = () => {
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: "",
    bMonth: "",
    bDay: "",
    gender: "",
  };

  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validationRegister = Yup.object({
    first_name: Yup.string().required("Tên bạn là gì ?"),
    last_name: Yup.string().required("Tên bạn là gì ?"),
    email: Yup.string()
      .required(
        "Bạn sẽ sử dụng thông tin này khi đăng nhập và khi cần đặt lại mật khẩu"
      )
      .matches(
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/,
        "Email không hợp lệ, vui lòng đặt lại"
      ),
    password: Yup.string()
      .required(
        "Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và dấu chấm câu ( như ! và & )"
      )
      .min(
        6,
        "Nhập mật khẩu có tối thiểu 6 ký tự bao gồm số, chữ cái và dấu chấm câu ( như ! và & )"
      ),
  });

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Đăng ký</span>
          <span>Nhanh chóng và dễ dàng.</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={validationRegister}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Tên"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Họ"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Số di động hoặc email"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="Mật khẩu mới"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Ngày sinh{" "}
                  <Tippy
                    placement="bottom"
                    delay={[500, 0]}
                    offset={[130, 10]}
                    render={(attrs) => (
                      <div
                        className="box box-more_register"
                        tabIndex="-1"
                        {...attrs}
                      >
                        Nhấp chuột để biết thêm thông tin
                      </div>
                    )}
                  >
                    <i className="info_icon"></i>
                  </Tippy>
                </div>
                <div className="reg_grid">
                  <select name="bDay">
                    <option>15</option>
                  </select>
                  <select name="bMonth">
                    <option>15</option>
                  </select>
                  <select name="bYear">
                    <option>15</option>
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Giới tính{" "}
                  <Tippy
                    placement="bottom"
                    render={(attrs) => (
                      <div
                        className="box box-more_register"
                        tabIndex="-1"
                        {...attrs}
                      >
                        Nhấp chuột để biết thêm thông tin
                      </div>
                    )}
                  >
                    <i className="info_icon"></i>
                  </Tippy>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Nam
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Nữ
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Tùy chỉnh
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
              </div>
              <div className="reg_infos">
                Người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ
                của bạn lên Facebook. <span>Tìm hiểu thêm.</span>
              </div>
              <div className="reg_infos">
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với
                <span> Điều khoản, Chính sách quyền riêng tư &nbsp;</span>
                và <span>Chính sách cookie</span> của chúng tối. Bạn có thể nhận
                được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Đăng ký</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default RegisterForm;

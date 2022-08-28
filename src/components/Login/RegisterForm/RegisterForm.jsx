import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Tippy from "@tippyjs/react/headless";
import { useMediaQuery } from "react-responsive";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import * as actions from "../../../redux/actions";
import RegisterInput from "../../../components/Inputs/registerInput";
import DateOfBirthSelect from "../DateOfBirthSelect";
import GenderSelect from "../GenderSelect";

const RegisterForm = ({ setShowRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });

  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth(),
    bDay: new Date().getDate(),
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

  const [errorBirthDay, setErrorBirthDay] = useState("");
  const [errorGender, setErrorGender] = useState("");

  const [errorRegister, setErrorRegister] = useState("");
  const [successRegister, setSuccessRegister] = useState("");
  const [loading, setLoading] = useState(false);

  const validationRegister = Yup.object({
    first_name: Yup.string()
      .required("Tên bạn là gì ?")
      .matches(/^[aA-zZ]+$/, "Tên chứa kí tự không hợp lệ"),
    last_name: Yup.string()
      .required("Tên bạn là gì ?")
      .matches(/^[aA-zZ]+$/, "Họ chứa kí tự không hợp lệ"),
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

  const registerSubmit = async () => {
    try {
      const serverURL = process.env.REACT_APP_BACKEND_URL;
      setLoading(true);

      const { data } = await axios.post(serverURL + "/register", {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      });

      setErrorRegister("");
      setSuccessRegister(data.message);

      setTimeout(() => {
        const { message, ...rest } = data;

        dispatch(actions.LOGIN(rest));
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
        setLoading(false);
      }, 2000);
    } catch (err) {
      setSuccessRegister("");
      setErrorRegister(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setShowRegister(false)}></i>
          <span>Đăng ký</span>
          <span>Nhanh chóng và dễ dàng.</span>
        </div>
        {errorRegister && <div className="error-text">{errorRegister}</div>}
        {successRegister && (
          <div className="success-text">{successRegister}</div>
        )}
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
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            const least14yearsold = new Date(1970 + 14, 0, 1);
            const moreThan70yearsold = new Date(1970 + 70, 0, 1);

            if (current_date - picked_date < least14yearsold) {
              setErrorBirthDay(
                "Hình như bạn nhập sai thông tin, hãy nhớ dùng ngày sinh thật của mình nhé"
              );
            } else if (current_date - picked_date > moreThan70yearsold) {
              setErrorBirthDay(
                "Hình như bạn nhập sai thông tin, hãy nhớ dùng ngày sinh thật của mình nhé"
              );
            } else {
              setErrorBirthDay("");
            }

            if (gender === "") {
              setErrorGender(
                "Vui lòng chọn giới tính. Bạn có thể chọn người có thể xem nội dung này sau"
              );
            } else {
              setErrorGender("");
            }
            registerSubmit();
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className={desktopView ? "reg_line_desktop" : "reg_line"}>
                <RegisterInput
                  type="text"
                  placeholder="Tên"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  right
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
                <DateOfBirthSelect
                  user={user}
                  handleRegisterChange={handleRegisterChange}
                  errorBirthDay={errorBirthDay}
                />
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
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  errorGender={errorGender}
                />
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
                <button type="submit" className="blue_btn open_signup">
                  Đăng ký
                </button>
                {loading && (
                  <div className="loading-register">
                    <PulseLoader size={6} color="#42b72a" />
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default RegisterForm;

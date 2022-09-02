import axios from "axios";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";

import LoginInput from "../../../../components/Inputs/LoginInput";

const ChangePassword = ({
  password,
  setPassword,
  conf_password,
  setConf_password,
  loading,
  setLoading,
  setError,
  email,
  error,
}) => {
  const [isShow, setShow] = useState(false);

  const validatePassword = Yup.object({
    password: Yup.string()
      .required("Hãy nhập mật khẩu mới.")
      .min(6, "Mật khẩu phải chứa ít nhât 6 kí tự.")
      .max(36, "Mật khẩu không thể nhiều hơn 36 kí tự"),
    conf_password: Yup.string()
      .required("Xác nhận mật khẩu.")
      .oneOf([Yup.ref("password")], "Mật khẩu phải trùng khớp."),
  });

  const handleChangePassword = async () => {
    try {
      const serverURL = process.env.REACT_APP_BACKEND_URL;
      setLoading(true);
      await axios.post(serverURL + "/password/changepassword", {
        email,
        password,
      });
      setLoading(false);
      setShow(true);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="reset_form change_password">
      <div className="reset_form_header">Đổi mật khẩu</div>
      <div className="reset_form_text">Chọn mật khẩu đủ mạnh</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={validatePassword}
        onSubmit={() => handleChangePassword()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu mới"
            />
            <LoginInput
              type="password"
              name="conf_password"
              onChange={(e) => setConf_password(e.target.value)}
              placeholder="Xác nhận mật khẩu mới"
              bottom
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Hủy
              </Link>
              <button type="submit" className="blue_btn">
                Tiếp tục
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal
        className="change-password-modal"
        open={isShow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="change-password-box">
          <Typography
            id="modal-modal-title"
            variant="h3"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Bạn đã thay đổi mật khẩu thành công
          </Typography>
          <Link to="/login">Đi đến đăng nhập</Link>
        </Box>
      </Modal>
    </div>
  );
};

export default ChangePassword;

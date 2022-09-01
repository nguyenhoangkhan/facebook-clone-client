import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import LoginInput from "../../../../components/Inputs/LoginInput";

export default function CodeVerification({ code, setCode, error, setVisible }) {
  const handleCodeVerification = () => {
    setVisible(3);
  };

  return (
    <div className="reset_form code_verification">
      <div className="reset_form_header">Mã xác nhận</div>
      <div className="reset_form_text">
        Vui lòng nhập mã xác nhận được gửi trong Email của bạn.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Mã xác nhận"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Hủy
              </Link>
              <button
                type="submit"
                className="blue_btn"
                onClick={handleCodeVerification}
              >
                Tiếp tục
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import PulseLoader from "react-spinners/PulseLoader";

import LoginInput from "../../../../components/Inputs/LoginInput";
import axios from "axios";

export default function CodeVerification({
  code,
  email,
  setCode,
  error,
  setVisible,
  loading,
  setLoading,
  setError,
}) {
  const handleCodeVerification = async () => {
    try {
      const serverURL = process.env.REACT_APP_BACKEND_URL;

      await axios.post(serverURL + "/password/verifiedCodeResetPassword", {
        email,
        code,
      });

      setLoading(true);
      setVisible(3);
      setError("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  const validateCodeResetPassword = Yup.object({
    code: Yup.string().required("Bạn cần nhập mã xác nhận."),
  });

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
        validationSchema={validateCodeResetPassword}
        onSubmit={() => handleCodeVerification()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              error={error}
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Mã xác nhận"
            />
            <div className="error_input_message search-account">{error}</div>
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Hủy
              </Link>
              <button
                type="submit"
                className={`blue_btn reset-password ${loading && "loading"}`}
              >
                {loading ? <PulseLoader color="white" size={5} /> : "Tiếp tục"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

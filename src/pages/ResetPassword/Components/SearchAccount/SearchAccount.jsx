import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

import LoginInput from "../../../../components/Inputs/LoginInput";

const SearchAccount = ({
  email,
  setEmail,
  setError,
  error,
  loading,
  setLoading,
  setVisible,
  setuserInfosResult,
}) => {
  const handleSearchAccount = async () => {
    try {
      setLoading(true);
      const serverURL = process.env.REACT_APP_BACKEND_URL;
      const { data } = await axios.post(serverURL + "/password/findUser", {
        email,
      });
      setuserInfosResult(data);
      setError("");
      setLoading(false);
      setVisible(1);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message);
    }
  };
  return (
    <div className="reset_form search_account">
      <div className="reset_form_header">Tìm kiếm tài khoản của bạn</div>
      <div className="reset_form_text">
        Vui lòng nhập Email hoặc số di động để tìm tài khoản của bạn.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              error={error}
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập Email hoặc số di động"
            />
            {error && (
              <div className="error_input_message search-account">{error}</div>
            )}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Hủy
              </Link>
              <button
                type="submit"
                className={`blue_btn reset-password ${
                  loading ? "loading" : ""
                }`}
                onClick={handleSearchAccount}
              >
                {loading ? <PulseLoader color="white" size={5} /> : "Tìm kiếm"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAccount;

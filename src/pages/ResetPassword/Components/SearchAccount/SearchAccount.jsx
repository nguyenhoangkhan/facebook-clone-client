import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

import LoginInput from "../../../../components/Inputs/LoginInput";

const SearchAccount = ({ email, setEmail, error, setVisible }) => {
  const handleSearchAccount = () => {
    setVisible(1);
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
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập Email hoặc số di động"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Hủy
              </Link>
              <button
                type="submit"
                className="blue_btn"
                onClick={handleSearchAccount}
              >
                Tìm kiếm
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAccount;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import * as actions from "../../redux/actions";
import * as selectors from "../../redux/selectors";
import {
  ChangePassword,
  CodeVerification,
  SearchAccount,
  SendEmail,
} from "./Components";
import LoginFooter from "../../components/Login/LoginFooter";

const ResetPassword = () => {
  const { user } = useSelector(selectors.user);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [userInfosResult, setuserInfosResult] = useState({});

  const logout = () => {
    Cookies.remove("user");
    dispatch(actions.LOGOUT());
  };
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                logout();
              }}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Đăng nhập</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisible={setVisible}
            setuserInfosResult={setuserInfosResult}
          />
        )}
        {visible === 1 && (
          <SendEmail
            user={user}
            email={email}
            userInfosResult={userInfosResult}
            setVisible={setVisible}
            setLoading={setLoading}
            setError={setError}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            email={email}
            user={user}
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            email={email}
            password={password}
            setError={setError}
            setLoading={setLoading}
            setPassword={setPassword}
            loading={loading}
            conf_password={conf_password}
            setConf_password={setConf_password}
            error={error}
          />
        )}
      </div>
      <LoginFooter />
    </div>
  );
};
export default ResetPassword;

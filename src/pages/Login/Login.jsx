import { useState } from "react";

import LoginFooter from "../../components/Login/LoginFooter/LoginFooter";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Login/RegisterForm";

function Login() {
  const [isShowRegister, setShowRegister] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setShowRegister={setShowRegister} />
        {isShowRegister && (
          <RegisterForm
            isShowRegister={isShowRegister}
            setShowRegister={setShowRegister}
          />
        )}

        <LoginFooter />
      </div>
    </div>
  );
}

export default Login;

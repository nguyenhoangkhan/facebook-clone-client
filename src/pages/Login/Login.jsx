import LoginFooter from "../../components/Login/LoginFooter/LoginFooter";

import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Login/RegisterForm";

function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <div className="register">
          <RegisterForm />
        </div>
        <LoginFooter />
      </div>
    </div>
  );
}

export default Login;

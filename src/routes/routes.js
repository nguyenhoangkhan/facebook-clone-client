import { useSelector as selector } from "react-redux";
import { Outlet, useNavigate as navigate } from "react-router-dom";

import Login from "../pages/Login";
import * as selectors from "../redux/selectors";

const user = () => {
  const { user } = selector(selectors.user);
  return user;
};

export const LogginedRoutes = () => {
  return user() ? <Outlet /> : <Login />;
};

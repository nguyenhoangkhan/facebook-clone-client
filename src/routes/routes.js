import { useSelector as selector } from "react-redux";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";

import Login from "../pages/Login";
import * as selectors from "../redux/selectors";

const user = () => {
  const { user } = selector(selectors.user);
  return user;
};

export const LogginedRoutes = () => {
  return !user() ? <Login /> : <Outlet />;
};
export const notLogginedRoutes = () => {
  return user() ? <Home /> : <Outlet />;
};

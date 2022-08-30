import { useSelector as selector } from "react-redux";
import { Outlet } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import * as selectors from "../redux/selectors";

const user = () => {
  const { user } = selector(selectors.user);
  return user;
};

export const LogginedRoutes = () => {
  return user() ? <Outlet /> : <Login />;
};

export const notLoggedInRoutes = () => {
  return user() ? <Home /> : <Outlet />;
};

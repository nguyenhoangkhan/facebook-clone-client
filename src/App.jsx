import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bin from "./pages/Bin";
import {
  notLogginedRoutes as NotLogginedRoutes,
  LogginedRoutes,
} from "./routes";
import BookMarks from "./pages/BookMarks";
import ResetPassword from "./pages/ResetPassword";
import * as actions from "./redux/actions";
import * as selectors from "./redux/selectors";
import { Friends } from "./pages/Friends";

function App() {
  const user = useSelector(selectors.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        dispatch(actions.POST_REQUEST());
        const serverURL = process.env.REACT_APP_BACKEND_URL;
        const { data } = await axios.get(serverURL + "/post/getAllPosts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch(actions.POST_SUCCESS(data));
      } catch (err) {
        dispatch(actions.POST_ERROR(err?.response?.data?.message));
      }
    };
    getAllPosts();
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route element={<LogginedRoutes />}>
          <Route path="/:username" element={<Profile />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/friends" element={<Friends />}>
            <Route path="list" element={<Friends />} />
            <Route path="request" element={<Friends />} />
            <Route path="sent" element={<Friends />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NotLogginedRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/forgot" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;

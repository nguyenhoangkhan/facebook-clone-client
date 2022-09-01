import { Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  notLogginedRoutes as NotLogginedRoutes,
  LogginedRoutes,
} from "./routes";
import BookMarks from "./pages/BookMarks";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LogginedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<BookMarks />} />
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

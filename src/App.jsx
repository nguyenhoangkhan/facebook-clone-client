import { Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  notLogginedRoutes as NotLogginedRoutes,
  LogginedRoutes,
} from "./routes";
import BookMarks from "./pages/BookMarks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<NotLogginedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<LogginedRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

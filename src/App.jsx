import { Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { LogginedRoutes } from "./routes";
import BookMarks from "./pages/BookMarks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<LogginedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

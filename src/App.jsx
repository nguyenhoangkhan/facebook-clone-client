import { Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { LogginedRoutes, notLoggedInRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LogginedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<notLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

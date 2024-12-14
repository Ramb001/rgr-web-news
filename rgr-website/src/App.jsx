import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

function App() {
  const authToken = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        {!authToken ? (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/feed" />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

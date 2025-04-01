import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

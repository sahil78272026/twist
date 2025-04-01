import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      // Synchronously clear the token before making the API call
      localStorage.removeItem("token");

      // Make API call to backend logout endpoint
      await axios.post("http://127.0.0.1:8000/api/logout/", {}, {
        headers: { Authorization: `Token ${token}` }
      });

      // Ensure no leftover async operations before navigating
      setTimeout(() => {
        navigate("/login");
      }, 0);

    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;

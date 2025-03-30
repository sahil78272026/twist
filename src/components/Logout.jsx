import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        }
      })
        .then((response) => {
          if (response.ok) {
            localStorage.removeItem("token");  // ✅ Remove token from storage
            navigate("/login");                // ✅ Redirect to login
          } else {
            console.error("Logout failed");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      navigate("/login");  // Redirect to login if no token
    }
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;

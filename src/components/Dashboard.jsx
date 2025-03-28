import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);      // State for API data
  const [error, setError] = useState(null);    // State for errors
  const navigate = useNavigate();              // React Router navigation

  useEffect(() => {
    const token = localStorage.getItem("token");   // Retrieve the token

    if (!token) {
      navigate("/login");                         // Redirect to login if no token
      return;
    }

    // Fetch API
    fetch("http://127.0.0.1:8000/api/dashboard/", {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,          // ✅ Correct token format
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unauthorized");          // Handle unauthorized access
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setData(data);                             // Store API data in state
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch data.");          // Store error in state
        navigate("/login");                        // Redirect if unauthorized
      });

  }, [navigate]);   // Dependency array ensures API call runs only once on render

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data ? (
        <div>
          <h2>Welcome!</h2>
          <p>{data.message}</p>                   {/* Display API data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;

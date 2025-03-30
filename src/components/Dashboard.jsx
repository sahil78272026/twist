import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/api/dashboard/", {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch data.");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data ? (
        <div>
          <h2>Welcome!</h2>
          <p>{data.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Logout button */}
      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </div>
  );
}

export default Dashboard;

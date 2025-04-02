import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ProfileImageUpload from "./ProfileImageUpload";
import SearchProfiles from "./SearchProfiles";

function Dashboard() {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");   // Redirect to login if no token
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/profile_image/", {
          headers: { Authorization: `Token ${token}` }
        });

        setProfile(res.data);   // Set the profile data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch profiles from backend
    axios.get("http://127.0.0.1:8000/api/profiles/", {
      headers: { Authorization: `Token ${token}` }
    })
      .then((res) => setProfiles(res.data))
      .catch(() => {
        alert("Unauthorized");
        navigate("/login");
      });

    // Fetch dashboard message
    axios.get("http://127.0.0.1:8000/api/dashboard/", {
      headers: { Authorization: `Token ${token}` }
    })
      .then((res) => setMessage(res.data.message))
      .catch(() => {
        alert("Unauthorized");
        navigate("/login");
      });

  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div style={{ padding: "20px" }}>
      <h2>{message}</h2>

      <h3>Other User Profiles:</h3>
      {profiles.length > 0 ? (
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              <strong>{profile.username}</strong> - {profile.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No other profiles found.</p>
      )}

      {/* Button to update profile */}
      <button onClick={() => navigate("/update-profile")}>
        Update Profile
      </button>

      {/* Logout button */}
      <Link to="/logout">
        <button>Logout</button>
      </Link>


      <ProfileImageUpload />

      <div>
        <h1>Welcome, {profile.username}!</h1>
        <p>Email: {profile.email}</p>

        {profile.profile_image ? (
          <img
            src={profile.profile_image}
            alt="Profile"
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
        ) : (
          <p>No profile image available</p>
        )}
      </div>

      <div><h1>Welcome to the Dating App</h1>
        <SearchProfiles /></div>
    </div>
  );
}

export default Dashboard;

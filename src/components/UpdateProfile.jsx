import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://127.0.0.1:8000/api/user-profile/", {
      headers: { Authorization: `Token ${token}` }
    })
    .then((res) => {
      console.log(res.data.username)
      console.log(res.data.email)
      setUsername(res.data.username);
      setEmail(res.data.email);
    })
    .catch((error) => {
      console.error(error.response? error.response.data:error.message)
      alert("Failed to fetch profile data.");
      navigate("/dashboard");
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put("http://127.0.0.1:8000/api/user-profile/", {
        username,
        email
      }, {
        headers: { Authorization: `Token ${token}` }
      });

      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UpdateProfile;

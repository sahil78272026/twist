import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    mobile_number: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Running useEffect in Profile.jsx", token)

    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch the existing profile data
    axios.get("http://127.0.0.1:8000/api/profile/", {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      setProfile(res.data);
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
    });

  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/profile/",
        profile,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      alert("Profile updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={profile.age || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={profile.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobile_number"
            value={profile.mobile_number || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;

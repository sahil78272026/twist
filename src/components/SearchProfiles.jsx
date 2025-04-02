import { useState } from "react";
import axios from "axios";

function SearchProfiles() {
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [location, setLocation] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleSearch = () => {
    const token = localStorage.getItem("token");
    axios.get(`http://127.0.0.1:8000/api/search-profiles/`, {
      params: { min_age: minAge, max_age: maxAge, location: location },
      headers: { Authorization: `Token ${token}` }
    })
    .then((res) => setProfiles(res.data))
    .catch((err) => console.error("Error fetching profiles:", err));
  };

  return (
    <div>
      <h2>Search Profiles</h2>
      <label>Min Age:</label>
      <input type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)} />

      <label>Max Age:</label>
      <input type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />

      <label>Location:</label>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

      <button onClick={handleSearch}>Search</button>

      <h3>Results:</h3>
      {profiles.length === 0 ? <p>No users found</p> : (
        profiles.map((profile) => (
          <div key={profile.id}>
            <p><strong>{profile.username}</strong>, {profile.age} years old</p>
            <p>Location: {profile.location}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchProfiles;

import React, { useState } from "react";
import axios from "axios";

function ProfileImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));  // Create image preview
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("profile_image", image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload-image/",
        formData,
        {
          headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Image uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <h2>Upload Profile Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: "200px", height: "200px", marginTop: "10px" }} />}
      <br />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default ProfileImageUpload;

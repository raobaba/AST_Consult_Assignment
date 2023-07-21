import React, { useState } from "react";
import "../Style/SignUp.css";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePic: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.profilePic
    ) {
      alert("Please fill in all fields");
    } else {
      // Process the form data, e.g., send it to the server
      // Here you can make an API call to handle user registration
      console.log(formData);
      // Reset the form data after submission
      setFormData({
        name: "",
        email: "",
        password: "",
        profilePic: null,
      });
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture:</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p  className="redirection">
        Already have an Account,{" "}
        <Link to="/login">
          <b>LogIn here</b>
        </Link>
      </p>
    </div>
  );
}

import React, { useState } from "react";
import "../Style/Login.css";
import { Link } from "react-router-dom";
export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all fields");
    } else {
      // Process the form data, e.g., send it to the server
      // Here you can make an API call to handle user login
      console.log(formData);
      // Reset the form data after submission
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="redirection">
        Don't have an Account,{" "}
        <Link to="/signup">
          <b>Create New Account</b>
        </Link>
      </p>
    </div>
  );
}

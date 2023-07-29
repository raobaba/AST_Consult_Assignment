import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link} from "react-router-dom";

import "../Style/Login.css";

export default function LogIn() {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      setShowPasswordAlert(true);
    }
    if (
      name === "password" &&
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
    ) {
      setShowPasswordAlert(false);
    }
  };

  const handleSuccess = () => {
    toast.success("Login successful!");
    window.location.href = '/'
  };

  const handleError = (error) => {
    toast.error("Error during login");
    console.error("Error during login:", error);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
      alert(
        "Invalid password. Password must be 8 characters with at least one number, one uppercase letter, and one lowercase letter."
      );
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else {
      axios
        .post("https://cute-bass-life-jacket.cyclic.app/login", formData)
        .then((response) => {
          handleSuccess();
          console.log("Login successful!", response.data.id);
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("userName",response.data.name)
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
          });
        })
        .catch((error) => {
          handleError(error);
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
          {showPasswordAlert && (
            <div className="password-validation-alert">
              Password must be 8 characters with at least one number, one uppercase letter, and one lowercase letter.
            </div>
          )}
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
      <ToastContainer className="custom-toast-container" position="top-center" />
      <p className="redirection">
        Don't have an Account,{" "}
        <Link to="/signup">
          <b>Create New Account</b>
        </Link>
      </p>
    </div>
  );
}

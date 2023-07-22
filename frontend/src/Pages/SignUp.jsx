import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../Style/SignUp.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSuccess = () => {
    toast.success("Registration successful!");
  };

  const handleError = (error) => {
    toast.error("Error during registration");
    console.error("Error during registration:", error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, image } = formData;
    if (!name || !email || !password || !image) {
      alert("Please fill in all fields");
    } else {
      // Create form data to send files
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("image", image);

      // Make the POST request using Axios
      axios
        .post("http://localhost:8000/signup", formDataToSend)
        .then((response) => {
          handleSuccess();
          console.log("Registration successful!", response.data);

          // Reset the form data after successful submission
          setFormData({
            name: "",
            email: "",
            password: "",
            image: null,
          });
        })
        .catch((error) => {
          handleError(error);
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
          {showPasswordAlert && (
            <div className="password-validation-alert">
              Password must be 8 characters with at least one number, one uppercase letter, and one lowercase letter.
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Profile Picture:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer className="custom-toast-container" position="top-center"/>
      <p className="redirection">
        Already have an Account,{" "}
        <Link to="/login">
          <b>LogIn here</b>
        </Link>
      </p>
    </div>
  );
}

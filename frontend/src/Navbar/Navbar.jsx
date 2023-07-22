import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showAdmin, setShowAdmin] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);
  const [ProfilePic, setProfilePic] = useState(null); // Updated to null as a single data object

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      // Fetch user data based on the stored userId
      axios.get(`http://localhost:8000/get/${userId}`)
        .then(response => {
          setProfilePic(response.data); // Response should be a single data object
        })
        .catch(error => {
          console.error('Error fetching profile picture:', error);
        });
    }
  }, [userId]);

  console.log("User Name:", ProfilePic && ProfilePic.name); // Make sure to check for null or undefined before accessing the property

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSectionClick = (sectionName) => {
    if (sectionName === "signup") {
      handleLogout();
    } else {
      setActiveSection(sectionName);
      setMenuOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProfileIconClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Do something with the selected file (e.g., upload it or process it)
    console.log("Selected file:", selectedFile);
  };

  const handleLogout = () => {
    // Remove the userId from localStorage upon logout
    localStorage.removeItem('userId');
    // Reset the profile picture state
    setProfilePic(null);
  };

  const imageIcon =
    "https://i.pinimg.com/originals/10/6b/44/106b445f6475263fd7433367da27dbb0.png";
  const sections = [
    { name: "gallery", link: "/", label: "Gallery" },
    { name: "add-image", link: "/add-image", label: "Create Image" },
    { name: "login", link: "/login", label: ProfilePic ? ProfilePic.name : "Log In" }, // Show name if ProfilePic is available
    { name: "signup", link: "/signup", label: ProfilePic ? "Log Out" : "Sign Up" }, // Show "Log Out" if ProfilePic is available
    { name: "admin", link: "/admin", label: "Admin", hidden: showAdmin },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__icon" onClick={() => handleSectionClick("")} >
          <img src={imageIcon} alt="icon" width={60} />
        </Link>
      </div>
      <div className="navbar__search">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="search-input"
        />
      </div>
      <div className={`navbar__sections ${menuOpen ? "active" : ""}`}>
        {sections.map(
          (section) =>
            !section.hidden && (
              <Link
                key={section.name}
                to={section.link}
                className={activeSection === section.name ? "active" : ""}
                onClick={() => handleSectionClick(section.name)}
              >
                {section.label}
              </Link>
            )
        )}
        <div className="profile-icon" onClick={handleProfileIconClick} title="Change profile picture">
          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
            <img
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6tKFAxceZRcVHubzGHxl0LLnZCKZL7f7sYVWgYzCGQ&s`}
              alt="profile-pic"
              style={{ maxWidth: "100%", height: "auto", borderRadius: '50%' }}
            />
        </div>
      </div>
      <div className="navbar__menuIcon" onClick={handleMenuToggle}>
        <div className={`menuIcon__bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`menuIcon__bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`menuIcon__bar ${menuOpen ? "open" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;

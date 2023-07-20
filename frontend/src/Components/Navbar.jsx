import React, { useState } from "react";
import "./Navbar.css"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <span className="navbar__icon">YourIcon</span>
      </div>
      <div className={`navbar__sections ${menuOpen ? "active" : ""}`}>
        <a href="#gallery">Gallery</a>
        <a href="#add-image">Add Image</a>
        <a href="#signup">SignUp</a>
        <a href="#login">Login</a>
        <a href="#admin">Admin</a>
          <div class="profile-icon"></div>
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

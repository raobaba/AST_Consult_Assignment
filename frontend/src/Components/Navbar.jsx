import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // New state to keep track of active section

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <a href="/" className="navbar__icon">
          <img
            src="https://i.pinimg.com/originals/10/6b/44/106b445f6475263fd7433367da27dbb0.png"
            alt="icon"
            width={70}
          />
        </a>
      </div>
      <div className={`navbar__sections ${menuOpen ? "active" : ""}`}>
        <a
          href="#gallery"
          className={activeSection === "gallery" ? "active" : ""}
          onClick={() => handleSectionClick("gallery")}
        >
          Gallery
        </a>
        <a
          href="#add-image"
          className={activeSection === "add-image" ? "active" : ""}
          onClick={() => handleSectionClick("add-image")}
        >
          Create Image
        </a>
        <a
          href="#login"
          className={activeSection === "login" ? "active" : ""}
          onClick={() => handleSectionClick("login")}
        >
          LogIn
        </a>
        <a
          href="#signup"
          className={activeSection === "signup" ? "active" : ""}
          onClick={() => handleSectionClick("signup")}
        >
          SignUp
        </a>
        <a
          href="#admin"
          className={activeSection === "admin" ? "active" : ""}
          onClick={() => handleSectionClick("admin")}
        >
          Admin
        </a>
        <div className="profile-icon"></div>
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

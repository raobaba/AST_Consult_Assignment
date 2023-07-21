import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showAdmin, setShowAdmin] = useState(true);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    setMenuOpen(false);
  };

  const imageIcon =
    "https://i.pinimg.com/originals/10/6b/44/106b445f6475263fd7433367da27dbb0.png";
  const sections = [
    { name: "gallery", link: "/gallery", label: "Gallery" },
    { name: "add-image", link: "/add-image", label: "Create Image" },
    { name: "login", link: "/login", label: "LogIn" },
    { name: "signup", link: "/signup", label: "SignUp" },
    { name: "admin", link: "/admin", label: "Admin", hidden: showAdmin },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__left">
        {/* Use a button instead of an anchor tag */}
        <Link to="/gallery" className="navbar__icon" onClick={() => handleSectionClick("")}>
          <img src={imageIcon} alt="icon" width={60} />
        </Link>
      </div>
      <div className={`navbar__sections ${menuOpen ? "active" : ""}`}>
        {sections.map((section) =>
          !section.hidden ? (
            <Link
              key={section.name}
              to={section.link}
              className={activeSection === section.name ? "active" : ""}
              onClick={() => handleSectionClick(section.name)}
            >
              {section.label}
            </Link>
          ) : null
        )}
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

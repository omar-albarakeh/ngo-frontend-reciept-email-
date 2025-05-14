import React from "react";
import "./MenueToggel.css";

const MenuToggle = ({ menuOpen, toggleMenu }) => (
  <button
    className="menu-toggle"
    onClick={toggleMenu}
    aria-label={menuOpen ? "Close menu" : "Open menu"}
    aria-expanded={menuOpen}>
    {menuOpen ? "✕" : "☰"}
  </button>
);

export default MenuToggle;

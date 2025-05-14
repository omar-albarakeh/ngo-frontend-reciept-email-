import React, { useState, useEffect } from "react";
import LogoSwitcher from "../LogoSwitcher/Logo";
import NavLinks from "../NavLinks/NavLinks";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import MenuToggle from "../MenueToggel/MenuToggle";
import "./MyNavBar.css";

const MyNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdown = (dropdownName) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  return (
    <header className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <LogoSwitcher />
        <NavLinks
          isMobile={isMobile}
          menuOpen={menuOpen}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          handleDropdown={handleDropdown}
          closeMenu={closeMenu}
        />
        <MenuToggle
          menuOpen={menuOpen}
          toggleMenu={() => setMenuOpen(!menuOpen)}
        />
        <div className="navbar-lang-switcher">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default MyNavbar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

const LogoSwitcher = ({ interval = 3000, className = "" }) => {
  const logos = [
    {
      src: "/images/logo/logo1.webp",
      alt: "Logo 1",
    },
    {
      src: "/images/logo/logo2.webp",
      alt: "Logo 2",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [logos.length, interval]);

  return (
    <Link to="/accueil" className={`logo-switcher ${className}`}>
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className={`switch-logo ${index === currentIndex ? "active" : ""}`}
        />
      ))}
    </Link>
  );
};

export default LogoSwitcher;

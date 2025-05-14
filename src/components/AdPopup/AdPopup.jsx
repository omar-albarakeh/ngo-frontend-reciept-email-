import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdPopup.css";

const AdPopup = ({
  message,
  link,
  useRouter = false,
  delay = 3000,
  topOffset = 120,
}) => {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    if (useRouter) {
      navigate(link);
    } else {
      window.location.href = link;
    }
  };

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`ad-popup ${fadeOut ? "fade-out" : ""}`}
      onClick={handleClick}
      role="button"
      aria-label="Click to navigate"
      style={{ top: `${topOffset}px` }}>
      <div className="ad-popup-text">
        <strong>{message}</strong>
      </div>
      <button
        className="close-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label="Close popup">
        ✖
      </button>
    </div>
  );
};

export default AdPopup;

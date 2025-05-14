import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./customButton.css";

const CustomButton = ({ titleKey, title, to, onClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (to) {
      navigate(to); 
    }
  };

  return (
    <button className="custom-button" onClick={handleClick}>
      {title || t(titleKey || "menu.learnMore")}
    </button>
  );
};

export default CustomButton;

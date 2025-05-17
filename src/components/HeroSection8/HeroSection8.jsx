import React from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection8.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t } = useTranslation("hero6water");
  const navigate = useNavigate();

  return (
    <section className="hero-sectionwater">
      <div className="overlaywater">
        <div className="hero-contentwater">
          <h1 className="hero-titlewater">{t("title")}</h1>
          <p className="hero-descriptionwater">{t("description.part1")}</p>
          <button
            className="hero-buttonwater"
            onClick={() => navigate("/faire-un-don")}>
            {t("button.text")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

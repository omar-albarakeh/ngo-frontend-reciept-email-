import React from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection5.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t } = useTranslation("hero5sosgaza");
  const navigate = useNavigate();
  return (
    <section className="hero-sectionsos">
      <div className="overlaysos">
        <div className="hero-contentsos">
          <h1 className="hero-titlesos">{t("title")}</h1>
          <p className="hero-descriptionsos">{t("description.part1")}</p>
          <button
            className="hero-buttonsos"
            onClick={() => navigate("/faire-un-don")}>
            {t("button.text")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

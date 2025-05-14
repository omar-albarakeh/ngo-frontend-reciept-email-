import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./HeroSection3.css";

const HeroSection = () => {
  const { t } = useTranslation("hero3orphans");
  const navigate = useNavigate();

  return (
    <section className="hero-sectionorphans">
      <div className="overlayorphans">
        <div className="hero-contentorphans">
          <h1 className="hero-titleorphans">{t("title")}</h1>
          <p className="hero-descriptionorphans">{t("description.part1")}</p>
          <button
            className="hero-buttonorphans"
            onClick={() => navigate("/donation")}>
            {t("button.text")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

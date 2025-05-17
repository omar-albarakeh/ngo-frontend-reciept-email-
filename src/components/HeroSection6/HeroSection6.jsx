import React from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection6.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t } = useTranslation("hero4ramadan");
  const navigate = useNavigate();
  return (
    <section className="hero-sectionramadan">
      <div className="overlayramadan">
        <div className="hero-contentramadan">
          <h1 className="hero-titleramadan">{t("title")}</h1>
          <p className="hero-descriptionramadan">{t("description.part1")}</p>
          <button
            className="hero-buttonramadan"
            onClick={() => navigate("/faire-un-don")}>
            {t("button.text")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

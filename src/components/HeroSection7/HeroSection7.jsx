import React from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection7.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { t } = useTranslation("hero7zakat");
  const navigate = useNavigate();
  return (
    <section className="hero-sectionzakat">
      <div className="overlayzakat">
        <div className="hero-contentzakat">
          <h1 className="hero-titlezakat">{t("title")}</h1>
          <p className="hero-descriptionzakat">{t("description.part1")}</p>
          <button
            className="hero-buttonzakat"
            onClick={() => {
              const element = document.getElementById("zakat-calculator");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}>
            {t("button.text")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

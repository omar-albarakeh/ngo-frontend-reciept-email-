import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./HeroSection2.css";

const HeroSection = () => {
  const { t } = useTranslation("hero2adha");
  const navigate = useNavigate();

  return (
    <section className="hero-sectionadha">
      <div className="overlayadha">
        <div className="hero-contentadha">
          <h1 className="hero-titleadha">{t("title")}</h1>
          <p className="hero-descriptionadha">{t("description")}</p>
          <button
            className="hero-buttonadha"
            onClick={() => navigate("/faire-un-don")}>
            {t("button.text")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

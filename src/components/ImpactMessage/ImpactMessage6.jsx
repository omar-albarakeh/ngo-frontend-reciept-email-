import React from "react";
import { useTranslation } from "react-i18next";
import "./ImpactMessage.css";

const ImpactMessage = () => {
  const { t } = useTranslation("impactwater");

  return (
    <section className="impact-card-section">
      <div className="impact-card">
        <div className="impact-card-content">
          <h2 className="impact-card-heading">{t("heading")}</h2>
          <p className="impact-card-text">{t("paragraph1")}</p>
          <div className="impact-card-button-wrapper">
            <a href="/faire-un-don" className="impact-card-btn">
              {t("donateButton")}
            </a>
          </div>
        </div>

        <div className="impact-card-images">
          <img
            src="/images/Water2025/water3.jpg"
            alt={t("imageAlt1")}
            className="impact-card-img"
          />
          <img
            src="/images/Water2025/water4.jpg"
            alt={t("imageAlt2")}
            className="impact-card-img"
          />
        </div>
      </div>
    </section>
  );
};

export default ImpactMessage;

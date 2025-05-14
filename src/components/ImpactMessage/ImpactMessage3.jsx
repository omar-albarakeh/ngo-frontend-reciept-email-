import React from "react";
import { useTranslation } from "react-i18next";
import "./ImpactMessage.css";

const ImpactMessage = () => {
  const { t } = useTranslation("impactzakat");

  const handleScroll = () => {
    const target = document.getElementById("zakat-calculator");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="impact-card-section">
      <div className="impact-card">
        <div className="impact-card-content">
          <h2 className="impact-card-heading">{t("heading")}</h2>
          <p className="impact-card-text">{t("paragraph")}</p>
          <div className="impact-card-button-wrapper">
            <button className="impact-card-btn" onClick={handleScroll}>
              {t("donateButton")}
            </button>
          </div>
        </div>

        <div className="impact-card-images">
          <img
            src="/images/ZakatAlMal/zakat1.png"
            alt={t("imageAlt1")}
            className="impact-card-img"
          />
          <img
            src="/images/ZakatAlMal/zakat2.png"
            alt={t("imageAlt2")}
            className="impact-card-img"
          />
        </div>
      </div>
    </section>
  );
};

export default ImpactMessage;

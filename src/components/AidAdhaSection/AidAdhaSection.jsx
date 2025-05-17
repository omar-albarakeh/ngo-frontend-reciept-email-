import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./AidAdhaSection.css";

const AidAdhaSection = () => {
  const { t } = useTranslation("adha");
  const navigate = useNavigate();

  return (
    <div className="aid-section">
      <div className="aid-triangle">
        <img src="/images/AidAlAdha/adha29.webp" alt="Qurbani distribution" />
      </div>
      <div className="aid-content">
        <h2>{t("aidAdha.heading")}</h2>
        <p>
          <strong>{t("aidAdha.paragraph1.bold")}</strong>{" "}
          {t("aidAdha.paragraph1.normal")}
        </p>
        <p>{t("aidAdha.paragraph2")}</p>

        <div className="aid-buttons">
          <button
            className="AidButton"
            onClick={() => navigate("/faire-un-don")}>
            {t("aidAdha.button")}
          </button>
          <button
            className="AidButton"
            onClick={() => navigate("/aid-al-adha")}>
            {t("aidAdha.learnMore")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AidAdhaSection;

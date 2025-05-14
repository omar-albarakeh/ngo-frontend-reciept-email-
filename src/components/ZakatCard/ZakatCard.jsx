import React from "react";
import { useTranslation } from "react-i18next";
import "./ZakatCard.css";
import CustomButton from "../customButton/customButton";
import { useNavigate } from "react-router-dom";

const ZakatCalculator = () => {
  const { t } = useTranslation("zakatCard");
  const navigate = useNavigate();

  return (
    <div className="zakat-section">
      <div className="zakat-content">
        <h2>{t("zakatCard.heading")}</h2>
        <p>
          <strong>{t("zakatCard.paragraph1.bold")}</strong>{" "}
          {t("zakatCard.paragraph1.normal")}
        </p>
        <p>{t("zakatCard.paragraph2")}</p>

        <div className="aid-buttons">
          <button
            className="ZakatButton"
            onClick={() => navigate("/zakat-al-maal#zakat-calculator")}>
            {t("zakatCard.button1")}
          </button>
          <button className="ZakatButton" onClick={() => navigate("/donation")}>
            {t("zakatCard.button2")}
          </button>
        </div>
      </div>
      <div className="zakat-triangle">
        <img
          src="/images/ZakatAlMal/ZakatAlMal1.webp"
          alt="Child counting coins"
        />
      </div>
    </div>
  );
};

export default ZakatCalculator;

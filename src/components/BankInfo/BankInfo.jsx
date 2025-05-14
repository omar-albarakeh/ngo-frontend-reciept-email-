import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./BankInfo.css";

const BankInfo = () => {
  const { t, i18n } = useTranslation("bankInfo");
  const [copied, setCopied] = useState("");

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const InfoItem = ({ labelKey, value }) => (
    <div className="info-inline-item">
      <strong>{t(`labels.${labelKey}`)}:</strong>
      <span className="info-value">{value}</span>
      <button
        onClick={() => handleCopy(value, labelKey)}
        className="copy-button"
        title={t(`copy.${labelKey}`)}>
        {copied === labelKey ? (
          <FontAwesomeIcon icon={faCheckCircle} className="copied-icon" />
        ) : (
          <FontAwesomeIcon icon={faCopy} />
        )}
      </button>
    </div>
  );

  return (
    <div
      className="bank-info-wrapper"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h2 className="bank-title">{t("title")}</h2>

      <div className="bank-columns">
        <div className="bank-section">
          <h3>{t("france")}</h3>
          <InfoItem
            labelKey="IBAN_FR"
            value="FR76 3000 3024 3300 0506 1175 910"
          />
          <InfoItem labelKey="BIC_FR" value="SOGEFRPP" />
        </div>

        <div className="bank-section">
          <h3>{t("switzerland")}</h3>
          <InfoItem labelKey="IBAN_CH" value="CH20 0070 0114 9025 3157 1" />
        </div>
      </div>
    </div>
  );
};

export default BankInfo;

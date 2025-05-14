import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheckCircle,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import "./DonationBenefits.css";
import CustomButton from "../customButton/customButton";

const DonationBenefits = () => {
  const { t } = useTranslation(["donationBenefits", "bankInfo"]);
  const [copied, setCopied] = useState("");

  const ibanFrance = "FR76 3000 3024 3300 0506 1175 910";
  const bicFrance = "SOGEFRPP";
  const ibanSwitzerland = "CH20 0070 0114 9025 3157 1";

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const InfoItem = ({ label, value }) => (
    <div className="info-inline-item">
      <div className="info-label-group">
        <FontAwesomeIcon icon={faUniversity} className="info-icon" />
        <strong>{label}:</strong>
      </div>
      <span className="info-value">{value}</span>
      <button
        onClick={() => handleCopy(value, label)}
        className={`copy-button ${copied === label ? "copied" : ""}`}
        title={t(`bankInfo.copy${label}`)}>
        {copied === label ? (
          <FontAwesomeIcon icon={faCheckCircle} className="copied-icon" />
        ) : (
          <FontAwesomeIcon icon={faCopy} />
        )}
      </button>
    </div>
  );

  return (
    <section className="donation-benefits">
      <div className="bank-info-box">
        <h3 className="bank-info-title">{t("title")}</h3>
        <div className="bank-info-row">
          <div className="bank-info-column">
            <h4>{t("france")}</h4>
            <InfoItem label="IBAN_FR" value={ibanFrance} />
            <InfoItem label="BIC_FR" value={bicFrance} />
          </div>
          <div className="bank-info-column">
            <h4>{t("switzerland")}</h4>
            <InfoItem label="IBAN_CH" value={ibanSwitzerland} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationBenefits;

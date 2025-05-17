import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheckCircle,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import "./DonationBenefits.css";

const DonationBenefits = () => {
  const { t, i18n } = useTranslation(["donationBenefits", "bankInfo"]);
  const [copied, setCopied] = useState("");
  const isRTL = i18n.dir() === "rtl";

  const bankAccounts = {
    france: {
      IBAN: "FR76 3000 3024 3300 0506 1175 910",
      BIC: "SOGEFRPP",
    },
    switzerland: {
      IBAN: "CH20 0070 0114 9025 3157 1",
    },
  };

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
    <div className={`info-inline-item ${isRTL ? "rtl" : ""}`}>
      <div className="info-label-group">
        <FontAwesomeIcon icon={faUniversity} className="info-icon" />
        <strong>{t(`bankInfo:${label}`)}:</strong>
      </div>
      <span className="info-value">{value}</span>
      <button
        onClick={() => handleCopy(value, label)}
        className={`copy-button ${copied === label ? "copied" : ""}`}
        title={t("bankInfo:copy")}
        aria-label={t("bankInfo:copy")}>
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
        <p className="bank-info-title">{t("donationBenefits:title")}</p>
        <div className="bank-info-row">
          <div className="bank-info-column">
            <h4>{t("donationBenefits:france")}</h4>
            <InfoItem label="IBAN_FR" value={bankAccounts.france.IBAN} />
            <InfoItem label="BIC_FR" value={bankAccounts.france.BIC} />
          </div>
          <div className="bank-info-column">
            <h4>{t("donationBenefits:switzerland")}</h4>
            <InfoItem label="IBAN_CH" value={bankAccounts.switzerland.IBAN} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationBenefits;

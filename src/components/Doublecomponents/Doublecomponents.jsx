import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DonationForm from "../Donation3/DonationForm";
import BankInfo from "../DonationBenefits/DonationBenefits";
import "./ToggleSection.css";

const ToggleSection = () => {
  const { t } = useTranslation("donations");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") === "bank" ? "bank" : "form";

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    // Update tab if the URL changes
    const newTab = queryParams.get("tab");
    if (newTab === "bank" || newTab === "form") {
      setActiveTab(newTab);
    }
  }, [location.search]);

  return (
    <div className="toggle-section">
      <h3>{t("chooseMethod")}</h3>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "form" ? "active" : ""}`}
          onClick={() => setActiveTab("form")}>
          {t("show_form")}
        </button>
        <button
          className={`tab-button ${activeTab === "bank" ? "active" : ""}`}
          onClick={() => setActiveTab("bank")}>
          {t("show_bank_info")}
        </button>
      </div>

      <div className="tab-content fade-in">
        {activeTab === "form" ? <DonationForm /> : <BankInfo />}
      </div>
    </div>
  );
};

export default ToggleSection;

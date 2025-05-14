import React from "react";
import "./DonationSection.css";

const DonationSection = () => {
  return (
    <div className="donation-wrapper">
      <div className="donation-columns">
        <div className="bank-transfer-box">
          <h2>Donate by bank transfer</h2>

          <div className="bank-section">
            <strong>France:</strong>
            <p>
              IBAN:{" "}
              <span className="bold">FR76 3000 3024 3300 0506 1175 910</span>
              <br />
              BIC: SOGEFRPP
            </p>
          </div>

          <div className="bank-section">
            <strong>Switzerland:</strong>
            <p>IBAN: CH20 0070 0114 9025 3157 1</p>
          </div>

          <p>Or by check payable to SOS Palestine / SOS Humanists</p>
          <p>
            Address:{" "}
            <span className="bold">
              7 Rue de Pfatstatt, 68110 Illzach, France
            </span>
          </p>
        </div>

        <div className="or-divider">or</div>
        <div className="donation-right">
          <h2 className="subheading">Donate with PayPal or credit card</h2>
          <button className="main-donate-button">DONATE</button>
        </div>
      </div>
    </div>
  );
};

export default DonationSection;

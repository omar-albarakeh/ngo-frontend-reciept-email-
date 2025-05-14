// DonationSummary.jsx
import React, { useEffect, useState } from "react";

const DonationSummary = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donationCause, setDonationCause] = useState("");

  useEffect(() => {
    // Fetch data from localStorage
    const amount = localStorage.getItem("donationAmount");
    const cause = localStorage.getItem("donationCause");

    // Update state
    if (amount) setDonationAmount(amount);
    if (cause) setDonationCause(cause);
  }, []);

  if (!donationAmount || !donationCause) {
    return <p>No donation information found.</p>;
  }

  return (
    <div className="donation-summary">
      <h2>Donation Summary</h2>
      <p>
        <strong>Amount:</strong> ${donationAmount}
      </p>
      <p>
        <strong>Cause:</strong> {donationCause}
      </p>
    </div>
  );
};

export default DonationSummary;

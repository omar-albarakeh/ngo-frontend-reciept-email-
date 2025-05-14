import React from "react";
import "./AidAlAdhaMessage.css";

const AidAlAdhaMessage = () => {
  return (
    <div className="aid-message-container fade-in">
      <h2 className="aid-message-title slide-in-top">Aid al-Adha Donation</h2>
      <p className="aid-message-text fade-in-delay">
        Photos of your sacrifice will be ready 5 days after Aid al-Adha ends.
      </p>
      <p className="aid-message-text fade-in-delay">
        Search your name to view them.
      </p>
    </div>
  );
};

export default AidAlAdhaMessage;

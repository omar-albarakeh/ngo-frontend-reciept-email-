// QurbaniSection.jsx

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import "./QurbaniSection.css";
import { useNavigate } from "react-router-dom";

const donationDeadline = new Date("2025-06-06T23:59:59");
const current = 1312;
const goal = 9200;

const QurbaniDonateBox = () => {
  const { t } = useTranslation("QurbaniSection");
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedTier, setSelectedTier] = useState(null);
  const progressRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = donationDeadline - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const percentage = (current / goal) * 100;
    gsap.to(progressRef.current, {
      width: `${percentage}%`,
      duration: 1,
      ease: "power2.out",
    });

    if (current >= goal) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, []);

  // const donationTiers = [
  //   { amount: 250, label: t("donationTier.sheep"), emoji: "🐑" },
  //   { amount: 260, label: t("donationTier.share"), image: "/icons/icon1.png" },
  //   { amount: 1850, label: t("donationTier.full"), emoji: "🐄" },
  // ];
  const donationTiers = [
    { amount: 250, label: t("donationTier.sheep") },
    { amount: 260, label: t("donationTier.share") },
    { amount: 1850, label: t("donationTier.full") },
  ];

  const handleDonate = (amount) => {
    setSelectedTier(amount);
    localStorage.setItem("donationAmount", amount.toString());
    localStorage.setItem("donationCause", "aidAlAdha");
    navigate("/donation");
  };

  return (
    <div className="donate-box">
      <h3 className="countdown-timer" aria-live="polite">
        🕒{" "}
        <span className="time-value">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </span>{" "}
        {t("timeLeft")}
      </h3>

      <div className="progress-bar-container">
        <div className="progress-text">{t("goalText", { goal, current })}</div>
        <div className="progress-bar">
          <div className="progress-fill" ref={progressRef}></div>
        </div>
      </div>

      <div className="donation-inline-row">
        <span className="donation-message">{t("donationMessage")}</span>
        <div className="donation-tiers">
          {donationTiers.map((tier) => (
            <button
              key={tier.amount}
              className={`donate-tier-btn ${
                selectedTier === tier.amount ? "selected" : ""
              }`}
              title={t("clickToSelect")}
              onClick={() => handleDonate(tier.amount)}>
              {/* {tier.image ? (
                <img
                  src={tier.image}
                  alt={tier.label}
                  className="donation-icon"
                />
              ) : (
                <span className="emoji">{tier.emoji}</span>
              )} */}
              €{tier.amount} – {tier.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QurbaniDonateBox;

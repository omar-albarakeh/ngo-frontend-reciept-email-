import React from "react";
import { useTranslation } from "react-i18next";
import "./AssistanceStats.css";
import {
  FaCoins,
  FaUserGraduate,
  FaHeartbeat,
  FaHandHoldingUsd,
  FaHandsHelping,
  FaUtensils,
  FaBox,
  FaDonate,
} from "react-icons/fa";

const iconMap = {
  FaCoins: FaCoins,
  FaUserGraduate: FaUserGraduate,
  FaHeartbeat: FaHeartbeat,
  FaHandHoldingUsd: FaHandHoldingUsd,
  FaHandsHelping: FaHandsHelping,
  FaUtensils: FaUtensils,
  FaBox: FaBox,
  FaDonate: FaDonate,
};

const ZakatStats = () => {
  const { t } = useTranslation("Ramadanstats");
  const stats = t("stats", { returnObjects: true });

  return (
    <div className="assist-stats-container">
      <h2>{t("title")}</h2>
      <div className="assist-donate-section">
        <p>{t("donateMessage")}</p>
        <a href="/donation" className="assist-donate-button">
          {t("donateButton")}
        </a>
      </div>

      <div className="assist-carousel-wrapper">
        <div
          className="assist-carousel-track"
          style={{ transform: "translateX(0%)" }}>
          <div className="assist-carousel-slide">
            {Array.isArray(stats) &&
              stats.map((item, idx) => {
                const Icon = iconMap[item.icon];
                return (
                  <div className="assist-stat-card" key={idx}>
                    <div className="assist-stat-icon">
                      <Icon size={100} />
                    </div>
                    <div className="assist-stat-text">
                      <strong>{item.label}</strong>
                      <br />
                      {item.count}
                      {item.note && (
                        <>
                          <br />
                          <small style={{ color: "#555" }}>{item.note}</small>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatStats;

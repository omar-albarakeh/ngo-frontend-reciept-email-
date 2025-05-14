import React from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../customButton/customButton";
import "./FeatureSection.css";
import { useNavigate } from "react-router-dom";

const FeatureSection = () => {
  const { t } = useTranslation("FeatureSection");
  const initiatives = t("features.initiatives", { returnObjects: true });
  const navigate = useNavigate();

  return (
    <section className="feature-container">
      <h1 className="activities-title">{t("features.title")}</h1>
      {initiatives.map((item, index) => (
        <div
          key={item.id}
          className={`feature-row ${index % 2 !== 0 ? "reverse" : ""}`}>
          <img
            src={`/images/FeatureSection/${item.id}.png`}
            alt={item.title}
            className="feature-image"
            loading="lazy"
          />
          <div className="feature-text">
            <h2>{item.title}</h2>
            <p>{item.description}</p>

            {(item.highlights || item.supplies || item.benefits) && (
              <ul className="feature-points">
                {(item.highlights || item.supplies || item.benefits).map(
                  (point, i) => (
                    <li key={i}>{point}</li>
                  )
                )}
              </ul>
            )}

            {item.urgency && <p className="urgency-text">{item.urgency}</p>}
            <button
              className="FeatureButton"
              onClick={() => navigate("/donation")}>
              {item.cta}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureSection;

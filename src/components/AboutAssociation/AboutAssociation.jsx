import React from "react";
import { useTranslation } from "react-i18next";
import "./AboutAssociation.css";

const AboutAssociation = () => {
  const { t } = useTranslation("History");

  const paragraphs = ["p1", "p2", "p3", "p4", "p5"].map((key, index) => (
    <p key={index}>{t(`about.${key}`)}</p>
  ));

  return (
    <section className="about-container fade-in">
      <h2 className="about-title">
        {t("about.title")} <span>{t("about.name")}</span>
      </h2>

      <figure className="about-quote-block">
        <blockquote>{t("about.quote")}</blockquote>
      </figure>

      <article className="about-content">
        {paragraphs}
        <p className="about-conclusion">{t("about.conclusion")}</p>
      </article>
    </section>
  );
};

export default AboutAssociation;

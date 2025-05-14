import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./OurApproach.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const sectionVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function OurApproach() {
  const { t } = useTranslation("ourapprouch");

  const items = t("ourApproach.rightSection.items", { returnObjects: true });

  return (
    <motion.div
      className="approach-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}>
      <motion.div className="approach-header" variants={sectionVariant}>
        <h2>{t("ourApproach.title")}</h2>
        <div className="green-line" />
      </motion.div>

      <motion.div className="approach-grid" variants={containerVariants}>
        <motion.div className="left-section" variants={sectionVariant}>
          <h3>{t("ourApproach.leftSection.heading")}</h3>
          <p>{t("ourApproach.leftSection.paragraph1")}</p>
          <p>{t("ourApproach.leftSection.paragraph2")}</p>
          <p>{t("ourApproach.leftSection.paragraph3")}</p>
        </motion.div>

        <motion.div className="right-section" variants={containerVariants}>
          {items.map((item, index) => (
            <motion.div
              className="info-block"
              key={index}
              variants={sectionVariant}>
              <span>{item.number}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

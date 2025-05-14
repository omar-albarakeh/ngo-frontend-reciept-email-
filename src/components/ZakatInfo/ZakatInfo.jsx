import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ZakatInfo.css";

function ZakatInfo() {
  const { t } = useTranslation("ZakatInfo");

  return (
    <div className="zakat-info-wrapper">
      <motion.section
        className="zakat-info-block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <h2 className="zakat-info-title">{t("zakat.what_title")}</h2>
        <p className="zakat-info-text">
          {t("zakat.what_text.part1")} <strong>2.5%</strong>{" "}
          {t("zakat.what_text.part2")}
          <strong>{t("zakat.what_text.part3")}</strong>{" "}
          {t("zakat.what_text.part4")}
          <strong>{t("zakat.what_text.part5")}</strong>.
        </p>
      </motion.section>

      <motion.section
        className="zakat-info-block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}>
        <h2 className="zakat-info-title">{t("zakat.right_title")}</h2>
        <p className="zakat-info-text">
          {t("zakat.right_text.part1")}{" "}
          <strong>{t("zakat.right_text.part2")}</strong>.
          {t("zakat.right_text.part3")} <em>{t("zakat.right_text.part4")}</em>.
        </p>
      </motion.section>
    </div>
  );
}

export default ZakatInfo;

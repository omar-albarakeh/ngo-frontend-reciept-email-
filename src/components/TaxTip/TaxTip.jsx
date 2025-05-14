import { useTranslation } from "react-i18next";
import "./TaxTip.css";

export default function TaxTip() {
  const { t } = useTranslation("Tax");

  return (
    <div className="tax-tip-box">
      <h3>{t("taxTipTitle")}</h3>
      <p>
        {t("taxReduction")} <strong>{t("taxReductionPercentage")}</strong>,{" "}
        {t("taxReductionLimit")}
      </p>
      <p>{t("example")}</p>
      <p className="tax-tip-note">
        {t("reportText")} <strong>{t("form")}</strong> {t("claimText")}
        <a
          href="https://www.impots.gouv.fr/portail/"
          target="_blank"
          rel="noopener noreferrer">
          {t("frenchTaxWebsite")}
        </a>
      </p>
    </div>
  );
}

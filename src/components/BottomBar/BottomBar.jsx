import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./BottomBar.css";
import CustomButton from "../customButton/customButton";

const BottomBar = ({ layout = "bottom" }) => {
  const { t } = useTranslation("bottomBar");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [amount, setAmount] = useState("");
  const [cause, setCause] = useState("aidAlAdha");

  const navigate = useNavigate();
  const footerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically open the bar on desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const trigger = document.getElementById("footer-trigger");
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting);
        if (entry.isIntersecting && isMobile) {
          setIsOpen(false);
        }
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [isMobile]);

  // Apply class to body for left sidebar layout
  useEffect(() => {
    if (layout === "left") {
      document.body.classList.add("with-left-bar");
    } else {
      document.body.classList.remove("with-left-bar");
    }
  }, [layout]);

  const handleDonateClick = () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      alert(t("pleaseEnterValidAmount"));
      return;
    }

    localStorage.setItem("donationAmount", parsedAmount.toString());
    localStorage.setItem("donationCause", cause);
    navigate("/faire-un-don");
  };

  const handleClosePanel = () => {
    setIsOpen(false);
  };

  const barClass = `bottom-bar ${layout} ${
    footerInView && layout === "bottom" ? "bottom-bar-static" : ""
  } ${isMobile ? "mobile" : ""}`;

  return (
    <>
      {isOpen && (
        <div className={barClass}>
          {isMobile && (
            <button className="bottom-bar-close" onClick={handleClosePanel}>
              ×
            </button>
          )}
          <span className="bottom-bar-title">{t("title")}</span>

          <input
            type="number"
            placeholder={t("placeholder")}
            className="bottom-bar-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />

          <select
            className="bottom-bar-select"
            value={cause}
            onChange={(e) => setCause(e.target.value)}>
            <option value="aidAlAdha">{t("causes.aidAlAdha")}</option>
            <option value="sosGaza">{t("causes.sosGaza")}</option>
            <option value="zakatAlMaal">{t("causes.zakatAlMaal")}</option>
            <option value="ramadanDonations">{t("causes.ramadan")}</option>
            <option value="orphanSponsorship">
              {t("causes.orphanSponsorship")}
            </option>
            <option value="waterForGaza">{t("causes.waterForGaza")}</option>
            <option value="inGeneral">{t("causes.InGeneral")}</option>
            <option value="zakatFitr">{t("causes.ZakatFitr")}</option>
          </select>

          <CustomButton
            titleKey={t("donate")}
            onClick={handleDonateClick}
            className="bottom-bar-button"
          />
        </div>
      )}

      {isMobile && layout === "bottom" && !footerInView && (
        <button
          className="bottom-bar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? t("close") : t("donate")}
          role="button"
          tabIndex={0}>
          {isOpen ? t("close") : t("donate")}
        </button>
      )}
    </>
  );
};

export default BottomBar;

import React from "react";
import { useTranslation } from "react-i18next";
import "./TopBar.css";

const TopInfoBar = () => {
  const { t, i18n } = useTranslation("navbar");
  const isArabic = i18n.language === "ar";

  const contactItems = [
    {
      icon: "fas fa-map-marker-alt",
      content: (
        <a
          href="https://www.google.com/maps/search/7+Rue+de+Pfastatt,+68110+illzach,+France"
          target="_blank"
          rel="noopener noreferrer"
          className="top-contact-link">
          7 Rue de Pfastatt, 68110 Illzach, France
        </a>
      ),
    },
    {
      icon: "fas fa-envelope",
      content: (
        <a href="mailto:contact@sospalestine.fr" className="top-contact-link">
          contact@sospalestine.fr
        </a>
      ),
    },
    {
      icon: "fas fa-phone",
      content: (
        <span className="phone-links">
          <a href="tel:+33634588276" className="top-contact-link">
            +33 6 34 58 82 76
          </a>
          <span className="separator"> / </span>
          <a href="tel:+33951082454" className="top-contact-link">
            +33 9 51 08 24 54
          </a>
          <span className="separator"> / </span>
          <a href="tel:+33783255325" className="top-contact-link">
            +33 7 83 25 53 25
          </a>
        </span>
      ),
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/sospalestinefr68/",
      icon: "/images/Social-Media/facebook.png",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sospalestine68/",
      icon: "/images/Social-Media/instagram.png",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@sospalestine1",
      icon: "/images/Social-Media/tik-tok.png",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@sospalestine68?si=9gQftfQfbCE4ROI_",
      icon: "/images/Social-Media/youtube.png",
    },
  ];

  return (
    <div className="top-bar">
      <div className="top-contact-info">
        {contactItems.map((item, index) => (
          <div key={index} className="top-contact-item">
            <i className={item.icon}></i>
            {item.content}
          </div>
        ))}
      </div>

      <div className={`top-social-links ${isArabic ? "rtl" : ""}`}>
        <span className="top-follow-label">{t("nav.follow-us")}</span>
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="top-social-link"
            aria-label={social.name}>
            <img
              src={social.icon}
              alt={social.name}
              className="top-icon"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopInfoBar;

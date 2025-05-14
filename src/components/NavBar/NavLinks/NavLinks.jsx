import React from "react";
import { Link, useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { useTranslation } from "react-i18next";
import CustomButton from "../../customButton/customButton";
import "./NavLinks.css";

const NavLinks = ({
  isMobile,
  menuOpen,
  activeDropdown,
  setActiveDropdown,
  handleDropdown,
  closeMenu,
}) => {
  const { t } = useTranslation("navbar");
  const location = useLocation();
  const currentPath = location.pathname;

  const dropdownItems = {
    services: [
      { path: "/sos-gaza", label: t("nav.services.sosGaza") },
      { path: "/zakat-al-maal", label: t("nav.services.zakatAlMaal") },
      { path: "/ramadan-2025", label: t("nav.services.ramadan2025") },
      { path: "/aid-al-adha", label: t("nav.services.aidAlAdha") },
      {
        path: "/orphan-sponsorship",
        label: t("nav.services.orphanSponsorship"),
      },
      { path: "/water-for-gaza", label: t("nav.services.waterForGaza") },
    ],
    whoWeAre: [
      { path: "/Whoweare", label: t("nav.whoWeAre.whoAreWe") },
      { path: "/history", label: t("nav.whoWeAre.history") },
    ],
  };

  return (
    <nav className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
      <Link
        to="/Home"
        onClick={closeMenu}
        className={currentPath === "/" ? "active" : ""}>
        {t("nav.Welcome")}
      </Link>

      <Link
        to="/gallery"
        onClick={closeMenu}
        className={currentPath === "/gallery" ? "active" : ""}>
        {t("nav.gallery")}
      </Link>
      <DropdownMenu
        label={t("nav.ourServices")}
        name="services"
        items={dropdownItems.services}
        isMobile={isMobile}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        handleDropdown={handleDropdown}
        closeMenu={closeMenu}
        currentPath={currentPath}
      />

      <DropdownMenu
        label={t("nav.whoWeAre.title")}
        name="whoWeAre"
        items={dropdownItems.whoWeAre}
        isMobile={isMobile}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        handleDropdown={handleDropdown}
        closeMenu={closeMenu}
        currentPath={currentPath}
      />

      <Link
        to="/contact"
        onClick={closeMenu}
        className={currentPath === "/contact" ? "active" : ""}>
        {t("nav.contactUs")}
      </Link>

      <CustomButton titleKey={t("nav.donateNow")} to="/donation" />
    </nav>
  );
};

export default NavLinks;

import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languageOptions = [
    { value: "en", label: "EN", full: "English", flag: "/flags/en.png" },
    { value: "fr", label: "FR", full: "Français", flag: "/flags/fr.png" },
    { value: "ar", label: "AR", full: "العربية", flag: "/flags/ar.png" },
    { value: "de", label: "DE", full: "Deutsch", flag: "/flags/de.png" },
  ];

  const currentLanguage =
    languageOptions.find((lang) => lang.value === i18n.language) ||
    languageOptions[0];

  const handleChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
  };

  const formatOptionLabel = ({ label, flag }) => (
    <div className="language-option">
      <img src={flag} alt={label} />
      <span>{label}</span>
    </div>
  );

  return (
    <Select
      options={languageOptions}
      value={currentLanguage}
      onChange={handleChange}
      formatOptionLabel={formatOptionLabel}
      isSearchable={false}
      classNamePrefix="lang-select"
      className="language-switcher"
    />
  );
};

export default LanguageSwitcher;

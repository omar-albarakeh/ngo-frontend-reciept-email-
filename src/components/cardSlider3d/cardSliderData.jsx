// cardSliderData.js
import { useTranslation } from "react-i18next";

const useSliderImages = () => {
  const { t } = useTranslation("card3d");

  return [
    {
      id: 1,
      src: "/images/CardSlider/Donation1.jpg",
      title: t("sliderB.water_for_gaza_title"),
      description: t("sliderB.water_for_gaza_description"),
      cta: t("sliderB.water_for_gaza_cta"),
      folder: "water-for-gaza",
    },
    {
      id: 2,
      src: "/images/CardSlider/Donation2.jpg",
      title: t("sliderB.ramadan_2025_title"),
      description: t("sliderB.ramadan_2025_description"),
      cta: t("sliderB.ramadan_2025_cta"),
      folder: "ramadan-2025",
    },
    {
      id: 3,
      src: "/images/CardSlider/Donation4.jpg",
      title: t("sliderB.sos_gaza_title"),
      description: t("sliderB.sos_gaza_description"),
      cta: t("sliderB.sos_gaza_cta"),
      folder: "sos-gaza",
    },
    {
      id: 4,
      src: "/images/CardSlider/Donation5.jpg",
      title: t("sliderB.orphan_sponsorship_title"),
      description: t("sliderB.orphan_sponsorship_description"),
      cta: t("sliderB.orphan_sponsorship_cta"),
      folder: "orphan-sponsorship",
    },
    {
      id: 5,
      src: "/images/CardSlider/Donation6.jpg",
      title: t("sliderB.zakat_maal_title"),
      description: t("sliderB.zakat_maal_description"),
      cta: t("sliderB.zakat_maal_cta"),
      folder: "zakat-maal",
    },
    {
      id: 6,
      src: "/images/CardSlider/Donation7.jpg",
      title: t("sliderB.aid_al_adha_title"),
      description: t("sliderB.aid_al_adha_description"),
      cta: t("sliderB.aid_al_adha_cta"),
      folder: "aid-al-adha",
    },
  ];
};

export default useSliderImages;

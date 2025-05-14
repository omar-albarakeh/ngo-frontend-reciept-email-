import React from "react";
import TopInfoBar from "../components/TopInfo/TopBar";
import MyNavBar from "../components/NavBar/MyNavBar/MyNavBar";
import Footer from "../components/Footer/Footer";
import MenuItem from "../components/MenuItem/MenuItem";
import BacktoTop from "../components/BackToTopButton/BackToTop";
import CharityQuote from "../components/CharityQuote/CharityQuote";
import BottomBar from "../components/BottomBar/BottomBar";
import FAQAccordion from "../components/FAQAccordion/FAQAccordion";
import ZakatCalculator from "../components/ZakatCalculator/ZakatCalculator";
import { useTranslation } from "react-i18next";
import HeroSection6 from "../components/HeroSection6/HeroSection6";
import AidSlider7 from "../components/AidSlider/Ramadan2025";
import LifeVerseCard from "../components/LifeVerseCard/LifeVerseCard";
import AutoScrollingRoll from "../components/AutoScrollingRoll/AutoScrollingRoll";
import ImpactMessage from "../components/ImpactMessage/ImpactMessage4";

const Ramadan2025 = () => {
  const { t } = useTranslation("Ramadan2025");
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      <HeroSection6 />
      <AutoScrollingRoll folder="Ramadan2025" />
      <ImpactMessage />
      <LifeVerseCard
        sentences={t("verse.sentences", { returnObjects: true })}
        source={t("verse.source")}
      />
      <AidSlider7 />
      <FAQAccordion
        title={t("faqs.title")}
        faqList={
          Array.isArray(t("faqs.list", { returnObjects: true }))
            ? t("faqs.list", { returnObjects: true })
            : []
        }
      />
      <MenuItem />
      <CharityQuote />
      <BacktoTop />
      <div id="footer-trigger" style={{ height: "0.01px" }}></div>
      <BottomBar />
      <Footer />
    </>
  );
};

export default Ramadan2025;

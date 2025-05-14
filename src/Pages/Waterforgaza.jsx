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
import HeroSection8 from "../components/HeroSection8/HeroSection8";
import AidSlider9 from "../components/AidSlider/waterStats";
import LifeVerseCard from "../components/LifeVerseCard/LifeVerseCard";
import ImpactMessage6 from "../components/ImpactMessage/ImpactMessage6";
import AutoScrollingRoll from "../components/AutoScrollingRoll/AutoScrollingRoll";

const water = () => {
  const { t } = useTranslation("water");
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      <HeroSection8 />
      <AutoScrollingRoll folder="Water2025" />
      <ImpactMessage6 />
      <LifeVerseCard
        sentences={t("verse.sentences", { returnObjects: true })}
        source={t("verse.source")}
      />
      <AidSlider9 />
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

export default water;

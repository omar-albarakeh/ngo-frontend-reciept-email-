import React from "react";
import TopInfoBar from "../components/TopInfo/TopBar";
import MyNavBar from "../components/NavBar/MyNavBar/MyNavBar";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import TaxTip from "../components/TaxTip/TaxTip";
import YouTube from "../components/Youtube/YouTubeGallery";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import CardSlider from "../components/cardSlider3d/cardSlider3d";
import MenuItem from "../components/MenuItem/MenuItem";
import BacktoTop from "../components/BackToTopButton/BackToTop";
import CharityQuote from "../components/CharityQuote/CharityQuote";
import Footer from "../components/Footer/Footer";
import BottomBar from "../components/BottomBar/BottomBar";
import FAQAccordion from "../components/FAQAccordion/FAQAccordion";
import HeroSection5 from "../components/HeroSection5/HeroSection5";
import AutoScrollingRoll from "../components/AutoScrollingRoll/AutoScrollingRoll";
import ImpactMessage2 from "../components/ImpactMessage/ImpactMessage2";
import AidSlider2 from "../components/AidSlider/SosGazaStats";
import { useTranslation } from "react-i18next";
import LifeVerseCard from "../components/LifeVerseCard/LifeVerseCard";

const SOSGaza = () => {
  const { t } = useTranslation("SOSGaza");
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      <HeroSection5 />
      <AutoScrollingRoll folder="SOSGaza" />
      <ImpactMessage2 />
      <LifeVerseCard
        sentences={t("verse.sentences", { returnObjects: true })}
        source={t("verse.source")}
      />
      <AidSlider2 />
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

export default SOSGaza;

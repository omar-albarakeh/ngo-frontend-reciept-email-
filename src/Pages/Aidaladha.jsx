import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TopInfoBar from "../components/TopInfo/TopBar";
import MyNavBar from "../components/NavBar/MyNavBar/MyNavBar";
import Footer from "../components/Footer/Footer";
import BacktoTop from "../components/BackToTopButton/BackToTop";
import BottomBar from "../components/BottomBar/BottomBar";
import HeroSlider2 from "../components/HeroSection2/HeroSection2";
import ImpactMessage from "../components/ImpactMessage/ImpactMessage";
import AutoScrollingRoll from "../components/AutoScrollingRoll/AutoScrollingRoll";
import AidSlider from "../components/AidSlider/AdhaStats";
import FAQAccordion from "../components/FAQAccordion/FAQAccordion";
import CharityQuote from "../components/CharityQuote/CharityQuote";
import LifeVerseCard from "../components/LifeVerseCard/LifeVerseCard";
import QurbaniSection from "../components/QurbaniSection/QurbaniSection";
import AidAlAdhaMessage from "../components/AidAlAdhaMessage/AidAlAdhaMessage";
import adsData from "../components/AdPopup/Data";
import AdPopup from "../components/AdPopup/AdPopup";
// import TaxTip from "../components/TaxTip/TaxTip";
// import YouTube from "../components/Youtube/YouTubeGallery";
// import ZakatCard from "../components/ZakatCard/ZakatCalculator";
// import FeatureSection from "../components/FeatureSection/FeatureSection";
// import CardSlider from "../components/cardSlider3d/cardSlider3d";
// import DonationBenefits from "../components/DonationBenefits/DonationBenefits";
import MenuItem from "../components/MenuItem/MenuItem";
// import BankInfo from "../components/BankInfo/BankInfo";
// import AidAdhaSection from "../components/AidAdhaSection/AidAdhaSection";
// import AdPopup from "../components/AdPopup/AdPopup";

const Aidaladha = () => {
  const { t } = useTranslation("AidAdha");
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      <QurbaniSection />
      <HeroSlider2 />
      <AutoScrollingRoll folder="AidAlAdha" />
      {/* <AidAlAdhaMessage /> */}
      <ImpactMessage />
      <LifeVerseCard
        sentences={t("verse.sentences", { returnObjects: true })}
        source={t("verse.source")}
      />
      <AidSlider />
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
      <div id="footer-trigger" style={{ height: "0.01px" }}></div>
      <BottomBar />
      <BacktoTop />
      <Footer />
    </>
  );
};

export default Aidaladha;

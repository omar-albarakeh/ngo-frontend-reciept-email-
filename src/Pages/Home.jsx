import React from "react";
import TopInfoBar from "../components/TopInfo/TopBar";
import MyNavBar from "../components/NavBar/MyNavBar/MyNavBar";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import TaxTip from "../components/TaxTip/TaxTip";
import QurbaniDonateBox from "../components/QurbaniSection/QurbaniSection";
import AidAdhaSection from "../components/AidAdhaSection/AidAdhaSection";
import ZakatCard from "../components/ZakatCard/ZakatCard";
import Youtube from "../components/Youtube/YouTubeGallery";
import BackToTop from "../components/BackToTopButton/BackToTop";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import CardSlider from "../components/cardSlider3d/cardSlider3d";
import Menu from "../components/MenuItem/MenuItem";
import CharityQuote from "../components/CharityQuote/CharityQuote";
import Footer from "../components/Footer/Footer";
import BottomBar from "../components/BottomBar/BottomBar";
import DonationBenefits from "../components/DonationBenefits/DonationBenefits";
import adsData from "../components/AdPopup/Data";
import AdPopup from "../components/AdPopup/AdPopup";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("AidTranslation");
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      <HeroSlider />
      {/* <TaxTip /> */}
      <QurbaniDonateBox />
      {adsData.map((ad, index) => (
        <AdPopup
          key={index}
          {...ad}
          message={t(ad.message)}
          topOffset={200 + index * 100}
        />
      ))}
      <AidAdhaSection />
      <ZakatCard />
      <Youtube />
      <FeatureSection />
      <CardSlider />
      <Menu />
      <DonationBenefits />
      <BackToTop />
      <CharityQuote />
      <div id="footer-trigger" style={{ height: "0.01px" }}></div>
      <BottomBar />
      <Footer />
    </>
  );
};

export default Home;

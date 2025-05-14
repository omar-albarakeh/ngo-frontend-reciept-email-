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
import HeroSection5 from "../components/HeroSection7/HeroSection7";
import AidSlider7 from "../components/AidSlider/ZakatStats";
import LifeVerseCard from "../components/LifeVerseCard/LifeVerseCard";
import ImpactMessage3 from "../components/ImpactMessage/ImpactMessage3";
import React, { useState, useEffect } from "react";
import ZakatInfo from "../components/ZakatInfo/ZakatInfo";
const ZakatAlmal = () => {
  const { t } = useTranslation("Zakaatal-Maal");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      <HeroSection5 />
      <ImpactMessage3 />
      <LifeVerseCard
        sentences={t("verse.sentences", { returnObjects: true })}
        source={t("verse.source")}
      />
      <ZakatInfo />
      <section id="zakat-calculator">
        <ZakatCalculator />
      </section>
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

export default ZakatAlmal;

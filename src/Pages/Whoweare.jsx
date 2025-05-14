import React from "react";
import TopInfoBar from "../components/TopInfo/TopBar";
import MyNavBar from "../components/NavBar/MyNavBar/MyNavBar";
import Introduction from "../components/Introduction/Introduction";
import MenuItem from "../components/MenuItem/MenuItem";
import BacktoTop from "../components/BackToTopButton/BackToTop";
import CharityQuote from "../components/CharityQuote/CharityQuote";
import Parallelscreen from "../components/parallelscreen/parallelscreen";
import Footer from "../components/Footer/Footer";
import BottomBar from "../components/BottomBar/BottomBar";
import BackToTop from "../components/BackToTopButton/BackToTop";
import { useTranslation } from "react-i18next";
import OurApprouch from "../components/OurApproach/OurApproach";
import CommitmentSection from "../components/CommitmentSection/CommitmentSection";
import LifeVerseCard from "../components/LifeVerseCard/LifeVerseCard";

const Whoweare = () => {
  const { t } = useTranslation("whoweare");
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      <Parallelscreen
        backgroundImage="/images/parallelscreen/parallel1.webp"
        heading={t("donate.heading")}
        text={t("donate.text")}
        buttonTitle={t("donate.button")}
        buttonLink="/donation"
      />
      <Introduction />
      <LifeVerseCard sentences={[t("verse.text")]} source={t("verse.source")} />

      <OurApprouch />
      <CharityQuote />
      <div id="footer-trigger" style={{ height: "0.01px" }}></div>
      <BottomBar />
      <Footer />
    </>
  );
};

export default Whoweare;

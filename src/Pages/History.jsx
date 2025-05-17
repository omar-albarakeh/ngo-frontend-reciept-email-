import React from "react";
import TopInfoBar from "../components/TopInfo/TopBar";
import MyNavBar from "../components/NavBar/MyNavBar/MyNavBar";
import BacktoTop from "../components/BackToTopButton/BackToTop";
import CharityQuote from "../components/CharityQuote/CharityQuote";
import Footer from "../components/Footer/Footer";
import BottomBar from "../components/BottomBar/BottomBar";
import Parallelscreen from "../components/parallelscreen/parallelscreen";
import { useTranslation } from "react-i18next";
import AboutAssociation from "../components/AboutAssociation/AboutAssociation";
const Home = () => {
  const { t } = useTranslation("History");
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      <Parallelscreen
        backgroundImage="/images/parallelscreen/parallel2.webp"
        heading={t("donate.heading")}
        text={t("donate.text")}
        buttonTitle={t("donate.button")}
        buttonLink="/faire-un-don"
      />
      <AboutAssociation />
      <CharityQuote />
      <BacktoTop />
      <div id="footer-trigger" style={{ height: "0.01px" }}></div>
      <BottomBar />
      <Footer />
    </>
  );
};

export default Home;

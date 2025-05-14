import React from "react";
import TopInfoBar from "../components/TopInfo/TopBar";
import MyNavBar from "../components/NavBar/MyNavBar/MyNavBar";
import BacktoTop from "../components/BackToTopButton/BackToTop";
import Footer from "../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import Projects from "../components/Gallery/GalleryComponent";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <MyNavBar />
      <Projects />
      <BacktoTop />
      <Footer />
    </>
  );
};

export default Home;

import React from "react";
import TopInfoBar from "../components/TopInfo/TopBar";
import MyNavBar from "../components/NavBar/MyNavBar/MyNavBar";
import CharityQuote from "../components/CharityQuote/CharityQuote";
import Footer from "../components/Footer/Footer";
import DonationForm from "../components/Donation3/DonationForm";
import BackToTop from "../components/BackToTopButton/BackToTop";
import TaxTip from "../components/TaxTip/TaxTip";
import DonationBenefits from "../components/DonationBenefits/DonationBenefits";
import DoubleComponents from "../components/Doublecomponents/Doublecomponents";

const Contact = () => {
  return (
    <>
      <TopInfoBar />
      <MyNavBar />
      {/* <DonationForm /> */}
      <DoubleComponents />
      <CharityQuote />
      <BackToTop />
      <Footer />
    </>
  );
};

export default Contact;

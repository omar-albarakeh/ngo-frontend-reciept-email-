import "./App.css";
import "./i18n";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./Pages/Home";
import History from "./Pages/History";
import Whoweare from "./Pages/Whoweare";
import Contact from "./Pages/Contact";
import Donations from "./Pages/DonationPage";
import Donation1 from "./Pages/DonationPage";
import Gallery from "./Pages/Gallery";
import SOSGaza from "./Pages/SOSGaza";
import ZakatAlmal from "./Pages/ZakatAlmal";
import Ramadan2025 from "./Pages/ramadan2025";
import Aidaladha from "./Pages/Aidaladha";
import Orphansponsorship from "./Pages/Orphansponsorship";
import Waterforgaza from "./Pages/Waterforgaza";
import ScrollToTop from "./components/scrolltotop/Scrolltotop";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/aid-al-adha" />} />
        {/* French Routes */}
        <Route path="/accueil" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/qui-sommes-nous" element={<Whoweare />} />
        <Route path="/histoire" element={<History />} />
        <Route path="/dons" element={<Donations />} />
        <Route path="/faire-un-don" element={<Donation1 />} />
        <Route path="/galerie" element={<Gallery />} />
        <Route path="/sos-gaza" element={<SOSGaza />} />
        <Route path="/zakat-al-maal" element={<ZakatAlmal />} />
        <Route path="/ramadan-2025" element={<Ramadan2025 />} />
        <Route path="/aid-al-adha" element={<Aidaladha />} />
        <Route path="/parrainage-orphelins" element={<Orphansponsorship />} />
        <Route path="/eau-pour-gaza" element={<Waterforgaza />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./CharityQuote.css";

const typingSpeed = 50;
const pauseAfterTyping = 2000;

const CharityQuote = () => {
  const { t, i18n } = useTranslation("CharityQuote ");
  const quotes = t("charityQuotes", { returnObjects: true }) || [];

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const isArabic = i18n.language === "ar";

  useEffect(() => {
    if (quotes.length === 0) return;

    if (charIndex < quotes[quoteIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText(quotes[quoteIndex].slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setCharIndex(0);
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setDisplayedText("");
      }, pauseAfterTyping);
      return () => clearTimeout(pause);
    }
  }, [charIndex, quoteIndex, quotes]);

  return (
    <div
      className={`charity-quote-container ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}>
      <p className="charity-quote-text">{displayedText}</p>
    </div>
  );
};

export default CharityQuote;

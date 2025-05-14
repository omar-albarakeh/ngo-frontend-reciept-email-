import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./HeroSlider.css";
import CustomButton from "../customButton/customButton";

const HeroSlider = () => {
  const { t } = useTranslation("HeroSlider1");

  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeoutRef = useRef(null);
  const progressRef = useRef(null);
  const AUTO_INTERVAL = 5000;

  useEffect(() => {
    setSlides(t("slider", { returnObjects: true }));
  }, [t]);

  const totalSlides = slides.length;

  const resetProgressAnimation = () => {
    if (progressRef.current) {
      progressRef.current.style.animation = "none";
      void progressRef.current.offsetWidth;
      progressRef.current.style.animation = `progressBar ${AUTO_INTERVAL}ms linear forwards`;
    }
  };

  const startAutoSlide = () => {
    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTO_INTERVAL);
    resetProgressAnimation();
  };

  const stopAutoSlide = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
  };

  useEffect(() => {
    if (slides.length > 0) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [slides]);

  const goToSlide = (direction) => {
    stopAutoSlide();

    setCurrentIndex((prev) =>
      direction === "next"
        ? (prev + 1) % totalSlides
        : (prev - 1 + totalSlides) % totalSlides
    );

    startAutoSlide();
  };

  if (!slides.length) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="hero-slider">
      <div className="hero-slider-track">
        <div
          className="hero-slide current"
          style={{
            backgroundImage: `url(images/HeroSlider/slide${
              currentIndex + 1
            }.webp)`,
          }}>
          <div className="hero-slide-inner">
            <div className="hero-content">
              <div className="hero-text-box">
                <h2 className="hero-title">{currentSlide.name}</h2>
                <h3 className="hero-subtitle">{currentSlide.description}</h3>
                <div className="middle">
                  <CustomButton
                    title={currentSlide.buttonText}
                    to={currentSlide.link}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="progress-barA" ref={progressRef}></div>
        </div>
      </div>

      <div className="headerslider-arrows">
        <button className="headerslider-prev" onClick={() => goToSlide("prev")}>
          &lt;
        </button>
        <button className="headerslider-next" onClick={() => goToSlide("next")}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;

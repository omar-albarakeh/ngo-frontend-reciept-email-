import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useTranslation } from "react-i18next";
import "./YouTubeGallery.css";
import videoData from "./videoData.json";

const YouTubeCard = ({ videoId, title, description }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="youtube-card">
      <div className="card-video">
        <ReactPlayer url={videoUrl} width="100%" height="180px" controls />
      </div>
      <div className="card-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const YouTubeGallery = () => {
  const scrollRef = useRef();
  const { t } = useTranslation("Youtube");

  const [translatedData, setTranslatedData] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const translatedVideos = videoData.map((video, idx) => ({
      ...video,
      title: t(`videos.${idx}.title`),
      description: t(`videos.${idx}.description`),
    }));
    setTranslatedData(translatedVideos);
  }, [t]);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);

      container.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="youtube-gallery">
      <div className="slider-full-gallery-btn-wrapper">
        <h2 className="video-heading">{t("youtubeUpdates")}</h2>
        <button
          className="slider-full-gallery-btn"
          onClick={() => {
            window.open(
              "https://www.youtube.com/@sospalestine68",
              "_blank",
              "noopener,noreferrer"
            );
          }}>
          <img
            src="/images/Social-Media/youtube.png"
            alt="YouTube Logo"
            className="youtube-icon"
          />
          {t("visit")}
        </button>
      </div>

      <div className="scroll-container">
        <button
          className={`scroll-btn left ${canScrollLeft ? "" : "disabled"}`}
          onClick={() => handleScroll("left")}>
          &lt;
        </button>

        <div className="scroll-wrapper">
          <div className="youtube-card-list" ref={scrollRef}>
            {translatedData.map((video, idx) => (
              <YouTubeCard key={idx} {...video} />
            ))}
          </div>
        </div>

        <button
          className={`scroll-btn right ${canScrollRight ? "" : "disabled"}`}
          onClick={() => handleScroll("right")}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default YouTubeGallery;

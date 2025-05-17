import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectCard from "./Gallerycards";
import campaigns from "./campaigns";
import "./Gallery.css";

const Gallery = () => {
  const { t } = useTranslation("Gallery");
  const location = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const justClosedRef = useRef(false); 

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allProjects = Object.values(campaigns).flat();
  const searchParams = new URLSearchParams(location.search);
  const folderQuery = searchParams.get("folder");

  useEffect(() => {
    if (
      folderQuery &&
      selectedImages.length === 0 &&
      !justClosedRef.current
    ) {
      const matchedProject = allProjects.find((p) => p.folder === folderQuery);
      if (matchedProject) {
        setSelectedImages(matchedProject.images || []);
        setCurrentIndex(0);
      }
    }

    if (justClosedRef.current) {
      justClosedRef.current = false;
    }
  }, [folderQuery, allProjects, selectedImages.length]);

  useEffect(() => {
    if (selectedImages.length > 0 && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedImages]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImages]);

  const handleCardClick = (images, folder) => {
    navigate(`/galerie?folder=${encodeURIComponent(folder)}`);
    setSelectedImages(images);
    setCurrentIndex(0);
  };

  const closeModal = () => {
    // Prevent re-opening from effect
    justClosedRef.current = true;

    // Clear query param first
    navigate(location.pathname);

    // Clear state
    setSelectedImages([]);
    setCurrentIndex(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + selectedImages.length) % selectedImages.length
    );
  };

  return (
    <section className="gallery-section" id="projects">
      <div className="container">
        <h2>{t("campaigns.title")}</h2>
        <p>{t("campaigns.subtitle")}</p>

        <div className="project-grid">
          {allProjects.length > 0 ? (
            allProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                imgUrl={project.images[0]}
                onClick={() => handleCardClick(project.images, project.folder)}
              />
            ))
          ) : (
            <p className="no-projects">{t("campaigns.no_projects")}</p>
          )}
        </div>
      </div>

      {selectedImages.length > 0 && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>

            <button className="nav-arrow left" onClick={goToPrev}>
              &#10094;
            </button>
            <button className="nav-arrow right" onClick={goToNext}>
              &#10095;
            </button>

            <div className="modal-image">
              <img
                src={selectedImages[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
              />
              <p className="image-counter">
                {currentIndex + 1} {t("of")} {selectedImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

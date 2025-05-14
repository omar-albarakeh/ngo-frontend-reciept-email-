import React from "react";
import { useTranslation } from "react-i18next";
import "./Gallery.css";

const ProjectCard = ({ title, description, imgUrl, onClick }) => {
  const { t } = useTranslation("Gallery");

  return (
    <div className="project-card" onClick={onClick}>
      <img src={imgUrl} alt={t(title)} className="card-img" />
      <div className="card-content">
        <h3>{t(title)}</h3>
        <p>{t(description)}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

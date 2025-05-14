import React, { useState } from "react";
import "./AssistanceStats.css";

const stats = [
  { icon: "fa-box", label: "Food Packages Delivered", count: "120,000 people" },
  {
    icon: "fa-briefcase-medical",
    label: "Medical Aid Provided",
    count: "85,000 people",
  },
  {
    icon: "fa-house-chimney", // Or another fitting icon
    label: "Temporary Shelters Established",
    count: "15,000 families",
  },
  {
    icon: "fa-faucet",
    label: "Clean Water Access Restored",
    count: "60,000 people",
  },
  {
    icon: "fa-book",
    label: "School Kits Distributed",
    count: "25,000 children",
  },
  {
    icon: "fa-truck-medical",
    label: "Mobile Clinics Deployed",
    count: "200 clinics",
  },
  { icon: "fa-bed", label: "Hospital Beds Supplied", count: "1,500 beds" },
  { icon: "fa-baby", label: "Infant Nutrition Kits", count: "10,000 babies" },
  {
    icon: "fa-pump-soap",
    label: "Hygiene Kits Delivered",
    count: "75,000 people",
  },
  {
    icon: "fa-fire",
    label: "Heating Supplies Distributed",
    count: "30,000 families",
  },
  { icon: "fa-truck", label: "Relief Convoys Sent", count: "480 trucks" },
  {
    icon: "fa-money",
    label: "Emergency Cash Support",
    count: "18,000 families",
  },
];

const CARDS_PER_SLIDE = 4;
const totalSlides = Math.ceil(stats.length / CARDS_PER_SLIDE);

const AssistanceStats = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index) => setCurrentSlide(index);

  // Group stats for each slide
  const groupedStats = Array.from({ length: totalSlides }, (_, i) =>
    stats.slice(i * CARDS_PER_SLIDE, i * CARDS_PER_SLIDE + CARDS_PER_SLIDE)
  );

  return (
    <div className="stats-container">

      <div className="carousel-wrapper">
        <div
          className="carousel-track-multi"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {groupedStats.map((group, groupIdx) => (
            <div className="carousel-slide-multi" key={groupIdx}>
              {group.map((item, idx) => (
                <div className="stat-card" key={idx}>
                  <div className="stat-icon">
                    <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <div className="stat-text">
                    <strong>{item.label}</strong>
                    <br />
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AssistanceStats;

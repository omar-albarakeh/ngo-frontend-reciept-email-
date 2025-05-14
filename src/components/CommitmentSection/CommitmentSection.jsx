import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./CommitmentSection.css";

const CommitmentSection = () => {
  const { t } = useTranslation("FeatureB");
  const labels = t("labels", { returnObjects: true });
  const [progressList, setProgressList] = useState(
    Array(labels.length).fill(0)
  );
  const sectionRef = useRef(null);
  const intervalRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalRefs.current.forEach(clearInterval);
          const newRefs = labels.map((_, i) => {
            let current = 0;
            return setInterval(() => {
              current += 1;
              setProgressList((prev) => {
                const updated = [...prev];
                updated[i] = current;
                return updated;
              });
              if (current >= 100) {
                clearInterval(intervalRefs.current[i]);
              }
            }, 15 + i * 5); // Staggered speed
          });
          intervalRefs.current = newRefs;
        } else {
          intervalRefs.current.forEach(clearInterval);
          setProgressList(Array(labels.length).fill(0));
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      intervalRefs.current.forEach(clearInterval);
    };
  }, [labels.length]);

  return (
    <section className="commitment-section" ref={sectionRef}>
      <div className="commitment-text">
        <p>{t("text.line1")}</p>
        <p>{t("text.line2")}</p>
      </div>

      <div className="commitment-bars">
        {labels.map((label, index) => (
          <div className="progress-item" key={index}>
            <div className="label">
              <span>{label}</span>
              <span>{progressList[index]}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="fill"
                style={{
                  width: `${progressList[index]}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommitmentSection;

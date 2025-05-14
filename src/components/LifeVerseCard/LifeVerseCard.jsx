import React from "react";
import { motion } from "framer-motion";
import "./LifeVerseCard.css";

const LifeVerseCard = ({ sentences = [], source = "" }) => {
  const safeSentences = Array.isArray(sentences) ? sentences : [];

  return (
    <motion.div
      className="verse-card-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
      <div className="verse-card">
        {safeSentences.map((sentence, index) => (
          <p className="verse-text" key={index}>
            {sentence}
          </p>
        ))}
        {source && <p className="verse-source">{source}</p>}
      </div>
    </motion.div>
  );
};

export default LifeVerseCard;

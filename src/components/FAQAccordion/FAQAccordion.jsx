import { useState } from "react";
import "./FAQAccordion.css";

export default function FAQAccordion({ title, faqList }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">{title}</h2>
      {faqList.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "active" : ""}`}>
          <button
            className="faq-question"
            onClick={() => toggleIndex(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}>
            <span>{item.question}</span>
            <span className="faq-icon">{openIndex === index ? "▲" : "▼"}</span>
          </button>
          <div
            className="faq-answer-wrapper"
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            style={{
              maxHeight: openIndex === index ? "1000px" : "0px",
            }}>
            <div className="faq-answer">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useState } from "react";
import "./ContactForm.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";


function ContactSection() {
  const { t } = useTranslation("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const contactItems = [
    {
      icon: "fas fa-map-marker-alt",
      content: (
        <a
          href="https://www.google.com/maps/search/7+Rue+de+Pfastatt,+68110+illzach,+France"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link-text">
          7 Rue de Pfastatt, 68110 Illzach, France
        </a>
      ),
    },
    {
      icon: "fas fa-envelope",
      content: (
        <a href="mailto:contact@sospalestine.fr" className="contact-link-text">
          contact@sospalestine.fr
        </a>
      ),
    },
    {
      icon: "fas fa-phone",
      content: (
        <span className="phone-links">
          <a href="tel:+33634588276" className="contact-link-text">
            +33 6 34 58 82 76
          </a>
          <span className="separator">/</span>
          <a href="tel:+33951082454" className="contact-link-text">
            +33 9 51 08 24 54
          </a>
          <span className="separator">/</span>
          <a href="tel:+33783255325" className="contact-link-text">
            +33 7 83 25 53 25
          </a>
        </span>
      ),
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/sospalestinefr68/",
      icon: "/images/Social-Media/facebook.png",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sospalestine68/",
      icon: "/images/Social-Media/instagram.png",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@sospalestine1",
      icon: "/images/Social-Media/tik-tok.png",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@sospalestine68?si=9gQftfQfbCE4ROI_",
      icon: "/images/Social-Media/youtube.png",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_ge5l3mx",
        "template_v519yvp",
        templateParams,
        "V0hyNk0EU85FaBFt-"
      )
      .then(
        (response) => {
          setSubmitted(true);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
        }
      );
  };

  const handleNewMessage = () => {
    setFormData({ email: "", message: "" });
    setSubmitted(false);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="contact-container">
      {!submitted ? (
        <div className="contact-content">
          {/* Info Card */}
          <div className="info-card">
            <h3>{t("contact.title")}</h3>
            <ul>
              <li>{t("contact.reasons.learn")}</li>
              <li>{t("contact.reasons.volunteer")}</li>
              <li>{t("contact.reasons.questions")}</li>
              <li>{t("contact.reasons.partner")}</li>
            </ul>

            {/* Contact Information */}
            <div className="contact-info">
              {contactItems.map((item, index) => (
                <div className="contact-detail" key={index}>
                  <i className={item.icon}></i>
                  <div className="contact-detail-content">{item.content}</div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="social-media-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-media-link">
                  <img src={social.icon} alt={social.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="form-card">
            <div className="form-group">
              <label className="label" htmlFor="email">
                {t("contact.form.emailLabel")}
              </label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t("contact.form.emailPlaceholder")}
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="message">
                {t("contact.form.messageLabel")}
              </label>
              <textarea
                className="input"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder={t("contact.form.messagePlaceholder")}></textarea>
            </div>

            <div className="form-actions">
              <button
                className="submit-button"
                type="submit"
                disabled={loading}>
                {loading ? t("contact.form.sending") : t("contact.form.send")}
              </button>
            </div>

            <p className="recaptcha-info">{t("contact.form.recaptcha")}</p>
          </form>
        </div>
      ) : (
        <div className="success-message-wrapper">
          <p className="success-message">{t("contact.success")}</p>

          <div className="form-actions" style={{ marginTop: "2rem" }}>
            <button
              className="submit-button"
              style={{ marginRight: "1rem" }}
              onClick={handleGoHome}>
              {t("contact.goHome")}
            </button>
            <button className="submit-button" onClick={handleNewMessage}>
              {t("contact.newMessage")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ContactSection;

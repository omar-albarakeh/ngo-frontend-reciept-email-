import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./footer.css";

const Footer = () => {
  const { t } = useTranslation("footer");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setUserEmail("");
      } else {
        setMessage(result.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const socialLinks = [
    {
      href: "https://www.facebook.com/sospalestinefr68/",
      src: "/images/Social-Media/facebook.png",
      alt: "Facebook",
    },
    {
      href: "https://www.instagram.com/sospalestine68/",
      src: "/images/Social-Media/instagram.png",
      alt: "Instagram",
    },
    {
      href: "https://www.tiktok.com/@sospalestine1",
      src: "/images/Social-Media/tik-tok.png",
      alt: "TikTok",
    },
    {
      href: "https://www.youtube.com/@sospalestine68",
      src: "/images/Social-Media/youtube.png",
      alt: "YouTube",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column logos">
          <div className="logo-grid">
            {[1, 2].map((n) => (
              <a key={n} href="/accueil">
                <img src={`/images/logo/logo${n}.webp`} alt={`Logo ${n}`} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column contact">
          <h5>{t("footer.contact")}</h5>
          <ul>
            <li>
              <i className="fa fa-map-marker-alt" />
              <a
                href="https://www.google.com/maps/search/7+Rue+de+Pfastatt,+68110+illzach,+France"
                target="_blank"
                rel="noopener noreferrer">
                7 Rue de Pfastatt, 68110 Illzach, France
              </a>
            </li>
            <li>
              <i className="fa fa-envelope" />
              <a href="mailto:contact@sospalestine.fr">
                contact@sospalestine.fr
              </a>
            </li>
          </ul>
          <div className="socials">
            <span>{t("footer.followUs")}</span>
            <div className="icons">
              {socialLinks.map(({ href, src, alt }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src={src} alt={alt} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-column newsletter">
          <h5>{t("footer.newsletter.title")}</h5>
          <p>{t("footer.newsletter.description")}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={t("footer.newsletter.placeholder")}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : t("footer.newsletter.button")}
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
};

export default Footer;

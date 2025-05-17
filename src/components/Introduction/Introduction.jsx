import "./Introduction.css";
import { FaDonate } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import CustomButton from "../customButton/customButton";

const WhoWeAre = () => {
  const { t } = useTranslation("whoweare");

  return (
    <section className="who-we-are" aria-labelledby="who-we-are-title">
      <div className="card">
        <div className="content">
          <div className="text-section">
            <h2 id="who-we-are-title" className="title">
              {t("whoWeAre.title")}
            </h2>
            <p className="highlight">{t("whoWeAre.highlight")}</p>

            <h3>{t("whoWeAre.whatWeDo")}</h3>
            <ul className="bullet-points">
              <li>{t("whoWeAre.bulletPoints.sos")}</li>
              <li>{t("whoWeAre.bulletPoints.zakat")}</li>
              <li>{t("whoWeAre.bulletPoints.eid")}</li>
              <li>{t("whoWeAre.bulletPoints.orphans")}</li>
              <li>{t("whoWeAre.bulletPoints.water")}</li>
              <li>{t("whoWeAre.bulletPoints.ramadan")}</li>
            </ul>

            <h3>{t("whoWeAre.whyItMatters")}</h3>
            <p>{t("whoWeAre.whyItMattersText")}</p>

            <h3>{t("whoWeAre.joinMovement")}</h3>
            <p>{t("whoWeAre.joinMovementText")}</p>

            <CustomButton
              title={t("whoWeAre.donateButton")}
              to="/faire-un-don"
              aria-label={t("whoWeAre.donateButton")}
            />
          </div>

          <div className="image-section">
            <img
              src="/images/WhoWeAre/our_approuch2.png"
              alt="Volunteer helping a child"
            />
            <img
              src="/images/WhoWeAre/our_approuch1.png"
              alt="Group of smiling children"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

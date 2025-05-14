import React, { useState, useEffect } from "react";
import "./ZakatCalculator.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ZAKAT_PERCENTAGE = 2.5;
const NISAB = 7900; // in Euros

const ZakatCalculator = () => {
  const { t } = useTranslation("ZakatCalculator");
  const navigate = useNavigate();

  const [values, setValues] = useState({
    gold: { grams: "", price: 0 },
    silver: { grams: "", price: 0 },
    cashGroup: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/metal-prices`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch prices");
        return res.json();
      })
      .then((data) => {
        setValues((prev) => ({
          ...prev,
          gold: { ...prev.gold, price: data.goldPricePerGram },
          silver: { ...prev.silver, price: data.silverPricePerGram },
        }));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e, category = null, key = null) => {
    const { name, value } = e.target;
    const num = parseFloat(value) || "";
    if (category && key) {
      setValues((prev) => ({
        ...prev,
        [category]: { ...prev[category], [key]: num },
      }));
    } else {
      setValues((prev) => ({ ...prev, [name]: num }));
    }
  };

  const handleDonate = () => {
    localStorage.setItem("donationAmount", zakatDue.toFixed(2));
    localStorage.setItem("donationCause", "zakatAlMaal");
    navigate("/donation");
  };

  const goldValue = (parseFloat(values.gold.grams) || 0) * values.gold.price;
  const silverValue =
    (parseFloat(values.silver.grams) || 0) * values.silver.price;

  const totalZakatable =
    goldValue + silverValue + (parseFloat(values.cashGroup) || 0);

  const zakatDue =
    totalZakatable >= NISAB ? (totalZakatable * ZAKAT_PERCENTAGE) / 100 : 0;

  if (loading) return <p>{t("zakat.loading")}</p>;
  if (error) return <p>{t("zakat.error", { message: error })}</p>;

  return (
    <div className="zakat-container">
      <h2>{t("zakat.title")}</h2>

      <section className="price-info">
        <div className="price-item gold-price">
          <strong>{t("zakat.goldPrice")}:</strong> €
          {values.gold.price.toFixed(2)} / {t("zakat.gram")}
        </div>
        <div className="price-item silver-price">
          <strong>{t("zakat.silverPrice")}:</strong> €
          {values.silver.price.toFixed(2)} / {t("zakat.gram")}
        </div>
      </section>

      <div className="input-section">
        <h3>{t("zakat.preciousMetals")}</h3>
        {["gold", "silver"].map((metal) => {
          const value =
            (parseFloat(values[metal].grams) || 0) * values[metal].price;
          return (
            <div className="metal-group" key={metal}>
              <div className="input-pair">
                <label>
                  {t(`zakat.${metal}`)} ({t("zakat.grams")})
                </label>
                <input
                  type="number"
                  value={values[metal].grams}
                  onChange={(e) => handleChange(e, metal, "grams")}
                  placeholder="Grams"
                />
              </div>
              <div className="input-pair">
                <label>{t("zakat.pricePerGram", { currency: "€" })}</label>
                <input type="number" value={values[metal].price} readOnly />
              </div>
              <div className="input-pair">
                <label>{t("zakat.totalValue", { currency: "€" })}</label>
                <span className="readonly-box">€{value.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="input-section">
        <div className="inline-input">
          <label htmlFor="cashGroup">
            {t("zakat.cashGroupLabel", { currency: "€" })}{" "}
            <span className="note">({t("zakat.cashGroupNote")})</span>
          </label>
          <input
            type="number"
            id="cashGroup"
            name="cashGroup"
            value={values.cashGroup}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="results">
        <p>
          <strong>{t("zakat.totalZakatable")}:</strong> €
          {totalZakatable.toFixed(2)}
        </p>
        <p>
          <strong>{t("zakat.nisabThreshold")}:</strong> €{NISAB}
        </p>
        <p className={zakatDue > 0 ? "zakat-due" : "no-zakat"}>
          {zakatDue > 0
            ? `${t("zakat.zakatDue")}: €${zakatDue.toFixed(2)}`
            : t("zakat.noZakat")}
        </p>
      </div>

      <button className="donate-button" onClick={handleDonate}>
        {t("zakat.donateNow")}
      </button>
    </div>
  );
};

export default ZakatCalculator;

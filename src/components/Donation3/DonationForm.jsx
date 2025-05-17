import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaPaypal,
  FaPlusCircle,
  FaTrash,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";
import "./donations.css";
import { useTranslation } from "react-i18next";
import writtenNumber from "written-number";

const causes = {
  aidAlAdha: "causes.aidAlAdha",
  sosGaza: "causes.sosGaza",
  zakatAlMaal: "causes.zakatAlMaal",
  inGeneral: "causes.inGeneral",
  orphanSponsorship: "causes.orphanSponsorship",
  waterForGaza: "causes.waterForGaza",
  ramadanDonations: "causes.ramadanDonations",
  zakatFitr: "causes.zakatFitr",
};

const DonationForm = ({ onProceedToPayment }) => {
  const [requestReceipt, setRequestReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState({
    name: "",
    surname: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
  });

  const { t } = useTranslation("donations");

  const [causeAmounts, setCauseAmounts] = useState({});
  const [coverFees, setCoverFees] = useState(false);
  // const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const storedAmount = parseFloat(localStorage.getItem("donationAmount"));
    const storedCauseKey = localStorage.getItem("donationCause");

    if (!isNaN(storedAmount) && storedCauseKey) {
      const causeKey = Object.keys(causes).find(
        (key) => key.toLowerCase() === storedCauseKey.toLowerCase()
      );

      if (causeKey) {
        setCauseAmounts((prev) => ({ ...prev, [causeKey]: storedAmount }));
      }

      localStorage.removeItem("donationAmount");
      localStorage.removeItem("donationCause");
    }
  }, []);

  const handleRemoveDonation = (key) => {
    setCauseAmounts((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleCauseAmountChange = (key, value) => {
    const amount = parseFloat(value);
    setCauseAmounts((prev) => ({
      ...prev,
      [key]: isNaN(amount) ? "" : amount,
    }));
  };

  const getDonationCart = () =>
    Object.entries(causeAmounts)
      .filter(([_, value]) => value > 0)
      .map(([key, amount]) => ({
        causeKey: key,
        causeLabel: t(causes[key]),
        amount,
      }));

  const calculateTotal = () => {
    const subtotal = getDonationCart().reduce(
      (sum, item) => sum + item.amount,
      0
    );
    return coverFees ? subtotal + subtotal * 0.029 + 0.3 : subtotal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cart = getDonationCart();

    if (cart.length === 0) {
      setFormError(t("donationForm.errors.noDonation"));
      return;
    }

    if (cart.some((item) => item.amount < 0.1)) {
      setFormError(t("donationForm.errors.minDonation"));
      return;
    }

    setFormError("");
    onProceedToPayment({
      donationCart: cart,
      total: calculateTotal(),
      coverFees,
      requestReceipt,
      receiptData,
    });
  };

  const handleReceiptChange = (e) => {
    const { name, value } = e.target;
    setReceiptData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <div className="tax-tip-boxB">
        <h3>{t("taxTipTitle")}</h3>
        <p>
          {t("taxReduction")} <strong>{t("taxReductionPercentage")}</strong>,{" "}
          {t("taxReductionLimit")}
        </p>
        <p>{t("example")}</p>
        <p className="tax-tip-note">
          {t("reportText")} <strong>{t("form")}</strong> {t("claimText")}
          <a
            href="https://www.impots.gouv.fr/portail/"
            target="_blank"
            rel="noopener noreferrer">
            {t("frenchTaxWebsite")}
          </a>
        </p>
      </div>

      {formError && <div className="form-error">{formError}</div>}

      <div className="donation-grid">
        <div className="donation-inputs">
          {Object.entries(causes).map(([key, labelKey]) => (
            <div key={key} className="cause-grid-row">
              <div className="cause-col-title">{t(labelKey)}</div>
              <div className="custom-amount-inline">
                <input
                  type="number"
                  id={`custom-${key}`}
                  min="0"
                  placeholder="€"
                  step="0.01"
                  value={causeAmounts[key] || ""}
                  onChange={(e) => handleCauseAmountChange(key, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="donation-summary">
          <h4>{t("donationForm.summary")}</h4>
          <ul>
            {getDonationCart().map((d, i) => (
              <li key={i} className="summary-item">
                <span>{d.causeLabel}</span>
                <span>€{d.amount.toFixed(2)}</span>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveDonation(d.causeKey)}
                  title={t("donationForm.removeDonation")}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>

          <div className="total-row">
            <span>{t("donationForm.total")}:</span>
            <span>€{calculateTotal().toFixed(2)}</span>
          </div>

          {/* <div className="email-input">
            <label htmlFor="donor-email">{t("donationForm.emailLabel")}</label>
            <input
              type="email"
              id="donor-email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div> */}

          <label className="cover-fees">
            <input
              type="checkbox"
              checked={coverFees}
              onChange={() => setCoverFees(!coverFees)}
            />
            {t("donationForm.coverFees")}
          </label>

          <div className="receipt-toggle">
            <label>
              <input
                type="checkbox"
                checked={requestReceipt}
                onChange={() => setRequestReceipt(!requestReceipt)}
              />
              {t("donationForm.requestReceipt")}
            </label>
          </div>

          {requestReceipt && (
            <div className="receipt-form">
              <h4>{t("donationForm.receiptTitle")}</h4>
              <input
                type="text"
                name="name"
                placeholder={t("donationForm.name")}
                value={receiptData.name}
                onChange={handleReceiptChange}
                required
              />
              <input
                type="text"
                name="surname"
                placeholder={t("donationForm.surname")}
                value={receiptData.surname}
                onChange={handleReceiptChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t("donationForm.emailLabel") || "Email"}
                value={receiptData.email}
                onChange={handleReceiptChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder={t("donationForm.address")}
                value={receiptData.address}
                onChange={handleReceiptChange}
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder={t("donationForm.postalCode")}
                value={receiptData.postalCode}
                onChange={handleReceiptChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder={t("donationForm.city")}
                value={receiptData.city}
                onChange={handleReceiptChange}
                required
              />
            </div>
          )}

          <button type="submit" className="payment-btn paypal">
            <FaPaypal /> {t("donationForm.proceed")}
          </button>

          {coverFees && <p className="fee-note">{t("donationForm.feeNote")}</p>}
        </div>
      </div>
    </form>
  );
};

const PayPalPaymentPage = ({ donationData, onBackToDonation }) => {
  const paypalContainerRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [retryCount, setRetryCount] = useState(0);
  const paypalButtons = useRef(null);
  const isMounted = useRef(true);
  const { t } = useTranslation("donations");

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    isMounted.current = true;
    setLoading(true);
    loadPayPalSDK();

    return () => {
      isMounted.current = false;
      cleanupPayPal();
    };
  }, [retryCount]);

  const loadPayPalSDK = async () => {
    try {
      const res = await fetch(`${backendUrl}/config/paypal`);
      const { clientId } = await res.json();

      // Remove existing PayPal SDK
      document
        .querySelectorAll('script[src*="paypal.com/sdk/js"]')
        .forEach((el) => el.remove());

      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&enable-funding=card&disable-funding=paylater&components=buttons`;
      script.async = true;

      script.onload = () => {
        if (isMounted.current) {
          setSdkReady(true);
          setErrorMessage(null);
          setLoading(false);
        }
      };

      script.onerror = () => {
        if (isMounted.current) {
          setErrorMessage("Failed to load PayPal SDK. Please try again.");
          setLoading(false);
        }
      };

      document.body.appendChild(script);
    } catch (err) {
      if (isMounted.current) {
        setErrorMessage("Failed to fetch PayPal configuration");
        setLoading(false);
      }
    }
  };
  const getAmountInWords = (amount) => {
    writtenNumber.defaults.lang = "fr";
    return writtenNumber(Math.floor(amount)) + " euros";
  };
  const cleanupPayPal = () => {
    try {
      if (paypalContainerRef.current) {
        paypalContainerRef.current.innerHTML = "";
      }
      paypalButtons.current = null;
    } catch (e) {
      console.error("PayPal buttons cleanup error:", e);
    }
  };

  const handlePaymentSuccess = async (details) => {
    const payer = details.payer;
    const purchase = details.purchase_units[0];
    const transactionId = details.id;
    const amount = parseFloat(purchase.amount.value);

    setPaymentStatus("success");
    setPaymentDetails({
      name: `${payer.name?.given_name || ""} ${
        payer.name?.surname || ""
      }`.trim(),
      email: payer.email_address,
      transactionId,
      amount,
      currency: purchase.amount.currency_code,
    });
    setCountdown(20);

    // Prepare receipt payload
    const receiptPayload = {
      name: donationData?.receiptData?.name || payer.name?.given_name || "",
      surname: donationData?.receiptData?.surname || payer.name?.surname || "",
      email: payer.email_address,
      amount: amount,
      ...(donationData?.requestReceipt && {
        address: donationData?.receiptData?.address || "",
        postalCode: donationData?.receiptData?.postalCode || "",
        city: donationData?.receiptData?.city || "",
        amountText:
          donationData?.receiptData?.amountText || getAmountInWords(amount),
      }),
    };

    try {
      const response = await fetch(
        `${backendUrl}/generate-receipt-or-thankyou`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(receiptPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate receipt");
      }

      console.log("Receipt processing successful");
    } catch (err) {
      console.error("Receipt error:", err);
      // Optional: Show user-friendly error message
    }
  };

  useEffect(() => {
    if (!sdkReady || !window.paypal || !isMounted.current) return;

    const container = paypalContainerRef.current;
    if (!container || !container.isConnected) return;

    cleanupPayPal();

    try {
      paypalButtons.current = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "checkout",
        },
        createOrder: (data, actions) => {
          const items = donationData.donationCart.map((item) => ({
            name: item.causeLabel,
            unit_amount: {
              currency_code: "EUR",
              value: item.amount.toFixed(2),
            },
            quantity: "1",
          }));

          const itemTotal = donationData.donationCart
            .reduce((sum, item) => sum + item.amount, 0)
            .toFixed(2);

          const fee = donationData.coverFees
            ? parseFloat(itemTotal) * 0.029 + 0.3
            : 0;
          const grandTotal = (parseFloat(itemTotal) + fee).toFixed(2);

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: grandTotal,
                  currency_code: "EUR",
                  breakdown: {
                    item_total: { value: itemTotal, currency_code: "EUR" },
                    handling: { value: fee.toFixed(2), currency_code: "EUR" },
                  },
                },
                items,
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
            },
          });
        },
        onApprove: async (data, actions) => {
          try {
            const details = await actions.order.capture();
            await handlePaymentSuccess(details);
          } catch (err) {
            setPaymentStatus("error");
            setErrorMessage("Payment failed: " + err.message);
          }
        },
      });

      if (paypalButtons.current?.isEligible()) {
        paypalButtons.current.render(container);
      } else {
        setErrorMessage("PayPal is not available in your region");
        setLoading(false);
      }
    } catch (err) {
      setErrorMessage("Failed to initialize PayPal");
      setLoading(false);
    }
  }, [sdkReady, donationData]);

  // Countdown effect remains the same
  useEffect(() => {
    if (paymentStatus === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onBackToDonation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentStatus, onBackToDonation]);

  const handleRetry = () => {
    cleanupPayPal();
    setSdkReady(false);
    setErrorMessage(null);
    setPaymentStatus(null);
    setLoading(true);
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div className="payment-container">
      <button onClick={onBackToDonation} className="back-button">
        <FaArrowLeft /> {t("paypal.backToDonation")}
      </button>

      <h1>{t("paypal.completeDonation")}</h1>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
          <button
            onClick={handleRetry}
            className="retry-button"
            disabled={loading}>
            {loading ? t("paypal.retrying") : t("paypal.tryAgain")}
          </button>
        </div>
      )}

      <div className="payment-summary">
        <h3>{t("paypal.yourDonation")}:</h3>
        <ul>
          {donationData?.donationCart?.map((item, index) => (
            <li key={index}>
              <span>{item.causeLabel}:</span>
              <span>€{item.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="total-row">
          <span>{t("paypal.total")}:</span>
          <span>€{donationData?.total?.toFixed(2) || "0.00"}</span>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <FaSpinner className="spinner" />
          <p>{t("paypal.settingUpPayment")}</p>
        </div>
      )}

      <div ref={paypalContainerRef} className="paypal-buttons-container" />

      {paymentStatus === "success" && paymentDetails && (
        <div className="success-message">
          <p>
            <strong>
              {t("paypal.thankYou", { name: paymentDetails.name })}
            </strong>
          </p>
          <p>
            {t("paypal.amountPaid")}: €{paymentDetails.amount}
          </p>
          <p>
            {t("paypal.transactionId")}: {paymentDetails.transactionId}
          </p>
          <p>
            {donationData.requestReceipt
              ? t("paypal.receiptSent")
              : t("paypal.thankYouSent")}
          </p>
          <p className="countdown-message">
            {t("paypal.redirecting", { seconds: countdown })}
          </p>
        </div>
      )}
    </div>
  );
};

//Donation
const DonationFlow = () => {
  const [currentStep, setCurrentStep] = useState("form");
  const [donationData, setDonationData] = useState(null);
  const paypalSectionRef = useRef(null);

  const handleProceedToPayment = (data) => {
    setDonationData(data);
    setCurrentStep("payment");
  };

  const handleBackToDonation = () => {
    setCurrentStep("form");
  };
  useEffect(() => {
    if (currentStep === "payment" && paypalSectionRef.current) {
      // Scroll to PayPal payment page with smooth behavior
      paypalSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentStep]);
  return (
    <div className="donation-flow">
      {currentStep === "form" ? (
        <DonationForm onProceedToPayment={handleProceedToPayment} />
      ) : (
        <div ref={paypalSectionRef}>
          {/* This is where you want the page to scroll to */}
          <PayPalPaymentPage
            donationData={donationData}
            onBackToDonation={handleBackToDonation}
          />
        </div>
      )}
    </div>
  );
};

export default DonationFlow;

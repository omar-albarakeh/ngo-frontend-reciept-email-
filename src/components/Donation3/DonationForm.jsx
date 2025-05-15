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
    const backendUrl2 =
      import.meta.env.VITE_BACKEND_URL2 || "http://localhost:5001";

  const amount = donationData?.total?.toFixed(2) || "0.00";
  const cause =
    donationData?.donationCart?.[0]?.causeLabel || t("paypal.generalDonation");
  const downloadPdfReceipt = async ({
    backendUrl,
    donationData,
    transactionId,
  }) => {
    try {
      const totalInWords = writtenNumber(Math.floor(donationData.total), {
        lang: "fr",
      });
      const response = await fetch(
        `${backendUrl}/generate-receipt-or-thankyou`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiptData: donationData.receiptData,
            donationCart: donationData.donationCart,
            total: donationData.total,
            totalInWords,
            transactionId,
            paymentDate: new Date().toISOString(),
          }),
        }
      );

      const data = await response.json();
      if (data.pdfBase64) {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${data.pdfBase64}`;
        link.download = "donation-receipt.pdf";
        link.click();
        console.debug("PDF receipt downloaded.");
      } else {
        console.warn("PDF receipt not generated.");
      }
    } catch (err) {
      console.error("Error generating PDF receipt:", err);
    }
  };

  // Countdown
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

  const loadPayPalSDK = async () => {
    try {
      console.debug("Fetching PayPal config...");
      const res = await fetch(`${backendUrl}/config/paypal`);
      const { clientId } = await res.json();
      console.debug("PayPal client ID received:", clientId);

      // Remove existing PayPal SDK
      document
        .querySelectorAll('script[src*="paypal.com/sdk/js"]')
        .forEach((el) => el.remove());

      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&enable-funding=card&disable-funding=paylater&components=buttons`;
      script.async = true;

      script.onload = () => {
        console.debug("PayPal SDK script loaded.");
        if (isMounted.current) {
          setSdkReady(true);
          setErrorMessage(null);
          setLoading(false);
        }
      };

      script.onerror = () => {
        console.error("PayPal SDK failed to load.");
        if (isMounted.current) {
          setErrorMessage("Failed to load PayPal SDK. Please try again.");
          setLoading(false);
        }
      };

      document.body.appendChild(script);
    } catch (err) {
      console.error("Error fetching PayPal client ID:", err);
      if (isMounted.current) {
        setErrorMessage("Failed to fetch PayPal configuration");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    setLoading(true);
    console.debug("Initiating PayPal SDK load...");
    loadPayPalSDK();

    return () => {
      isMounted.current = false;

      try {
        if (paypalContainerRef.current) {
          paypalContainerRef.current.innerHTML = "";
        }
        paypalButtons.current = null;
      } catch (e) {
        console.debug("PayPal buttons cleanup error:", e);
      }
    };
  }, [retryCount]);

  useEffect(() => {
    if (!sdkReady || !window.paypal || !isMounted.current) {
      console.debug("PayPal SDK not ready or component unmounted.");
      return;
    }

    const container = paypalContainerRef.current;
    if (!container || !container.isConnected) {
      console.debug("PayPal container not connected or missing.");
      return;
    }

    // Cleanup previous
    if (paypalButtons.current) {
      try {
        paypalButtons.current.close();
      } catch (e) {
        console.debug("Error closing previous PayPal buttons:", e);
      }
      container.innerHTML = "";
    }

    console.debug("Creating PayPal Buttons instance...");
    try {
      paypalButtons.current = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "checkout",
        },
        createOrder: (data, actions) => {
          console.debug("Creating order with donation data:", donationData);

          const items = donationData.donationCart.map((item) => ({
            name: item.causeLabel,
            unit_amount: {
              currency_code: "EUR",
              value: item.amount.toFixed(2),
            },
            quantity: "1",
            description: `Donation to ${item.causeLabel}`,
          }));

          const itemTotal = donationData.donationCart
            .reduce((sum, item) => sum + item.amount, 0)
            .toFixed(2);

          const totalAmount = parseFloat(itemTotal);
          const fee = donationData.coverFees ? totalAmount * 0.029 + 0.3 : 0;
          const grandTotal = (totalAmount + fee).toFixed(2);

          console.debug("Order total:", grandTotal);

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: grandTotal,
                  currency_code: "EUR",
                  breakdown: {
                    item_total: {
                      value: itemTotal,
                      currency_code: "EUR",
                    },
                    handling: {
                      value: fee.toFixed(2),
                      currency_code: "EUR",
                    },
                  },
                },
                description: `Donation to ${cause}`,
                items: items,
                custom_id: "DONATION_" + Date.now(),
                invoice_id: "INV-" + Math.random().toString(36).substring(2, 9),
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              brand_name: "SOS ",
            },
          });
        },
        onApprove: async (data, actions) => {
          console.debug("Payment approved, capturing order...");

          try {
            const details = await actions.order.capture();
            console.debug("Payment details:", details);

            const name = details.payer.name?.given_name || "Donor";
            const amountPaid = details.purchase_units[0].amount.value;
            const transactionId = details.id;
            const donorEmail = details.payer.email_address;

            setPaymentStatus("success");
            setPaymentDetails({
              name,
              amount: amountPaid,
              email: donorEmail,
              transactionId,
            });
            setCountdown(20);

            // Handle backend receipt/thank-you email
            if (donationData?.requestReceipt || donationData?.requestThankYou) {
              console.debug("Calling /generate-receipt-or-thankyou...");
              try {
                const receiptPayload = {
                  name: donationData?.receiptData?.name || name,
                  surname: donationData?.receiptData?.surname || "",
                  address: donationData?.receiptData?.address || "",
                  postalCode: donationData?.receiptData?.postalCode || "",
                  city: donationData?.receiptData?.city || "",
                  amount: amountPaid,
                  amountText: donationData?.receiptData?.amountText || "",
                  email: donorEmail,
                };

                const receiptRes = await fetch(
                  `${backendUrl2}/generate-receipt-or-thankyou`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(receiptPayload),
                  }
                );

                const receiptJson = await receiptRes.json();

                if (receiptRes.ok) {
                  console.debug("Backend response:", receiptJson.message);
                  alert("📧 Email envoyé avec succès !");
                } else {
                  console.error("Receipt endpoint error:", receiptJson.error);
                }
              } catch (receiptErr) {
                console.error(
                  "Error calling /generate-receipt-or-thankyou:",
                  receiptErr
                );
              }
            }
          } catch (err) {
            console.error("Order capture failed:", err);
            setPaymentStatus("error");
            setErrorMessage("Payment failed: " + err.message);
          }
        },
      });

      if (paypalButtons.current && paypalButtons.current.isEligible()) {
        console.debug("Rendering PayPal buttons...");
        paypalButtons.current.render(container).catch((err) => {
          if (
            !err.message.includes("container element removed") &&
            !err.message.includes("zoid destroyed")
          ) {
            console.error("PayPal render error:", err);
            console.debug("PayPal container state:", container);
            setErrorMessage("Failed to initialize payment buttons");
          }
        });
      } else {
        console.debug("PayPal buttons not eligible for this environment.");
        setErrorMessage("PayPal is not available in your region or browser");
        setLoading(false);
      }
    } catch (err) {
      console.error("Unexpected error initializing PayPal:", err);
      setErrorMessage("Failed to initialize PayPal");
      setLoading(false);
    }

    return () => {
      if (paypalButtons.current) {
        try {
          paypalButtons.current.close();
        } catch (e) {
          console.debug("PayPal buttons cleanup error:", e);
        }
      }
    };
  }, [sdkReady, amount, cause, donationData]);

  const calculateNetAmount = (gross) => {
    const amt = parseFloat(gross);
    if (isNaN(amt)) return "0.00";
    const fee = amt * 0.029 + 0.3;
    return (amt - fee).toFixed(2);
  };

  const handleRetry = () => {
    console.debug("Retrying PayPal initialization...");
    if (paypalContainerRef.current) {
      paypalContainerRef.current.innerHTML = "";
    }
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
          <span>€{amount}</span>
        </div>
        {donationData?.coverFees && (
          <p className="fee-note">
            {t("paypal.includedFees", {
              fee: (parseFloat(amount) * 0.029 + 0.3).toFixed(2),
            })}
          </p>
        )}
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
            {t("paypal.netReceived")}: €
            {calculateNetAmount(paymentDetails.amount)}
          </p>
          <p>
            {t("paypal.transactionId")}: {paymentDetails.transactionId}
          </p>
          <p>{t("paypal.receiptSent")}</p>
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

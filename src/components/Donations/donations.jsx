import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaPaypal,
  FaPlusCircle,
  FaTrash,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";
import emailjs from "emailjs-com";
import "./donations.css";

const causes = {
  sosGaza: "SOS Gaza",
  zakatAlMaal: "Zakat Al Maal",
  ramadan2025: "Ramadan 2025",
  GazzaEmergency: "Gazza Emergency",
  aidAlAdha: "Aid-al-Adha",
  orphanSponsorship: "Orphan Sponsorship",
  waterForGaza: "Water For Gaza",
  ramadanDonations: "Ramadan Donations",
};

const presetAmounts = [20, 50, 100];

const DonationForm = ({ onProceedToPayment }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCause, setSelectedCause] = useState("");
  const [donationCart, setDonationCart] = useState([]);
  const [coverFees, setCoverFees] = useState(false);
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  const handleAddDonation = () => {
    const amount =
      selectedAmount === "other" ? parseFloat(customAmount) : selectedAmount;

    if (!amount || !selectedCause) {
      setFormError("Please enter amount and select a cause.");
      return;
    }

    setDonationCart([
      ...donationCart,
      {
        causeKey: selectedCause,
        causeLabel: causes[selectedCause],
        amount,
      },
    ]);
    setSelectedAmount(null);
    setCustomAmount("");
    setSelectedCause("");
    setFormError("");
  };

  const handleRemoveDonation = (index) => {
    const updated = [...donationCart];
    updated.splice(index, 1);
    setDonationCart(updated);
    setFormError("");
  };

  const calculateTotal = () => {
    const baseTotal = donationCart.reduce((sum, d) => sum + d.amount, 0);
    if (coverFees) {
      const fee = baseTotal * 0.029 + 0.3;
      return baseTotal + fee;
    }
    return baseTotal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (donationCart.length === 0) {
      setFormError(
        "Your donation summary is empty. Please add a donation before proceeding."
      );
      return;
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError("");
    onProceedToPayment({
      donationCart,
      total: calculateTotal(),
      coverFees,
      email,
    });
  };

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <h2>Your Gift Makes a Real Difference</h2>
      <p className="subtitle">
        Help provide urgent aid and lasting support to those in need. Choose a
        cause and donate today.
      </p>

      {formError && <div className="form-error">{formError}</div>}

      <div className="amount-section">
        {presetAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            className={`amount-btn ${selectedAmount === amt ? "active" : ""}`}
            onClick={() => setSelectedAmount(amt)}>
            €{amt}
          </button>
        ))}
        <button
          type="button"
          className={`amount-btn ${selectedAmount === "other" ? "active" : ""}`}
          onClick={() => setSelectedAmount("other")}>
          Other
        </button>
      </div>

      {selectedAmount === "other" && (
        <input
          type="number"
          placeholder="Enter an amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="custom-input"
          min="1"
        />
      )}

      <select
        value={selectedCause}
        onChange={(e) => setSelectedCause(e.target.value)}
        className="cause-select">
        <option value="">-- Select a Cause --</option>
        {Object.entries(causes).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="add-btn"
        onClick={handleAddDonation}
        disabled={!selectedCause || (!selectedAmount && !customAmount)}>
        <FaPlusCircle /> Add Donation
      </button>

      {donationCart.length > 0 && (
        <div className="donation-summary">
          <h4>Donation Summary</h4>
          <ul>
            {donationCart.map((d, i) => (
              <li key={i}>
                {d.causeLabel} - €{d.amount.toFixed(2)}
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveDonation(i)}
                  type="button">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="total-row">
            <span>Total:</span>
            <span>€{calculateTotal().toFixed(2)}</span>
          </div>
          {coverFees && <p className="fee-note">Includes processing fees</p>}
          <div className="email-input">
            <label htmlFor="donor-email">Email (optional, for receipt):</label>
            <input
              type="email"
              id="donor-email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      )}

      <label className="cover-fees">
        <input
          type="checkbox"
          checked={coverFees}
          onChange={() => setCoverFees(!coverFees)}
        />
        I want to cover the processing fees so 100% of my donation goes to the
        cause.
      </label>

      <button type="submit" className="payment-btn paypal">
        <FaPaypal /> Proceed to Payment
      </button>
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
  const [emailConfig, setEmailConfig] = useState({});
  const [countdown, setCountdown] = useState(3);
  const [retryCount, setRetryCount] = useState(0);
  const paypalButtons = useRef(null);
  const isMounted = useRef(true);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const amount = donationData?.total?.toFixed(2) || "0.00";
  const cause =
    donationData?.donationCart?.[0]?.causeLabel || "General Donation";
  const donorEmail = donationData?.email || "no-email@example.com";

  // Load email config
  useEffect(() => {
    fetch(`${backendUrl}/config/emailjs`)
      .then((res) => res.json())
      .then(setEmailConfig)
      .catch((err) => console.error("Failed to load EmailJS config", err));
  }, [backendUrl]);

  // Countdown timer for success message
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

  const loadPayPalSDK = useCallback(async () => {
    try {
      const res = await fetch(`${backendUrl}/config/paypal`);
      const { clientId } = await res.json();

      // Remove any existing PayPal script
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
  }, [backendUrl]);

  // Load PayPal SDK
  useEffect(() => {
    isMounted.current = true;
    setLoading(true);
    loadPayPalSDK();

    return () => {
      isMounted.current = false;
      if (paypalButtons.current) {
        try {
          paypalButtons.current.close();
        } catch (e) {
          console.debug("PayPal buttons cleanup error:", e);
        }
      }
    };
  }, [loadPayPalSDK, retryCount]);

  // Render PayPal buttons
  useEffect(() => {
    if (!sdkReady || !window.paypal || !isMounted.current) return;

    const container = paypalContainerRef.current;
    if (!container || !container.isConnected) return;

    try {
      paypalButtons.current = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "checkout",
        },
        createOrder: (data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: "EUR",
                  breakdown: {
                    item_total: {
                      value: amount,
                      currency_code: "EUR",
                    },
                  },
                },
                description: `Donation to ${cause}`,
              },
            ],
          }),
        onApprove: async (data, actions) => {
          try {
            const details = await actions.order.capture();
            const name = details.payer.name?.given_name || "Donor";
            const amountPaid = details.purchase_units[0].amount.value;
            const transactionId = details.id;

            setPaymentStatus("success");
            setPaymentDetails({
              name,
              amount: amountPaid,
              email: donorEmail,
              transactionId,
            });
            setCountdown(20);

            if (
              emailConfig.serviceId &&
              emailConfig.templateId &&
              emailConfig.publicKey
            ) {
              const donationDetails = donationData.donationCart
                .map(
                  (item) =>
                    `<li>${item.causeLabel}: €${item.amount.toFixed(2)}</li>`
                )
                .join("");

              const emailData = {
                to_email: donorEmail,
                display_email: donorEmail,
                from_name: "Your Organization Name",
                from_email: "noreply@yourorganization.org",
                reply_to: "donations@yourorganization.org",
                amount: `€${amountPaid}`,
                cause: cause,
                title: `Your Donation Receipt: €${amountPaid}`,
                donation_details: `
                  <h3>Donation Summary</h3>
                  <ul>${donationDetails}</ul>
                  <p><strong>Total: €${amountPaid}</strong></p>
                  ${
                    donationData.coverFees
                      ? `<p>Includes processing fees: €${(
                          parseFloat(amountPaid) * 0.029 +
                          0.3
                        ).toFixed(2)}</p>`
                      : ""
                  }
                  <p>Transaction ID: ${transactionId}</p>
                  <p>Date: ${new Date().toLocaleDateString()}</p>
                `,
                organization_name: "Your Organization Name",
                organization_address: "123 Charity St, City, Country",
                tax_id: "TAX-ID-12345",
                thank_you_message:
                  "Thank you for your generous support! Your donation will help us continue our important work.",
              };

              // Only send receipt if email was provided
              if (donorEmail !== "no-email@example.com") {
                await emailjs.send(
                  emailConfig.serviceId,
                  emailConfig.templateId,
                  emailData,
                  emailConfig.publicKey
                );
              }

              // Always send admin notification
              await emailjs.send(
                emailConfig.serviceId,
                emailConfig.templateId,
                {
                  ...emailData,
                  to_email: "omaralbarakeh2@gmail.com",
                  title: `New Donation Received: €${amountPaid}`,
                },
                emailConfig.publicKey
              );
            }
          } catch (err) {
            setPaymentStatus("error");
            setErrorMessage("Payment failed: " + err.message);
          }
        },
        onCancel: () => {
          setPaymentStatus("canceled");
          setErrorMessage("Payment was canceled");
        },
        onError: (err) => {
          setPaymentStatus("error");
          setErrorMessage("Payment error: " + err.message);
        },
      });

      if (paypalButtons.current && paypalButtons.current.isEligible()) {
        paypalButtons.current.render(container).catch((err) => {
          if (
            !err.message.includes("container element removed") &&
            !err.message.includes("zoid destroyed")
          ) {
            console.error("PayPal render error:", err);
            setErrorMessage("Failed to initialize payment buttons");
          }
        });
      } else {
        setErrorMessage("PayPal is not available in your region or browser");
        setLoading(false);
      }
    } catch (err) {
      console.error("PayPal initialization error:", err);
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
  }, [sdkReady, amount, cause, emailConfig, donationData, donorEmail]);

  const calculateNetAmount = (gross) => {
    const amt = parseFloat(gross);
    if (isNaN(amt)) return "0.00";
    const fee = amt * 0.029 + 0.3;
    return (amt - fee).toFixed(2);
  };

  const handleRetry = useCallback(() => {
    // Clear the container
    if (paypalContainerRef.current) {
      paypalContainerRef.current.innerHTML = "";
    }

    // Reset states
    setSdkReady(false);
    setErrorMessage(null);
    setPaymentStatus(null);
    setLoading(true);

    // Increment retry count to trigger useEffect
    setRetryCount((prev) => prev + 1);
  }, []);

  return (
    <div className="payment-container">
      <button onClick={onBackToDonation} className="back-button">
        <FaArrowLeft /> Back to donation form
      </button>

      <h1>Complete Your Donation</h1>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
          <button
            onClick={handleRetry}
            className="retry-button"
            disabled={loading}>
            {loading ? "Retrying..." : "Try Again"}
          </button>
        </div>
      )}

      <div className="payment-summary">
        <h3>Your Donation:</h3>
        <ul>
          {donationData?.donationCart?.map((item, index) => (
            <li key={index}>
              <span>{item.causeLabel}:</span>
              <span>€{item.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="total-row">
          <span>Total:</span>
          <span>€{amount}</span>
        </div>
        {donationData?.coverFees && (
          <p className="fee-note">
            Includes €{(parseFloat(amount) * 0.029 + 0.3).toFixed(2)} processing
            fees
          </p>
        )}
      </div>

      {loading && (
        <div className="loading-overlay">
          <FaSpinner className="spinner" />
          <p>Setting up secure payment...</p>
        </div>
      )}

      <div ref={paypalContainerRef} className="paypal-buttons-container" />

      {paymentStatus === "success" && paymentDetails && (
        <div className="success-message">
          <p>
            <strong>Thank you, {paymentDetails.name}!</strong>
          </p>
          <p>Amount: €{paymentDetails.amount}</p>
          <p>Net received: €{calculateNetAmount(paymentDetails.amount)}</p>
          <p>Transaction ID: {paymentDetails.transactionId}</p>
          {paymentDetails.email !== "no-email@example.com" && (
            <p>A receipt has been sent to {paymentDetails.email}</p>
          )}
          <p className="countdown-message">
            Returning to donation form in {countdown} seconds...
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

  const handleProceedToPayment = (data) => {
    setDonationData(data);
    setCurrentStep("payment");
  };

  const handleBackToDonation = () => {
    setCurrentStep("form");
  };

  return (
    <div className="donation-flow">
      {currentStep === "form" ? (
        <DonationForm onProceedToPayment={handleProceedToPayment} />
      ) : (
        <PayPalPaymentPage
          donationData={donationData}
          onBackToDonation={handleBackToDonation}
        />
      )}
    </div>
  );
};

export default DonationFlow;

// Example React fetch call (useEffect + fetch)
import { useEffect, useState } from "react";

function MetalPrices() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/metal-prices")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch prices");
        return res.json();
      })
      .then((data) => {
        setPrices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading prices...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Metal Prices</h2>
      <p>Gold: ${prices.goldPricePerGram.toFixed(2)} per gram</p>
      <p>Silver: ${prices.silverPricePerGram.toFixed(2)} per gram</p>
    </div>
  );
}

export default MetalPrices;

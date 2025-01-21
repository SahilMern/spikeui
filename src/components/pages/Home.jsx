import { useState, useEffect } from "react";
import "./home.css"; // Importing CSS file
import { Link } from "react-router-dom";
function Home() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prices, setPrices] = useState(null);

  // Fetch latest prices when the component is mounted
  const fetchPrices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/bot/getPrices");
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.sethighdeod && data.data.setlowdeodprice) {
          setPrices(data.data);
        } else {
          setPrices(null); // No prices found
        }
      } else {
        setError("Failed to fetch prices.");
      }
    } catch (error) {
      console.log(error);
      
      setError("Error fetching prices.");
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input1 || !input2) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    const data = {
      sethighdeod: input1,
      setlowdeodprice: input2,
    };

    try {
      const response = await fetch("http://localhost:3000/api/bot/setPrice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Price data added successfully");
        setInput1("");
        setInput2("");
        fetchPrices(); // Fetch updated prices
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error occurred while adding price.");
      }
    } catch (error) {
      console.log(error);
      
      setError("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {prices ? (
        <div className="price-container">
          <h3>Latest Prices</h3>
          <div className="price-display">
            <p>
              <strong>High Price:</strong> {prices.sethighdeod}
            </p>
            <p>
              <strong>Low Price:</strong> {prices.setlowdeodprice}
            </p>
          </div>
          <Link to="/updateDeodprice">
            <button type="button" className="update-button">
              Update Price
            </button>
          </Link>
        </div>
      ) : (
        <div className="form-container">
          <h2>Set Price</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Deod High Price</label>
              <input
                type="number"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Deod Low Price</label>
              <input
                type="number"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;

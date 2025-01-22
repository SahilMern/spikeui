import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import "./updatedeod.css"; // Add CSS for styling
import { getPrice, setprice } from "../../helper/BackendUrl";

const UpdateDeodprice = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prices, setPrices] = useState(null);

  const navigate = useNavigate(); // useNavigate for redirecting

  // Fetch the current prices when the component is mounted
  const fetchPrices = async () => {
    try {
      const response = await fetch(`${getPrice}`);
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.sethighdeod && data.data.setlowdeodprice) {
          setPrices(data.data);
          setInput1(data.data.sethighdeod);
          setInput2(data.data.setlowdeodprice);
        } else {
          setPrices(null);
        }
      } else {
        setError("Failed to fetch prices.");
      }
    } catch (error) {
      console.log(error, "error");
      
      setError("Error fetching prices.");
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleUpdatePrice = async (e) => {
    e.preventDefault();

    if (!input1 || !input2) {
      setError("Both fields are required.");
      return;
    }

    const updatedPrice = {
      sethighdeod: input1,
      setlowdeodprice: input2,
    };

    try {
      setLoading(true);
      const response = await fetch(`${setprice}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPrice),
      });

      if (response.ok) {
        alert("Price updated successfully!");
        navigate("/"); // Redirect to homepage after successful update
      } else {
        setError("Failed to update prices.");
      }
    } catch (error) {
      console.log(error);
      
      setError("Error updating prices.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-deodprice-container">
      {prices ? (
        <div className="update-form">
          <h2>Update Prices</h2>
          <form onSubmit={handleUpdatePrice}>
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
              {loading ? "Updating..." : "Update Price"}
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UpdateDeodprice;

import { useState, useEffect } from "react";
import "./BotPage.css"; // Import the custom CSS for styling
import { botStatus, startBot, stopBot } from "../../helper/BackendUrl"; // Assuming correct paths

const BotPage = () => {
  const [isBotRunning, setIsBotRunning] = useState(false);

  // Function to check bot status
  const fetchBotStatus = async () => {
    try {
      const response = await fetch(`${botStatus}`);
      const data = await response.json();
      
      if (data.botStatus.status) {
        setIsBotRunning(true);
      } else {
        setIsBotRunning(false);
      }
    } catch (error) {
      console.log("Error fetching bot status:", error);
    }
  };

  // Fetch the bot status when the component mounts
  useEffect(() => {
    fetchBotStatus();
  }, []);

  // Start the bot
  const startBotHandler = async () => {
    try {
      const response = await fetch(`${startBot}`, {
        method: "POST",
      });
      if (response.ok) {
        setIsBotRunning(true);
      }
    } catch (error) {
      console.log("Error starting bot:", error);
    }
  };

  // Stop the bot
  const stopBotHandler = async () => {
    try {
      const response = await fetch(`${stopBot}`, {
        method: "POST",
      });
      if (response.ok) {
        setIsBotRunning(false);
      }
    } catch (error) {
      console.log("Error stopping bot:", error);
    }
  };

  return (
    <div className="bot-page-container">
      <div className="card">
        <div className="card-image">
          <img
            src="https://img.freepik.com/free-photo/3d-delivery-robot-working_23-2151150100.jpg?t=st=1737443934~exp=1737447534~hmac=7e2a6880f1dee164c8e5c551a89d5af59b250b38e4b16020aa4446acd51237ef&w=900"
            alt="Bot Image"
          />
        </div>
        <div className="card-content">
          <h2>Bot Control</h2>
          <p>Manage your bots operations efficiently.</p>
          <div className="button-container">
            <button
              className={`start-btn ${isBotRunning ? "disabled" : ""}`}
              onClick={startBotHandler}
              disabled={isBotRunning}
            >
              Start
            </button>
            <button
              className={`stop-btn ${!isBotRunning ? "disabled" : ""}`}
              onClick={stopBotHandler}
              disabled={!isBotRunning}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotPage;

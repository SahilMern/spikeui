import React, { useState, useEffect } from 'react';
// import './BotPage.css'; // Import the custom CSS for styling

const BotPage = () => {
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to check bot status
  const fetchBotStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/bot/status');
      const data = await response.json();
      if (data.botStatus.status) {
        setIsBotRunning(true);
      } else {
        setIsBotRunning(false);
      }
    } catch (error) {
      console.log('Error fetching bot status:', error);
    }
  };

  // Fetch the bot status when the component mounts
  useEffect(() => {
    fetchBotStatus();
  }, []);

  // Start the bot
  const startBot = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/bot/start', {
        method: 'POST',
      });
      if (response.ok) {
        setIsBotRunning(true);
      }
    } catch (error) {
      console.log('Error starting bot:', error);
    } finally {
      setLoading(false);
    }
  };

  // Stop the bot
  const stopBot = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/bot/stop', {
        method: 'POST',
      });
      if (response.ok) {
        setIsBotRunning(false);
      }
    } catch (error) {
      console.log('Error stopping bot:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bot-page-container">
      <div className="card">
        <h2>Bot Control</h2>
        <div className="button-container">
          <button
            className={`start-btn ${isBotRunning ? 'disabled' : ''}`}
            onClick={startBot}
            disabled={isBotRunning || loading}
          >
            {loading ? 'Starting...' : 'Start'}
          </button>
          <button
            className={`stop-btn ${!isBotRunning ? 'disabled' : ''}`}
            onClick={stopBot}
            disabled={!isBotRunning || loading}
          >
            {loading ? 'Stopping...' : 'Stop'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotPage;

import React from 'react';
import './Error.css'; // Import the custom CSS file for styling

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-message">
        <h1>Oops! Something went wrong.</h1>
        <p>We couldn't find the page you're looking for. Please try again later or go back to the homepage.</p>
        <a href="/" className="back-home">Back to Home</a>
      </div>
    </div>
  );
}

export default Error;

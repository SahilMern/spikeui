import React, { useState } from 'react';
import './App.css'; // Importing CSS file

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // POST request
    const data = { input1, input2 };
    try {
      const response = await fetch('https://your-api-endpoint.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
      } else {
        console.log('Error:', response.statusText);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>Set price</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label >Deod High price</label>
            <input 
              type="text" 
              value={input1} 
              onChange={(e) => setInput1(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <label>Input 2</label>
            <input 
              type="text" 
              value={input2} 
              onChange={(e) => setInput2(e.target.value)} 
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './ApiTesting.css';

const ApiTesting = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleApiCall = async (file) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1]; // Get the base64 part of the result

        const response = await fetch('https://floor-plan-digitalization.p.rapidapi.com/raster-to-vector-base64', {
          method: 'POST',
          headers: {
            'x-rapidapi-key': '20833d997fmshafe4d6c83c4452ap167c83jsnefdaf9f4b07f',
            'x-rapidapi-host': 'floor-plan-digitalization.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Image }),
        });

        if (response.ok) {
          const data = await response.json();
          setResponse(data);
        } else {
          setError(`Error: ${response.statusText}`);
        }
      };

      reader.onerror = () => {
        setError('Failed to read the file');
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="api-testing-container">
      <h1>API Testing</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            handleApiCall(file);
          }
        }}
      />
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ApiTesting;

import Papa from 'papaparse';
import React, { useState } from 'react';

const Demo = () => {
  const [file, setFile] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvData = event.target.result;
        const parsedData = Papa.parse(csvData, { header: true }).data;

        try {
          const response = await fetch('http://127.0.0.1:5000/pilferage', {
            method: 'POST',
            body: JSON.stringify(parsedData),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const responseData = await response.json();
            setApiResponse(responseData);
          } else {
            console.error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error:', error);
        }

        setIsLoading(false);
      };

      reader.readAsText(file);
    } else {
      console.error('No file selected');
    }
  };

  const renderColumns = () => {
    if (apiResponse) {
      return Object.keys(apiResponse).map((key) => (
        <div className="column" key={key}>
          <h4>{key}</h4>
          <pre>{JSON.stringify(apiResponse[key], null, 2)}</pre>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="container">
      <div className="upload-section">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </div>

      <div className="response-section">
        <h3>API Response:</h3>
        <div className="columns-container" style={{ display: 'flex' }}>
          {renderColumns()}
        </div>
      </div>
    </div>
  );
};

export default Demo;

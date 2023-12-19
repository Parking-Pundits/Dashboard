import { useEffect, useState } from 'react';

const Pilferage = () => {
  const [sensorNumbers, setSensorNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/auto_predictions');
        if (response.ok) {
          const responseData = await response.json();
          setSensorNumbers(responseData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderTable = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!sensorNumbers || !sensorNumbers.length) {
      return <p>No data available.</p>;
    }

    return (
      <div style={{ margin: '20px 0' }}>
        <h1>These Sensors may be Pilfreaged </h1>
        <br /><br />
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid grey' }}>
          <thead>
            <tr style={{ background: 'lightgrey' }}>
              <th style={{ border: '1px solid grey', padding: '8px' }}>Sensor Number</th>
            </tr>
          </thead>
          <tbody>
            {sensorNumbers.map((sensor, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid grey', padding: '8px' }}>{sensor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <h3>API Response:</h3>
      <div className="data-container">{renderTable()}</div>
    </div>
  );
};

export default Pilferage;

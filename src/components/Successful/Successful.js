import React, { useState, useEffect } from 'react';

function Successful() {
  // State to hold the successful launches data
  const [successfulLaunches, setSuccessfulLaunches] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/past')
      .then(response => response.json())
      .then(data => {
        // Filter launches where success is true
        const successfulLaunches = data.filter(launch => launch.success);
        setSuccessfulLaunches(successfulLaunches);
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Successful Launches</h2>
      <div className="successful-launches">
        {/* Map through the successful launches array and display launch details */}
        {successfulLaunches.map(launch => (
          <div key={launch.id} className="successful-launch">
            <h3>{launch.name}</h3>
            <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            {/* You can add more details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Successful;

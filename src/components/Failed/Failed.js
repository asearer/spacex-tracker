import React, { useState, useEffect } from 'react';

function Failed() {
  // State to hold the failed launches data
  const [failedLaunches, setFailedLaunches] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/past')
      .then(response => response.json())
      .then(data => {
        // Filter launches where success is false
        const failedLaunches = data.filter(launch => !launch.success);
        setFailedLaunches(failedLaunches);
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Failed Launches</h2>
      <div className="failed-launches">
        {/* Map through the failed launches array and display launch details */}
        {failedLaunches.map(launch => (
          <div key={launch.id} className="failed-launch">
            <h3>{launch.name}</h3>
            <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            <p>Failure Details: {launch.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Failed;

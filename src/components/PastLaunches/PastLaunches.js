import React, { useState, useEffect } from 'react';

function PastLaunches() {
  // State to hold the past launches data
  const [pastLaunches, setPastLaunches] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/past')
      .then(response => response.json())
      .then(data => {
        // Set the past launches data
        setPastLaunches(data);
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Past Launches</h2>
      <div className="past-launches">
        {/* Map through the past launches array and display launch details */}
        {pastLaunches.map(launch => (
          <div key={launch.id} className="past-launch">
            <h3>{launch.name}</h3>
            <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            {/* You can add more details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastLaunches;

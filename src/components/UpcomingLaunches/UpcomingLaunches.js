import React, { useState, useEffect } from 'react';
import './UpcomingLaunches.css';

function UpcomingLaunches() {
  // State to hold the upcoming launch data
  const [nextLaunch, setNextLaunch] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/next')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set the upcoming launch data
        console.log('Next launch:', data);
        setNextLaunch(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  return (
    <div>
      <h2>Next Launch</h2>
      {error && (
        <div>Error: {error.message}</div>
      )}
      {nextLaunch && (
        <div className="next-launch">
          <h3>{nextLaunch.name}</h3>
          <p>Date: {nextLaunch.date_utc}</p>
          {/* Add more details here */}
        </div>
      )}
    </div>
  );
}

export default UpcomingLaunches;

import React, { useState, useEffect } from 'react';
import './UpcomingLaunches.css';

function UpcomingLaunches() {
  const [nextLaunch, setNextLaunch] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/next')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Next launch data:', data); // Log the response data
        setNextLaunch(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  // Function to format the date string to a human-readable format
  const formatLaunchDate = dateStr => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="container">
      <h2>Next Launch</h2>
      {nextLaunch && (
        <div className="next-launch">
          <h3>{nextLaunch.name}</h3>
          <p>Date: {formatLaunchDate(nextLaunch.date_utc)}</p>
          {/* Add more details here */}
        </div>
      )}
      {error && <div>Error fetching data: {error.message}</div>}
    </div>
  );
}

export default UpcomingLaunches;

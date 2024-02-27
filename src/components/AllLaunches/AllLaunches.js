import React, { useState, useEffect } from 'react';
import './AllLaunches.css';

function AllLaunches() {
  // State to hold the launch data
  const [launches, setLaunches] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(response => response.json())
      .then(data => setLaunches(data))
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>All Launches</h2>
      <div className="launch-list">
        {/* Map through the launches array and display launch details */}
        {launches.map(launch => (
          <div key={launch.id} className="launch-item">
            <h3>{launch.name}</h3>
            <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            <p>Success: {launch.success ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllLaunches;

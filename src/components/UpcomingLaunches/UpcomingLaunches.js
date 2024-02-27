import React, { useState, useEffect } from 'react';

function UpcomingLaunches() {
  // State to hold the upcoming launches data
  const [upcomingLaunches, setUpcomingLaunches] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/upcoming')
      .then(response => response.json())
      .then(data => {
        // Filter launches that have not occurred yet
        const futureLaunches = data.filter(launch => new Date(launch.date_utc) > new Date());
        
        // Log the filtered upcoming launches data
        console.log('Upcoming launches data:', futureLaunches);
        
        // Set the upcoming launches data
        setUpcomingLaunches(futureLaunches);
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Upcoming Launches</h2>
      <div className="upcoming-launches">
        {/* Map through the upcoming launches array and display launch details */}
        {upcomingLaunches.map(launch => (
          <div key={launch.id} className="upcoming-launch">
            <h3>{launch.name}</h3>
            <p>Date: {launch.date_utc}</p>
            {/* You can add more details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingLaunches;

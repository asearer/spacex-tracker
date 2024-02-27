import React, { useState, useEffect } from 'react';
import './UpcomingLaunches.css';

function UpcomingLaunches() {
  // State to hold the upcoming launches data for each category
  const [upcomingFalcon1Launches, setUpcomingFalcon1Launches] = useState([]);
  const [upcomingFalcon9Launches, setUpcomingFalcon9Launches] = useState([]);
  const [upcomingFalconHeavyLaunches, setUpcomingFalconHeavyLaunches] = useState([]);
  const [upcomingStarshipLaunches, setUpcomingStarshipLaunches] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryError, setCategoryError] = useState(false);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/upcoming')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set the upcoming launches data for each category
        console.log('All upcoming launches:', data);
        setUpcomingFalcon1Launches(data.filter(launch => launch.rocket.name === 'Falcon 1'));
        setUpcomingFalcon9Launches(data.filter(launch => launch.rocket.name === 'Falcon 9'));
        setUpcomingFalconHeavyLaunches(data.filter(launch => launch.rocket.name === 'Falcon Heavy'));
        setUpcomingStarshipLaunches(data.filter(launch => launch.rocket.name === 'Starship'));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setCategoryError(false);
  };

  let launches = [];
  // Determine which category's launches to display
  switch (selectedCategory) {
    case 'Falcon 1':
      launches = upcomingFalcon1Launches;
      break;
    case 'Falcon 9':
      launches = upcomingFalcon9Launches;
      break;
    case 'Falcon Heavy':
      launches = upcomingFalconHeavyLaunches;
      break;
    case 'Starship':
      launches = upcomingStarshipLaunches;
      break;
    default:
      launches = [];
      break;
  }

  return (
    <div>
      <h2>Upcoming Launches</h2>
      <div className="categories">
        {/* Render buttons for each category */}
        {['Falcon 1', 'Falcon 9', 'Falcon Heavy', 'Starship'].map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'selected' : ''}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory && launches.length === 0 && !error && (
        <div>No information available for {selectedCategory} at this time.</div>
      )}
      {error && (
        <div>Error: {error.message}</div>
      )}
      {launches.length > 0 && !error && (
        <div className="upcoming-launches">
          {/* Map through the filtered launches and display launch details */}
          {launches.map(launch => (
            <div key={launch.id} className="upcoming-launch">
              <h3>{launch.name}</h3>
              <p>Date: {launch.date_utc}</p>
              {/* You can add more details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingLaunches;

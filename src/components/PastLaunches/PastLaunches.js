import React, { useState, useEffect } from 'react';
import './PastLaunches.css'; // Import CSS file for styling

function PastLaunches() {
  // State to hold the past launches data and selected launch details
  const [pastLaunches, setPastLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 6; // Adjusted to display 12 launches per page

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

  // Function to handle click on a past launch item
  const handlePastLaunchClick = (launch) => {
    setSelectedLaunch(launch);
  };

  // Logic to calculate indexes of past launches to display for the current page
  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = pastLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Past Launches</h2>
      <div className="past-launches">
        {/* Map through the current launches array and display launch details */}
        <div className="past-launch-grid">
          {currentLaunches.map(launch => (
            <div key={launch.id} className="past-launch-item" onClick={() => handlePastLaunchClick(launch)}>
              <button className="past-launch-button">
                <h3>{launch.name}</h3>
                <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
                {/* You can add more details here */}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(pastLaunches.length / launchesPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {/* Display more details about the selected past launch */}
      {selectedLaunch && (
        <div className="selected-past-launch-details">
          <h2>Selected Past Launch</h2>
          <h3>{selectedLaunch.name}</h3>
          <p>Date: {new Date(selectedLaunch.date_utc).toLocaleDateString()}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default PastLaunches;

import React, { useState, useEffect } from 'react';
import './PastLaunches.css'; // Import CSS file for styling

function PastLaunches() {
  // State to hold the past launches data and selected launch details
  const [pastLaunches, setPastLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false); // State to control overlay visibility
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 10; // Number of launches to display per page

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
    setShowDetailsOverlay(true); // Show overlay when a launch item is clicked
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
      {/* Display more details about the selected past launch using overlay */}
      {selectedLaunch && showDetailsOverlay && (
        <div className="past-launch-overlay">
          <div className="past-launch-details">
            <h2>Selected Past Launch</h2>
            <h3>{selectedLaunch.name}</h3>
            <p>Date: {new Date(selectedLaunch.date_utc).toLocaleDateString()}</p>
            <button onClick={() => setShowDetailsOverlay(false)}>Close</button>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default PastLaunches;

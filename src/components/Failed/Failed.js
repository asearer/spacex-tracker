import React, { useState, useEffect } from 'react';
import './Failed.css'; // Import CSS file for styling

function Failed() {
  // State to hold the failed launches data and selected launch details
  const [failedLaunches, setFailedLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false); // State to control overlay visibility
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 6; 

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

  // Function to handle click on a failed launch item
  const handleFailedLaunchClick = (launch) => {
    setSelectedLaunch(launch);
    setShowDetailsOverlay(true); // Show overlay when a launch item is clicked
  };

  // Function to close the overlay
  const handleCloseOverlay = () => {
    setShowDetailsOverlay(false);
  };

  // Logic to calculate indexes of failed launches to display for the current page
  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = failedLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Failed Launches</h2>
      <p>Find information on why some launches have failed </p>
      <div className="failed-launches">
        {/* Map through the current failed launches array and display launch details */}
        <div className="failed-launch-grid">
          {currentLaunches.map(launch => (
            <div key={launch.id} className="failed-launch-item" onClick={() => handleFailedLaunchClick(launch)}>
              <button className="failed-launch-button">
                <h3>{launch.name}</h3>
                
                
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(failedLaunches.length / launchesPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {/* Display more details about the selected failed launch using overlay */}
      {selectedLaunch && showDetailsOverlay && (
        <div className="failed-launch-overlay">
          <div className="failed-launch-details">
            <h2>Selected Failed Launch</h2>
            <h3>{selectedLaunch.name}</h3>
            <p>Date: {new Date(selectedLaunch.date_utc).toLocaleDateString()}</p>
            <p>Failure Details: {selectedLaunch.details}</p>
            <button onClick={handleCloseOverlay}>Close</button>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Failed;

import React, { useState, useEffect } from 'react';
import './AllLaunches.css';

function AllLaunches() {
  // State to hold the launch data and selected launch details
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false); // State to control overlay visibility
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 10; // Number of launches to display per page

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(response => response.json())
      .then(data => setLaunches(data))
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  // Function to handle click on a launch item
  const handleLaunchClick = (launch) => {
    setSelectedLaunch(launch);
    setShowDetailsOverlay(true); // Show overlay when a launch item is clicked
  };

  // Logic to calculate indexes of launches to display for the current page
  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = launches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>All Launches</h2>
      <div className="launch-list">
        {/* Map through the launches array and display launch details */}
        <div className="launch-grid">
          {currentLaunches.map(launch => (
            <div key={launch.id} className="launch-item" onClick={() => handleLaunchClick(launch)}>
              <button className="launch-button">
                <h3>{launch.name}</h3>
                <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
                <p>Success: {launch.success ? 'Yes' : 'No'}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(launches.length / launchesPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {/* Display more details about the selected launch using overlay */}
      {selectedLaunch && showDetailsOverlay && (
        <div className="launch-overlay">
          <div className="launch-details">
            <h2>Selected Launch</h2>
            <h3>{selectedLaunch.name}</h3>
            <p>Date: {new Date(selectedLaunch.date_utc).toLocaleDateString()}</p>
            <p>Success: {selectedLaunch.success ? 'Yes' : 'No'}</p>
            <button onClick={() => setShowDetailsOverlay(false)}>Close</button>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllLaunches;

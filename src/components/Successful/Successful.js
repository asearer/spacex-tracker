import React, { useState, useEffect } from 'react';
import './Successful.css'; // Import CSS file for styling

function Successful() {
  // State to hold the successful launches data and selected launch details
  const [successfulLaunches, setSuccessfulLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false); // State to control overlay visibility
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 4; // Number of launches to display per page

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches/past')
      .then(response => response.json())
      .then(data => {
        // Filter launches where success is true
        const successfulLaunches = data.filter(launch => launch.success);
        setSuccessfulLaunches(successfulLaunches);
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  // Function to handle click on a successful launch item
  const handleSuccessfulLaunchClick = (launch) => {
    setSelectedLaunch(launch);
    setShowDetailsOverlay(true); // Show overlay when a launch item is clicked
  };

  // Logic to calculate indexes of successful launches to display for the current page
  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = successfulLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Successful Launches</h2>
      <div className="successful-launches">
        {/* Map through the current successful launches array and display launch details */}
        <div className="successful-launch-grid">
          {currentLaunches.map(launch => (
            <div key={launch.id} className="successful-launch-item" onClick={() => handleSuccessfulLaunchClick(launch)}>
              <button className="successful-launch-button">
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
        {Array.from({ length: Math.ceil(successfulLaunches.length / launchesPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {/* Display more details about the selected successful launch using overlay */}
      {selectedLaunch && showDetailsOverlay && (
        <div className="successful-launch-overlay">
          <div className="successful-launch-details">
            <h2>Selected Successful Launch</h2>
            <h3>{selectedLaunch.name}</h3>
            <p>Date: {new Date(selectedLaunch.date_utc).toLocaleDateString()}</p>
            {/* Add more details as needed */}
            <button onClick={() => setShowDetailsOverlay(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Successful;

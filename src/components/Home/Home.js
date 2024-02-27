import React from 'react';
import './Home.css'; // Import CSS file

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-heading">Welcome to SpaceX Launch Tracker!</h2>
      <p className="home-text">This app helps you track SpaceX launches.</p>
      <p className="home-text">Explore upcoming and past launches to stay updated with SpaceX's missions.</p>
      {/* You can add more content here */}
    </div>
  );
}

export default Home;

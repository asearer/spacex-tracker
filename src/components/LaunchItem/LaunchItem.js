import React from 'react';

function LaunchItem({ launch }) {
  return (
    <li>
      <h3>{launch.name}</h3>
      <p>Date: {launch.date_utc}</p>
      <p>Rocket: {launch.rocket}</p>
      {/* Add more details as needed */}
    </li>
  );
}

export default LaunchItem;

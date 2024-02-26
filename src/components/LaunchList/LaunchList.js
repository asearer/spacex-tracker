import React, { useState, useEffect } from 'react';
import LaunchItem from './LaunchItem';

function LaunchList() {
  const [launches, setLaunches] = useState([]);
  const [successfulLaunches, setSuccessfulLaunches] = useState([]);
  const [failedLaunches, setFailedLaunches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch SpaceX launches');
        }
        return response.json();
      })
      .then(data => {
        setLaunches(data);
        setSuccessfulLaunches(data.filter(launch => launch.success));
        setFailedLaunches(data.filter(launch => !launch.success));
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Successful Launches</h2>
      <ul>
        {successfulLaunches.map(launch => (
          <LaunchItem key={launch.id} launch={launch} />
        ))}
      </ul>
      <h2>Failed Launches</h2>
      <ul>
        {failedLaunches.map(launch => (
          <LaunchItem key={launch.id} launch={launch} />
        ))}
      </ul>
    </div>
  );
}

export default LaunchList;

import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  // State to hold the countdown time
  const [countdownTime, setCountdownTime] = useState(null);

  // Function to calculate the time remaining until the next launch
  const calculateTimeRemaining = () => {
    // Fetch the upcoming launches data
    fetch('https://api.spacexdata.com/v4/launches/upcoming')
      .then(response => response.json())
      .then(data => {
        // Sort launches by date in ascending order
        const sortedLaunches = data.sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc));
        // Find the next scheduled launch
        const nextLaunch = sortedLaunches.find(launch => new Date(launch.date_utc) > new Date());
        // Calculate the time remaining until the next launch
        if (nextLaunch) {
          const launchDate = new Date(nextLaunch.date_utc);
          const now = new Date();
          const timeRemaining = launchDate.getTime() - now.getTime();
          setCountdownTime(timeRemaining);
        }
      })
      .catch(error => console.log('Error fetching data:', error));
  };

  // Function to format the countdown time
  const formatTime = time => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Update the countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>Countdown Timer</h2>
      {countdownTime !== null ? (
        <p>Time until next launch: {formatTime(countdownTime)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountdownTimer;

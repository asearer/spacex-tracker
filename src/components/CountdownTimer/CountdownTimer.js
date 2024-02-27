import React, { useState, useEffect } from 'react';


function CountdownTimer() {
  const [launchTime, setLaunchTime] = useState(null);

  useEffect(() => {
    // Fetch data from API and set the launch time
    fetchLaunchTime();
  }, []);

  const fetchLaunchTime = async () => {
    try {
      // Fetch data from API
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();

      // Assuming API returns launch time in ISO format
      const nextLaunchTime = new Date(data.launchTime);

      // Set the launch time in state
      setLaunchTime(nextLaunchTime);
    } catch (error) {
      console.error('Error fetching launch time:', error);
    }
  };

  const calculateTimeRemaining = () => {
    if (!launchTime) return null;

    // Calculate time difference between current time and launch time
    const currentTime = new Date();
    const timeDifference = launchTime - currentTime;

    // Convert time difference to days, hours, minutes, seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const renderTimer = () => {
    const remainingTime = calculateTimeRemaining();

    if (!remainingTime) {
      return <p>Loading...</p>;
    }

    return (
      <div className="countdown-container">
        <div className="countdown-timer">
          {remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes, {remainingTime.seconds} seconds
        </div>
        <div className="countdown-label">until next launch</div>
      </div>
    );
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      {renderTimer()}
    </div>
  );
}

export default CountdownTimer;

import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

function CountdownTimer() {
  const [launchTime, setLaunchTime] = useState(null);

  useEffect(() => {
    fetchLaunchTime(); // Initial fetch when the component mounts
    const timerID = setInterval(fetchLaunchTime, 1000); // Fetch every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerID);
  }, []);

  const fetchLaunchTime = async () => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/launches/next');
      const data = await response.json();

      const nextLaunchTime = new Date(data.date_utc);

      setLaunchTime(nextLaunchTime);
    } catch (error) {
      console.error('Error fetching launch time:', error);
    }
  };

  const calculateTimeRemaining = () => {
    if (!launchTime) return null;

    const currentTime = new Date();
    const timeDifference = launchTime - currentTime;

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

import React, { useState, useEffect } from 'react';
import './App.css';

const CountdownTimer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(initialTime);

  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(startTime);
  };

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value) * 60; // Convert minutes to seconds
    setStartTime(newTime);
    setTimeLeft(newTime);
  };

  return (
    <div className="countdown-timer">
      <h1>Countdown Timer</h1>
      <div className="timer-display">
        {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
      </div>
      <div className="controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="time-input">
        <label>Set Timer (minutes): </label>
        <input type="number" onChange={handleTimeChange} value={startTime / 60} />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CountdownTimer initialTime={120} /> {/* 2 minutes countdown */}
    </div>
  );
}

export default App;

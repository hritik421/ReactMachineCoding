import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milliseconds using javascript setInterval method
      intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="container">
      <p className="time-display">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div>
        <button onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;

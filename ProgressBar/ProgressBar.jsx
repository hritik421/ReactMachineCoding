import React, { useState, useEffect } from 'react'; // Import useEffect from React
import './App.css'

const MIN = 0; // Define MIN constant
const MAX = 100; // Define MAX constant

function ProgressBar({ value = 0, onComplete = () => {} }) {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(Math.max(value, MIN), MAX));

    if (value >= MAX) {
      onComplete();
    }
  }, [value, onComplete]); // Include onComplete in the dependency array

  return (
    <div className="progress">
      <span
        style={{
          color: percent > 49 ? "white" : "black"
        }}
      >
        {percent.toFixed()}%
      </span>
      <div
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left"
        }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={percent}
        role="progressbar"
      />
    </div>
  );
}

export default function App() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => { // Store intervalId to clearInterval later
      setValue((val) => val + 0.1);
    }, 20);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="app">
      <span>Progress Bar</span>
      <ProgressBar value={value} onComplete={() => setSuccess(true)} />
      <span>{success ? "Complete!" : "Loading..."}</span>
    </div>
  );
}

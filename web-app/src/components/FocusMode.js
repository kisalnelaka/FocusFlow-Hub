import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';

const FocusMode = () => {
  const [timer, setTimer] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setIsRunning(false);
      // Trigger break time or award gamification points here.
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startFocus = () => {
    setIsRunning(true);
  };

  const stopFocus = () => {
    setIsRunning(false);
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h2>Focus Mode</h2>
      <Typography variant="h4">{formatTime(timer)}</Typography>
      <Button variant="contained" color="primary" onClick={startFocus} disabled={isRunning}>
        Start Focus
      </Button>
      <Button variant="contained" color="secondary" onClick={stopFocus} style={{ marginLeft: 10 }}>
        Stop
      </Button>
      {/* Integrate ambient soundscapes, distraction blockers, and focus analytics */}
    </div>
  );
};

export default FocusMode;

'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

type TimerMode = 'focus' | 'short-break' | 'long-break';

const TIMER_MODES = {
  focus: 25 * 60, // 25 minutes
  'short-break': 5 * 60, // 5 minutes
  'long-break': 15 * 60, // 15 minutes
};

export default function TimerPage() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES[mode]);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'focus') {
        setCompletedSessions((sessions) => sessions + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_MODES[mode]);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(TIMER_MODES[newMode]);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Pomodoro Timer</h1>
        <p className="text-gray-600">
          Stay focused and productive with timed work sessions
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={mode === 'focus' ? 'default' : 'outline'}
            onClick={() => switchMode('focus')}
          >
            Focus
          </Button>
          <Button
            variant={mode === 'short-break' ? 'default' : 'outline'}
            onClick={() => switchMode('short-break')}
          >
            Short Break
          </Button>
          <Button
            variant={mode === 'long-break' ? 'default' : 'outline'}
            onClick={() => switchMode('long-break')}
          >
            Long Break
          </Button>
        </div>

        <div className="text-center space-y-8">
          <div className="text-7xl font-bold text-primary">
            {formatTime(timeLeft)}
          </div>

          <div className="space-x-4">
            <Button
              size="lg"
              onClick={toggleTimer}
            >
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={resetTimer}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Session Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Completed Sessions</p>
            <p className="text-2xl font-bold text-primary">{completedSessions}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Focus Time</p>
            <p className="text-2xl font-bold text-primary">
              {Math.floor(completedSessions * 25)} mins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
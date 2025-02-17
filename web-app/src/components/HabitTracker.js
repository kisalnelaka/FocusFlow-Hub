import React, { useState } from 'react';
import { TextField, Button, List, ListItem, LinearProgress } from '@material-ui/core';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState('');

  const addHabit = () => {
    if (habitInput.trim() !== '') {
      setHabits([...habits, { name: habitInput, streak: 0, progress: 0 }]);
      setHabitInput('');
    }
  };

  const incrementHabit = (index) => {
    const newHabits = [...habits];
    newHabits[index].streak += 1;
    newHabits[index].progress = Math.min(100, newHabits[index].progress + 10);
    setHabits(newHabits);
  };

  return (
    <div>
      <h2>Habit Tracker</h2>
      <TextField
        label="New Habit"
        variant="outlined"
        value={habitInput}
        onChange={(e) => setHabitInput(e.target.value)}
      />
      <Button onClick={addHabit} variant="contained" color="primary" style={{ marginLeft: 10 }}>
        Add Habit
      </Button>
      <List>
        {habits.map((habit, idx) => (
          <ListItem key={idx} button onClick={() => incrementHabit(idx)}>
            {habit.name} - Streak: {habit.streak}
            <LinearProgress variant="determinate" value={habit.progress} style={{ width: '50%', marginLeft: 20 }} />
          </ListItem>
        ))}
      </List>
      {/* Routine templates, SMART goal setup, progress dashboards can be added */}
    </div>
  );
};

export default HabitTracker;

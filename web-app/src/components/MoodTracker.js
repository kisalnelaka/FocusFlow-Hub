import React, { useState } from 'react';
import { TextField, Button, List, ListItem } from '@material-ui/core';

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [moodInput, setMoodInput] = useState('');

  const addMood = () => {
    if (moodInput.trim() !== '') {
      setMoods([{ time: new Date().toLocaleTimeString(), mood: moodInput }, ...moods]);
      setMoodInput('');
    }
  };

  return (
    <div>
      <h2>Mood Tracker</h2>
      <TextField
        label="Log Mood (e.g., stressed, calm)"
        variant="outlined"
        value={moodInput}
        onChange={(e) => setMoodInput(e.target.value)}
      />
      <Button onClick={addMood} variant="contained" color="primary" style={{ marginLeft: 10 }}>
        Log Mood
      </Button>
      <List>
        {moods.map((entry, idx) => (
          <ListItem key={idx}>
            {entry.time} - {entry.mood}
          </ListItem>
        ))}
      </List>
      {/* Journal prompts, mindfulness exercises, and coping strategies can be integrated */}
    </div>
  );
};

export default MoodTracker;

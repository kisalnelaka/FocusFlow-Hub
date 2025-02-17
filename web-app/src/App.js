import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@material-ui/core';

// Import components
import TaskManager from './components/TaskManager';
import FocusMode from './components/FocusMode';
import HabitTracker from './components/HabitTracker';
import MoodTracker from './components/MoodTracker';
import HealthReminder from './components/HealthReminder';
import OrganizationTools from './components/OrganizationTools';
import SocialHub from './components/SocialHub';
import Customization from './components/Customization';
import LearningSupport from './components/LearningSupport';
import AdvancedFeatures from './components/AdvancedFeatures';
import ExecutiveSupport from './components/ExecutiveSupport';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            FocusFlow Hub
          </Typography>
          <Button color="inherit" component={Link} to="/">Tasks</Button>
          <Button color="inherit" component={Link} to="/focus">Focus</Button>
          <Button color="inherit" component={Link} to="/habits">Habits</Button>
          <Button color="inherit" component={Link} to="/mood">Mood</Button>
          <Button color="inherit" component={Link} to="/health">Health</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<TaskManager />} />
          <Route path="/focus" element={<FocusMode />} />
          <Route path="/habits" element={<HabitTracker />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/health" element={<HealthReminder />} />
          <Route path="/organization" element={<OrganizationTools />} />
          <Route path="/social" element={<SocialHub />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/learning" element={<LearningSupport />} />
          <Route path="/advanced" element={<AdvancedFeatures />} />
          <Route path="/executive" element={<ExecutiveSupport />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

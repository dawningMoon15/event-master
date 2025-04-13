import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import AttendeesDashboard from './pages/dashboards/AttendeesDashboard';
import ArtistDashboard from './pages/dashboards/ArtistDashboard';
import OrganizerDashboard from './pages/dashboards/OrganizerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="attendee" element={<AttendeesDashboard />} />
          <Route path="artist" element={<ArtistDashboard />} />
          <Route path="artist/invites" element={<ArtistDashboard />} />
          <Route path="artist/events" element={<ArtistDashboard />} />
          <Route path="organizer" element={<OrganizerDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
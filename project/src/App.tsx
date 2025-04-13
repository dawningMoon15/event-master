import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import AttendeesDashboard from './pages/dashboards/AttendeesDashboard';
import ArtistDashboard from './pages/dashboards/ArtistDashboard';
import OrganizerDashboard from './pages/dashboards/OrganizerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminSponsorsPage from './pages/admin/AdminSponsorsPage';
import AdminFinancialPage from './pages/admin/AdminFinancialPage';
import EventDetails from './pages/events/EventDetails';
import TicketPurchase from './pages/events/TicketPurchase';
import FavoritesPage from './pages/dashboards/FavoritesPage';
import BookingsPage from './pages/dashboards/BookingsPage';

function App() {
  const { user } = useAuth();

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="attendee" element={<AttendeesDashboard />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="artist">
                <Route index element={<ArtistDashboard />} />
                <Route path="profile" element={<ArtistDashboard />} />
                <Route path="invites" element={<ArtistDashboard />} />
                <Route path="events" element={<ArtistDashboard />} />
              </Route>
              <Route path="organizer">
                <Route index element={<OrganizerDashboard />} />
                <Route path="profile" element={<OrganizerDashboard />} />
                <Route path="events">
                  <Route index element={<OrganizerDashboard />} />
                  <Route path="create" element={<OrganizerDashboard />} />
                  <Route path=":eventId" element={<OrganizerDashboard />} />
                  <Route path=":eventId/edit" element={<OrganizerDashboard />} />
                </Route>
                <Route path="analytics" element={<OrganizerDashboard />} />
                <Route path="artists" element={<OrganizerDashboard />} />
                <Route path="sponsors" element={<OrganizerDashboard />} />
                <Route path="financial" element={<OrganizerDashboard />} />
                <Route path="reviews" element={<OrganizerDashboard />} />
              </Route>
              <Route path="admin" element={
                <ProtectedRoute requireAdmin>
                  <Outlet />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="sponsors" element={<AdminSponsorsPage />} />
                <Route path="security" element={<AdminDashboard />} />
                <Route path="financial" element={<AdminFinancialPage />} />
                <Route path="roles" element={<AdminDashboard />} />
              </Route>
            </Route>
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/purchase" element={
              <ProtectedRoute>
                <TicketPurchase />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
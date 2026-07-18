import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
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

/**
 * AppRouter must live *inside* AuthProvider so that useAuth() can access
 * the context without throwing "must be used within AuthProvider".
 */
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DefaultDashboardRedirect />} />
          <Route path="attendee" element={<AttendeesDashboard />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="bookings" element={<BookingsPage />} />

          {/* Artist */}
          <Route path="artist">
            <Route index element={<ArtistDashboard />} />
            <Route path="profile" element={<ArtistDashboard />} />
            <Route path="invites" element={<ArtistDashboard />} />
            <Route path="events" element={<ArtistDashboard />} />
          </Route>

          {/* Organizer */}
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

          {/* Admin */}
          <Route
            path="admin"
            element={
              <ProtectedRoute requireAdmin>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="sponsors" element={<AdminSponsorsPage />} />
            <Route path="security" element={<AdminDashboard />} />
            <Route path="financial" element={<AdminFinancialPage />} />
            <Route path="roles" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Public event routes */}
        <Route path="/events/:id" element={<EventDetails />} />
        <Route
          path="/events/:id/purchase"
          element={
            <ProtectedRoute>
              <TicketPurchase />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

/**
 * Redirects /dashboard to the correct sub-dashboard based on the user's role.
 */
const DefaultDashboardRedirect: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) return;
    const roleMap: Record<string, string> = {
      admin: '/dashboard/admin',
      artist: '/dashboard/artist',
      organizer: '/dashboard/organizer',
    };
    navigate(roleMap[user.role] ?? '/dashboard/attendee', { replace: true });
  }, [user, navigate]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppRouter />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
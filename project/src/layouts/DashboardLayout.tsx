import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Calendar,
  Users,
  LogOut,
  Heart,
  Ticket,
  Shield,
  DollarSign,
  Building2,
  Lock,
  Music,
  Mic2,
  BarChart2,
  UserCircle,
  Mail,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navByRole: Record<string, NavItem[]> = {
  admin: [
    { path: '/dashboard/admin', label: 'Overview', icon: Shield },
    { path: '/dashboard/admin/events', label: 'Events', icon: Calendar },
    { path: '/dashboard/admin/roles', label: 'User Management', icon: Users },
    { path: '/dashboard/admin/sponsors', label: 'Sponsorships', icon: Building2 },
    { path: '/dashboard/admin/financial', label: 'Financial', icon: DollarSign },
    { path: '/dashboard/admin/security', label: 'Security', icon: Lock },
  ],
  artist: [
    { path: '/dashboard/artist', label: 'Portfolio', icon: Music },
    { path: '/dashboard/artist/profile', label: 'Profile', icon: UserCircle },
    { path: '/dashboard/artist/invites', label: 'Invitations', icon: Mail },
    { path: '/dashboard/artist/events', label: 'My Events', icon: Mic2 },
  ],
  organizer: [
    { path: '/dashboard/organizer/events', label: 'Events', icon: Calendar },
    { path: '/dashboard/organizer/analytics', label: 'Analytics', icon: BarChart2 },
    { path: '/dashboard/organizer/artists', label: 'Artists', icon: Mic2 },
    { path: '/dashboard/organizer/sponsors', label: 'Sponsors', icon: Building2 },
    { path: '/dashboard/organizer/financial', label: 'Financial', icon: DollarSign },
    { path: '/dashboard/organizer/profile', label: 'Profile', icon: UserCircle },
  ],
  // attendee is the default
  attendee: [
    { path: '/dashboard/attendee', label: 'Discover', icon: Calendar },
    { path: '/dashboard/favorites', label: 'Favourites', icon: Heart },
    { path: '/dashboard/bookings', label: 'My Bookings', icon: Ticket },
  ],
};

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const role = user?.role ?? 'attendee';
  const navItems = navByRole[role] ?? navByRole.attendee;

  const isActive = (path: string) =>
    path === '/dashboard/attendee'
      ? location.pathname === path
      : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex">
      {/* ── Sidebar ── */}
      <div className="w-64 bg-[#432818] text-white flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="w-7 h-7 text-[#FFE6A7]" />
            <span className="text-xl font-bold text-[#FFE6A7] tracking-tight">EventMaster</span>
          </Link>
          {user && (
            <div className="mt-3 text-xs text-[#BB9457] capitalize">
              {user.name} · <span className="font-semibold">{role}</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                      active
                        ? 'bg-[#6F1D1B] text-[#FFE6A7]'
                        : 'text-white/80 hover:bg-[#6F1D1B]/60 hover:text-[#FFE6A7]'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-white/80 hover:text-[#FFE6A7]
                       rounded-lg hover:bg-[#6F1D1B]/60 transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-auto bg-[#99582A] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Calendar,
  Users,
  Settings,
  LogOut,
  Heart,
  Ticket,
  Shield,
  DollarSign,
  Flag,
  Building2,
  Lock
} from 'lucide-react';

const DashboardLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.isAdmin;

  const adminNavItems = [
    { path: '/dashboard/admin', label: 'Overview', icon: Shield },
    { path: '/dashboard/admin/events', label: 'Events', icon: Calendar },
    { path: '/dashboard/admin/roles', label: 'User Management', icon: Users },
    { path: '/dashboard/admin/sponsors', label: 'Sponsorships', icon: Building2 },
    { path: '/dashboard/admin/financial', label: 'Financial', icon: DollarSign },
    { path: '/dashboard/admin/security', label: 'Security', icon: Lock },
  ];

  const attendeeNavItems = [
    { path: '/dashboard/attendee', label: 'Events', icon: Calendar },
    { path: '/dashboard/favorites', label: 'Favorites', icon: Heart },
    { path: '/dashboard/bookings', label: 'My Bookings', icon: Ticket },
  ];

  const navItems = isAdmin ? adminNavItems : attendeeNavItems;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#432818] text-white flex flex-col">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-8 h-8" />
            <span className="text-xl font-bold">EventMaster</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-[#6F1D1B] text-white'
                      : 'text-white/90 hover:bg-[#6F1D1B]/80'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="flex items-center space-x-2 px-4 py-2 w-full text-white/90 hover:text-white rounded-lg hover:bg-[#6F1D1B]/80 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
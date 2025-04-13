import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, Bell, User, Image, Mail, Settings, LogOut } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const getNavItemClass = (path: string): string => {
    const isActive = location.pathname === path;
    return `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
      isActive
        ? 'bg-primary-light/20 text-primary'
        : 'text-secondary hover:bg-primary-light/10'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EventMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900"
                >
                  <User className="w-5 h-5" />
                  <span>Artist Name</span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/dashboard/artist"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Portfolio
                    </Link>
                    <Link
                      to="/dashboard/artist/invites"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Invites
                    </Link>
                    <Link
                      to="/dashboard/artist/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 pr-4">
            <nav className="space-y-1">
              <Link
                to="/dashboard/artist"
                className={getNavItemClass('/dashboard/artist')}
              >
                <Image className="w-5 h-5 mr-3" />
                Portfolio
              </Link>
              <Link
                to="/dashboard/artist/invites"
                className={getNavItemClass('/dashboard/artist/invites')}
              >
                <Mail className="w-5 h-5 mr-3" />
                Event Invites
              </Link>
              <Link
                to="/dashboard/artist/events"
                className={getNavItemClass('/dashboard/artist/events')}
              >
                <Calendar className="w-5 h-5 mr-3" />
                My Events
              </Link>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
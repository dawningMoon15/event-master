import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  Heart,
  History,
  User,
  Mic2,
  Users,
  Shield,
  BarChart2,
  CreditCard,
  FileText,
  MapPin
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const getNavItems = (role: string): NavItem[] => {
  switch (role) {
    case 'attendee':
      return [
        { path: '/dashboard/attendee', label: 'Upcoming Events', icon: <Calendar className="w-5 h-5" /> },
        { path: '/dashboard/attendee/favorites', label: 'Favorites', icon: <Heart className="w-5 h-5" /> },
        { path: '/dashboard/attendee/history', label: 'Booking History', icon: <History className="w-5 h-5" /> }
      ];
    case 'artist':
      return [
        { path: '/dashboard/artist/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
        { path: '/dashboard/artist/portfolio', label: 'Portfolio', icon: <Mic2 className="w-5 h-5" /> },
        { path: '/dashboard/artist/invites', label: 'Invites', icon: <Calendar className="w-5 h-5" /> },
        { path: '/dashboard/artist/events', label: 'Events', icon: <Mic2 className="w-5 h-5" /> }
      ];
    case 'organizer':
      return [
        { path: '/dashboard/organizer/events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
        { path: '/dashboard/organizer/artists', label: 'Artists', icon: <Mic2 className="w-5 h-5" /> },
        { path: '/dashboard/organizer/venues', label: 'Venues', icon: <MapPin className="w-5 h-5" /> },
        { path: '/dashboard/organizer/analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5" /> },
        { path: '/dashboard/organizer/financial', label: 'Financial', icon: <CreditCard className="w-5 h-5" /> }
      ];
    case 'admin':
      return [
        { path: '/dashboard/admin', label: 'Overview', icon: <BarChart2 className="w-5 h-5" /> },
        { path: '/dashboard/admin/sponsorships', label: 'Sponsorships', icon: <CreditCard className="w-5 h-5" /> },
        { path: '/dashboard/admin/security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
        { path: '/dashboard/admin/events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
        { path: '/dashboard/admin/financial', label: 'Financial', icon: <CreditCard className="w-5 h-5" /> },
        { path: '/dashboard/admin/roles', label: 'Roles', icon: <Users className="w-5 h-5" /> }
      ];
    default:
      return [];
  }
};

interface RoleBasedNavProps {
  role: string;
}

const RoleBasedNav: React.FC<RoleBasedNavProps> = ({ role }) => {
  const location = useLocation();
  const navItems = getNavItems(role);

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-accent/10 text-accent'
                : 'text-accent/80 hover:text-accent hover:bg-accent/5'
            }`}
          >
            <div className={`${isActive ? 'text-accent' : 'text-accent/60'}`}>
              {item.icon}
            </div>
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default RoleBasedNav; 
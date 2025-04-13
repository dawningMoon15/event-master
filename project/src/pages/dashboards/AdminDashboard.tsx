import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Users, Shield, Building2, Ticket, Star } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const stats = [
    {
      id: 'totalEvents',
      label: 'Total Events',
      value: '24',
      icon: Calendar,
      path: '/dashboard/admin/events'
    },
    {
      id: 'totalAttendees',
      label: 'Total Attendees',
      value: '1,234',
      icon: Users,
      path: '/dashboard/admin/attendees'
    },
    {
      id: 'totalSponsors',
      label: 'Total Sponsors',
      value: '4',
      icon: Building2,
      path: '/dashboard/admin/sponsors'
    },
    {
      id: 'totalRevenue',
      label: 'Total Revenue',
      value: '$45,678',
      icon: DollarSign,
      path: '/dashboard/admin/financial'
    }
  ];

  return (
    <div className="p-6 bg-[#FFE6A7]">
      <h1 className="text-3xl font-bold text-[#432818] mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ id, label, value, icon: Icon, path }) => (
          <button
            key={id}
            onClick={() => handleCardClick(path)}
            className="text-left bg-[#FFE6A7] p-6 rounded-lg shadow-md border-2 border-[#432818] hover:border-[#6F1D1B] transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              {Icon && <Icon className="w-8 h-8 text-[#432818]" />}
              <span className="text-2xl font-bold text-[#432818]">{value}</span>
            </div>
            <h3 className="text-lg font-medium text-[#432818]">{label}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
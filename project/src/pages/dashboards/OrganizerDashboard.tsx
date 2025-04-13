import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  BarChart2, 
  Star, 
  Settings, 
  Plus, 
  Edit2, 
  Trash2, 
  Copy,
  FileText,
  Search,
  Filter,
  Download
} from 'lucide-react';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  ticketTypes: TicketType[];
  artists: Artist[];
  sponsors: Sponsor[];
  status: 'draft' | 'published' | 'cancelled';
}

interface TicketType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  sold: number;
}

interface Artist {
  id: number;
  name: string;
  status: 'pending' | 'confirmed' | 'declined';
}

interface Sponsor {
  id: number;
  name: string;
  type: string;
  contribution: number;
}

const OrganizerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Mock data - in a real app, this would come from an API
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Summer Music Festival 2024",
      description: "Annual summer music festival featuring top artists",
      date: "2024-07-15",
      time: "16:00",
      venue: "Central Park Arena",
      capacity: 10000,
      ticketTypes: [
        { id: 1, name: "General Admission", price: 89.99, quantity: 5000, sold: 2500 },
        { id: 2, name: "VIP", price: 199.99, quantity: 1000, sold: 500 }
      ],
      artists: [
        { id: 1, name: "John Smith", status: "confirmed" },
        { id: 2, name: "Sarah Johnson", status: "pending" }
      ],
      sponsors: [
        { id: 1, name: "TechCorp", type: "Platinum", contribution: 50000 },
        { id: 2, name: "FoodCo", type: "Gold", contribution: 25000 }
      ],
      status: "published"
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalRevenue: 250000,
    totalTicketsSold: 3000,
    averageRating: 4.5,
    demographics: {
      age: { "18-24": 30, "25-34": 45, "35-44": 15, "45+": 10 },
      gender: { male: 55, female: 45 }
    }
  });

  const renderProfileSection = () => (
    <div className="space-y-8">
      <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-primary-light/20">
        <h2 className="text-2xl font-bold text-accent mb-6">Organization Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-accent mb-2">Organization Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-secondary text-accent border border-primary-light/20 focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-accent mb-2">Website</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded-lg bg-secondary text-accent border border-primary-light/20 focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
                placeholder="https://example.com"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-accent mb-2">Verification Status</label>
              <div className="flex items-center space-x-2 text-accent/80">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Pending Admin Verification</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center space-x-2 bg-primary/90 text-accent px-6 py-2 rounded-lg hover:bg-primary transition-colors">
              <Settings className="w-4 h-4" />
              <span>Update Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsSection = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">Event Management</h2>
        <button
          onClick={() => navigate('/dashboard/organizer/events/create')}
          className="flex items-center space-x-2 bg-primary/90 text-accent px-6 py-2 rounded-lg hover:bg-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-primary-light/20">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-accent">{event.name}</h3>
                  <p className="text-accent/80 mt-1">{event.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-accent/80 hover:text-accent hover:bg-primary-light/10 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-accent/80 hover:text-accent hover:bg-primary-light/10 rounded-lg">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-accent/80 hover:text-accent hover:bg-primary-light/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-accent/80">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-accent/80">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-accent/80">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center space-x-2 text-accent/80">
                  <Users className="w-4 h-4" />
                  <span>{event.capacity} capacity</span>
                </div>
              </div>

              <div className="pt-4 border-t border-primary-light/20">
                <h4 className="text-lg font-medium text-accent mb-2">Ticket Sales</h4>
                <div className="space-y-2">
                  {event.ticketTypes.map(ticket => (
                    <div key={ticket.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-accent/80" />
                        <span className="text-accent/80">{ticket.name}</span>
                      </div>
                      <div className="text-accent/80">
                        {ticket.sold}/{ticket.quantity} sold
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">Analytics Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-accent/80 hover:text-accent">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 text-accent/80 hover:text-accent">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary-light/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-accent">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-accent/80" />
          </div>
          <p className="text-2xl font-bold text-accent mt-2">${analytics.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary-light/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-accent">Tickets Sold</h3>
            <Users className="w-5 h-5 text-accent/80" />
          </div>
          <p className="text-2xl font-bold text-accent mt-2">{analytics.totalTicketsSold}</p>
        </div>
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary-light/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-accent">Average Rating</h3>
            <Star className="w-5 h-5 text-accent/80" />
          </div>
          <p className="text-2xl font-bold text-accent mt-2">{analytics.averageRating}/5.0</p>
        </div>
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary-light/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-accent">Events</h3>
            <Calendar className="w-5 h-5 text-accent/80" />
          </div>
          <p className="text-2xl font-bold text-accent mt-2">{events.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary-light/20">
          <h3 className="text-lg font-medium text-accent mb-4">Age Demographics</h3>
          <div className="space-y-2">
            {Object.entries(analytics.demographics.age).map(([range, percentage]) => (
              <div key={range} className="flex items-center justify-between">
                <span className="text-accent/80">{range}</span>
                <div className="w-48 h-2 bg-primary-light/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-accent/80">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary-light/20">
          <h3 className="text-lg font-medium text-accent mb-4">Gender Distribution</h3>
          <div className="space-y-2">
            {Object.entries(analytics.demographics.gender).map(([gender, percentage]) => (
              <div key={gender} className="flex items-center justify-between">
                <span className="text-accent/80">{gender}</span>
                <div className="w-48 h-2 bg-primary-light/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-accent/80">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const getCurrentSection = () => {
    if (currentPath.includes('/profile')) {
      return renderProfileSection();
    } else if (currentPath.includes('/events')) {
      return renderEventsSection();
    } else if (currentPath.includes('/analytics')) {
      return renderAnalyticsSection();
    }
    return renderEventsSection(); // Default to events section
  };

  return (
    <div className="space-y-6">
      {getCurrentSection()}
    </div>
  );
};

export default OrganizerDashboard;
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Filter, Download, Search } from 'lucide-react';

interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  date: string;
  location: string;
  ticketCount: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: '1',
        eventId: '101',
        eventTitle: 'Summer Music Festival',
        eventImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
        date: '2024-07-15',
        location: 'Central Park',
        ticketCount: 2,
        totalPrice: 179.98,
        status: 'confirmed'
      },
      {
        id: '2',
        eventId: '102',
        eventTitle: 'Tech Conference 2024',
        eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        date: '2024-03-10',
        location: 'Convention Center',
        ticketCount: 1,
        totalPrice: 299.99,
        status: 'completed'
      }
    ];
    setBookings(mockBookings);
    setLoading(false);
  }, []);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const downloadTicket = (booking: Booking) => {
    // In a real application, this would generate a proper ticket PDF
    alert('Ticket download functionality will be implemented with the backend integration');
  };

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const now = new Date();
    const isUpcoming = bookingDate >= now;

    // Filter by tab
    if (activeTab === 'upcoming' && !isUpcoming) return false;
    if (activeTab === 'past' && isUpcoming) return false;

    // Filter by search
    if (filters.search && !booking.eventTitle.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Filter by status
    if (filters.status !== 'all' && booking.status !== filters.status) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const bookingDate = new Date(booking.date);
      const now = new Date();
      const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
      const ninetyDaysFromNow = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000));

      if (filters.dateRange === '30days' && bookingDate > thirtyDaysFromNow) return false;
      if (filters.dateRange === '90days' && bookingDate > ninetyDaysFromNow) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6F1D1B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE6A7] px-4 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header and Tabs */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#432818]">My Bookings</h1>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-[#432818] text-[#FFE6A7] rounded-lg hover:bg-[#6F1D1B] transition-colors"
              >
                <Filter size={20} />
                <span>Filter</span>
              </button>
            </div>
            <div className="flex gap-4 border-b border-[#432818]/20">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'text-[#6F1D1B] border-b-2 border-[#6F1D1B]'
                    : 'text-[#432818]/70 hover:text-[#432818]'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'text-[#6F1D1B] border-b-2 border-[#6F1D1B]'
                    : 'text-[#432818]/70 hover:text-[#432818]'
                }`}
              >
                Past
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-[#432818] p-4 rounded-lg space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFE6A7]" size={20} />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="w-full pl-10 pr-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#FFE6A7]/70"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
                <select
                  className="px-4 py-2 bg-[#99582A] text-[#FFE6A7] rounded-lg"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  className="px-4 py-2 bg-[#99582A] text-[#FFE6A7] rounded-lg"
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                >
                  <option value="all">All Dates</option>
                  <option value="30days">Next 30 Days</option>
                  <option value="90days">Next 90 Days</option>
                </select>
              </div>
            </div>
          )}

          {/* Bookings List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#432818] rounded-xl overflow-hidden shadow-md"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48">
                    <img
                      src={booking.eventImage}
                      alt={booking.eventTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-[#FFE6A7] mb-2">
                          {booking.eventTitle}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-[#FFE6A7]/70 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <span className="text-[#FFE6A7] font-semibold">${booking.totalPrice}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="text-[#FFE6A7]/70">
                        {booking.ticketCount} {booking.ticketCount === 1 ? 'ticket' : 'tickets'}
                      </div>
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => downloadTicket(booking)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#6F1D1B] text-[#FFE6A7] rounded-lg hover:bg-[#99582A] transition-colors"
                        >
                          <Download size={20} />
                          <span>Download Ticket</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto text-[#432818] mb-4" size={48} />
              <h2 className="text-2xl font-semibold text-[#432818] mb-2">No Bookings Found</h2>
              <p className="text-[#432818]/70">
                {activeTab === 'upcoming'
                  ? "You don't have any upcoming bookings."
                  : "You don't have any past bookings."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage; 
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Ticket, Heart, History, Star } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  image: string;
  category: string;
}

const AttendeesDashboard = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'favorites' | 'history'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data - in a real app, this would come from an API
  const events: Event[] = [
    {
      id: 1,
      title: "Summer Music Festival 2025",
      date: "2025-07-15",
      time: "16:00",
      venue: "Central Park Arena",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop",
      category: "music"
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "2025-08-20",
      time: "09:00",
      venue: "Convention Center",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
      category: "conference"
    },
    {
      id: 3,
      title: "Food & Wine Festival",
      date: "2025-09-05",
      time: "12:00",
      venue: "Riverside Gardens",
      price: 75.00,
      image: "https://images.unsplash.com/photo-1510924199351-4e9d94df18a6?w=800&auto=format&fit=crop",
      category: "food"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'music', name: 'Music' },
    { id: 'conference', name: 'Conferences' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'sports', name: 'Sports' }
  ];

  const filteredEvents = events.filter(event => 
    selectedCategory === 'all' || event.category === selectedCategory
  );

  const handleBookTicket = (eventId: number) => {
    // In a real app, this would open a booking modal or navigate to booking page
    console.log('Booking ticket for event:', eventId);
  };

  const handleToggleFavorite = (eventId: number) => {
    // In a real app, this would toggle favorite status in the backend
    console.log('Toggle favorite for event:', eventId);
  };

  return (
    <div className="space-y-6 bg-accent/10 p-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">Welcome Back!</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors">
            <History className="w-5 h-5" />
            <span>Booking History</span>
          </button>
          <button className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
            <span>Favorites</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-accent'
                : 'bg-secondary-light/20 text-secondary hover:bg-secondary-light/30'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-primary-light/20">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-primary">{event.title}</h3>
                <button
                  onClick={() => handleToggleFavorite(event.id)}
                  className="text-secondary-light hover:text-primary transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-secondary">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-secondary">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-secondary">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.venue}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-primary-light/20">
                <div className="text-lg font-bold text-primary">
                  ${event.price.toFixed(2)}
                </div>
                <button
                  onClick={() => handleBookTicket(event.id)}
                  className="flex items-center space-x-2 bg-primary text-accent px-4 py-2 rounded-md hover:bg-primary-light transition-colors"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-primary-light/20">
          <Calendar className="w-12 h-12 text-primary-light mx-auto mb-4" />
          <h3 className="text-lg font-medium text-primary">No events found</h3>
          <p className="text-secondary">Try adjusting your filters or check back later</p>
        </div>
      )}
    </div>
  );
};

export default AttendeesDashboard;
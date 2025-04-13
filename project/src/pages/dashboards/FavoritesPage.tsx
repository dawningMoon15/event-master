import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Heart, MapPin, Calendar } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFE6A7] px-4 py-8">
        <div className="container mx-auto text-center">
          <Heart className="mx-auto text-[#6F1D1B] mb-4" size={48} />
          <h2 className="text-2xl font-semibold text-[#432818] mb-2">No Favorites Yet</h2>
          <p className="text-[#432818]/70 mb-4">Start adding events to your favorites to see them here!</p>
          <button
            onClick={() => navigate('/dashboard/attendee')}
            className="px-6 py-2 bg-[#6F1D1B] text-[#FFE6A7] rounded-lg hover:bg-[#99582A] transition-colors"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE6A7] px-4 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#432818] mb-8">Your Favorite Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((event) => (
            <div
              key={event.id}
              className="group relative bg-[#432818] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6F1D1B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(event.id);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-[#432818]/80 text-[#FFE6A7] hover:bg-[#6F1D1B] transition-colors"
                  aria-label="Remove from favorites"
                >
                  <Heart size={20} fill="#FFE6A7" />
                </button>
              </div>
              <div className="p-4 cursor-pointer">
                <h3 className="text-xl font-semibold text-[#FFE6A7] mb-2 line-clamp-1">{event.title}</h3>
                <p className="text-[#FFE6A7]/70 mb-4 text-sm line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-4 text-sm text-[#FFE6A7]/70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-[#FFE6A7] font-semibold">${event.price}</span>
                  <span className="text-[#FFE6A7]/60 text-sm">{event.availableTickets} tickets left</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage; 
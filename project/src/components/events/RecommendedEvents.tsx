import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { getRecommendedEvents } from '../../utils/recommendations';
import type { Event } from '../../data/events';

const RecommendedEvents: React.FC = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const favoriteIds = favorites.map((e) => e.id);
  const recommended = getRecommendedEvents(favoriteIds, 4);

  if (recommended.length === 0) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-[#FFE6A7]" size={20} />
        <h2 className="text-xl font-bold text-[#FFE6A7]">Recommended For You</h2>
      </div>

      {/* Horizontal scroll row */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {recommended.map((event: Event, i) => (
          <div
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="group flex-shrink-0 w-64 bg-[#432818] rounded-xl overflow-hidden cursor-pointer
                       hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Image */}
            <div className="relative h-36 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#432818]/80 to-transparent" />
              {/* Type badge */}
              <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#6F1D1B] text-[#FFE6A7]">
                {event.type}
              </span>
            </div>

            {/* Info */}
            <div className="p-3 space-y-1.5">
              <h3 className="text-sm font-semibold text-[#FFE6A7] line-clamp-1">{event.title}</h3>
              <div className="flex items-center gap-1 text-xs text-[#BB9457]">
                <Calendar size={12} />
                <span>{formatDate(event.startDateTime)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#BB9457]">
                <MapPin size={12} />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-[#FFE6A7] font-bold text-sm">
                  <DollarSign size={12} />
                  <span>{event.price.toFixed(2)}</span>
                </div>
                <span className="text-xs text-[#BB9457]">{event.availableTickets} left</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedEvents;

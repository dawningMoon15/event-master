import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Calendar, Clock, MapPin, ArrowLeft, Ticket } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { getEventById } from '../../data/events';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite, recordView } = useFavorites();

  const event = id ? getEventById(id) : undefined;

  // Record the view for recommendation signals on mount
  useEffect(() => {
    if (event) recordView(event);
  }, [event]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFavoriteClick = () => {
    if (!event) return;
    if (isFavorite(event.id)) removeFavorite(event.id);
    else addFavorite(event);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const formatTime = (timeString: string) =>
    new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-[#6F1D1B] text-xl mb-4">Event not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[#FFE6A7] hover:text-[#BB9457] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Events</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back + Favourite */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#FFE6A7] hover:text-[#BB9457] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Events</span>
        </button>
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-colors ${
            isFavorite(event.id) ? 'text-[#6F1D1B]' : 'text-[#FFE6A7]'
          } hover:text-[#6F1D1B]`}
          aria-label={isFavorite(event.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={24} fill={isFavorite(event.id) ? '#6F1D1B' : 'none'} />
        </button>
      </div>

      {/* Hero */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#432818] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl font-bold text-[#FFE6A7] mb-2">{event.title}</h1>
          <div className="flex items-center gap-4 text-[#BB9457]">
            <div className="flex items-center gap-1">
              <Calendar size={20} />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={20} />
              <span>{formatTime(event.time)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — Details */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#432818] rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">About This Event</h2>
            <p className="text-[#BB9457] leading-relaxed">{event.description}</p>
          </section>

          {event.artists.length > 0 && (
            <section className="bg-[#432818] rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Featured Artists</h2>
              <div className="space-y-4">
                {event.artists.map((artist) => (
                  <div key={artist.name} className="flex items-center gap-4">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-[#FFE6A7] font-medium">{artist.name}</h3>
                      <p className="text-[#BB9457] text-sm">{artist.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-[#432818] rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Venue</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-[#BB9457]">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#FFE6A7]">{event.venue.name}</p>
                  <p>{event.venue.address}</p>
                </div>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={event.venue.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Event venue map"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right — Ticket */}
        <div className="lg:col-span-1">
          <div className="bg-[#432818] rounded-xl p-6 sticky top-4">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Ticket Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#BB9457]">Price per ticket</span>
                <span className="text-2xl font-bold text-[#FFE6A7]">${event.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-[#BB9457]">
                <Ticket size={20} />
                <span>{event.availableTickets} tickets available</span>
              </div>
              <button
                onClick={() => navigate(`/events/${id}/purchase`)}
                className="w-full bg-[#6F1D1B] text-[#FFE6A7] py-3 rounded-lg hover:bg-[#99582A] transition-colors"
              >
                Purchase Tickets
              </button>
              <p className="text-sm text-[#BB9457] text-center">Secure checkout powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
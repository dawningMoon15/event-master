import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Calendar, Clock, MapPin, ArrowLeft, Users, Ticket } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';

interface Artist {
  name: string;
  role: string;
  imageUrl: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: {
    name: string;
    address: string;
    mapUrl: string;
  };
  imageUrl: string;
  artists: Artist[];
  type: string;
  price: number;
  availableTickets: number;
}

type MockEvents = {
  [key: string]: Event;
};

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // Mock API call - replace with actual API call
        const mockEvents: MockEvents = {
          '1': {
            id: '1',
            title: 'Summer Music Festival',
            description: 'A weekend of amazing music and performances featuring top artists from around the world.',
            date: '2024-07-15',
            time: '16:00',
            location: 'Central Park',
            venue: {
              name: 'Central Park Amphitheater',
              address: '123 Park Avenue, New York, NY 10022',
              mapUrl: 'https://maps.google.com/maps?q=central+park+ny&output=embed'
            },
            imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
            artists: [
              {
                name: 'Sarah Johnson',
                role: 'Headliner',
                imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
              },
              {
                name: 'The Midnight Band',
                role: 'Supporting Act',
                imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d'
              }
            ],
            type: 'Music',
            price: 89.99,
            availableTickets: 150
          },
          '2': {
            id: '2',
            title: 'Halloween Masquerade Ball',
            description: 'An elegant evening of mystery, music, and dance. Costumes required!',
            date: '2024-10-31',
            time: '20:00',
            location: 'Grand Plaza Hotel',
            venue: {
              name: 'Grand Plaza Ballroom',
              address: '456 Luxury Ave, New York, NY 10023',
              mapUrl: 'https://maps.google.com/maps?q=grand+plaza+ny&output=embed'
            },
            imageUrl: 'https://images.unsplash.com/photo-1509666537727-9154b6962292',
            artists: [
              {
                name: 'DJ Phantom',
                role: 'Main DJ',
                imageUrl: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7'
              }
            ],
            type: 'Party',
            price: 120.00,
            availableTickets: 200
          },
          '3': {
            id: '3',
            title: 'Fall Food & Wine Festival',
            description: 'Celebrate autumn flavors with local wineries and gourmet food vendors',
            date: '2024-09-15',
            time: '12:00',
            location: 'Riverside Gardens',
            venue: {
              name: 'Riverside Gardens Event Space',
              address: '789 River Road, New York, NY 10024',
              mapUrl: 'https://maps.google.com/maps?q=riverside+gardens+ny&output=embed'
            },
            imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
            artists: [
              {
                name: 'Chef Maria Rodriguez',
                role: 'Featured Chef',
                imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
              }
            ],
            type: 'Food & Drink',
            price: 75.00,
            availableTickets: 300
          }
        };

        if (!id || !mockEvents[id]) {
          throw new Error('Event not found');
        }

        setEvent(mockEvents[id]);
        setError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!event) return;
    if (isFavorite(event.id)) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6F1D1B]"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
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
      {/* Back Button and Favorite */}
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

      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
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
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section className="bg-[#432818] rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">About This Event</h2>
            <p className="text-[#BB9457] leading-relaxed">{event.description}</p>
          </section>

          {/* Artist List */}
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

          {/* Venue Map */}
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

        {/* Right Column - Ticket Info */}
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
              <p className="text-sm text-[#BB9457] text-center">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 
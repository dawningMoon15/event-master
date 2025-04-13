import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Filter, Grid, List, Tag, X, Heart, User, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';

interface Organizer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Artist {
  name: string;
  role: string;
  imageUrl: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
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
  organizer: Organizer;
  date: string;
}

interface EventFeedProps {
  onEventSelect?: (event: Event) => void;
}

const EventFeed: React.FC<EventFeedProps> = ({ onEventSelect }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    location: 'all',
    date: 'all',
    priceRange: 'all',
    timeStatus: 'all'
  });
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  // Handle click outside of search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update the search function to include artists
  const searchEvents = (query: string, eventsToSearch: Event[]) => {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return eventsToSearch
      .map(event => {
        const artistNames = event.artists.map(artist => `${artist.name} ${artist.role}`).join(' ');
        const searchableText = `${event.title} ${event.description} ${event.location} ${event.type} ${artistNames}`.toLowerCase();
        
        // Calculate relevance score
        const score = searchTerms.reduce((acc, term) => {
          const matches = (searchableText.match(new RegExp(term, 'g')) || []).length;
          // Title and artist matches are worth more
          const titleMatches = (event.title.toLowerCase().match(new RegExp(term, 'g')) || []).length;
          const artistMatches = (artistNames.toLowerCase().match(new RegExp(term, 'g')) || []).length;
          return acc + matches + (titleMatches * 2) + (artistMatches * 2);
        }, 0);

        return { event, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ event }) => event);
  };

  // Update search results when search input changes
  const handleSearchChange = (value: string) => {
    setFilters({ ...filters, search: value, timeStatus: filters.timeStatus });
    if (value.length > 0) {
      const results = searchEvents(value, events);
      setSearchResults(results.slice(0, 5));
      setShowAutocomplete(true);
    } else {
      setSearchResults([]);
      setShowAutocomplete(false);
    }
  };

  // Update clearSearch to include timeStatus
  const clearSearch = () => {
    setFilters({ ...filters, search: '', timeStatus: filters.timeStatus });
    setSearchResults([]);
    setShowAutocomplete(false);
  };

  // Update handleSelectSuggestion to include timeStatus
  const handleSelectSuggestion = (event: Event) => {
    setFilters({ ...filters, search: event.title, timeStatus: filters.timeStatus });
    setShowAutocomplete(false);
  };

  // Helper functions for date comparison
  const isToday = (dateTime: string) => {
    const date = new Date(dateTime);
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isThisWeek = (dateTime: string) => {
    const date = new Date(dateTime);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() + 6));
    return date >= weekStart && date <= weekEnd;
  };

  const isThisMonth = (dateTime: string) => {
    const date = new Date(dateTime);
    const today = new Date();
    return date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Add helper functions for time status
  const getEventStatus = (event: Event): 'ongoing' | 'upcoming' | 'past' => {
    const now = new Date();
    const startDate = new Date(event.startDateTime);
    const endDate = new Date(event.endDateTime);
    
    if (now >= startDate && now <= endDate) {
      return 'ongoing';
    } else if (now < startDate) {
      return 'upcoming';
    } else {
      return 'past';
    }
  };

  // Mock data for demonstration
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Summer Music Festival',
        description: 'A magical evening of jazz under the stars featuring world-renowned artists and local talents',
        startDateTime: '2024-07-15T16:00:00',
        endDateTime: '2024-07-15T23:00:00',
        date: '2024-07-15',
        location: 'Central Park Amphitheater',
        venue: {
          name: 'Central Park Amphitheater',
          address: '123 Park Avenue, New York, NY 10022',
          mapUrl: 'https://maps.google.com/maps?q=central+park+ny&output=embed'
        },
        imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629',
        type: 'Music',
        price: 89.99,
        availableTickets: 150,
        artists: [
          {
            name: 'Sarah Johnson',
            role: 'Headliner',
            imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
          }
        ],
        organizer: {
          id: 'org1',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@events.com'
        }
      },
      {
        id: '2',
        title: 'Halloween Masquerade Ball',
        description: 'An elegant evening of mystery, music, and dance. Costumes required!',
        startDateTime: '2024-10-31T20:00:00',
        endDateTime: '2024-11-01T02:00:00',
        date: '2024-10-31',
        location: 'Grand Plaza Hotel',
        venue: {
          name: 'Grand Plaza Ballroom',
          address: '456 Luxury Ave, New York, NY 10023',
          mapUrl: 'https://maps.google.com/maps?q=grand+plaza+ny&output=embed'
        },
        imageUrl: 'https://images.unsplash.com/photo-1509666537727-9154b6962292',
        type: 'Party',
        price: 120.00,
        availableTickets: 200,
        artists: [
          {
            name: 'DJ Phantom',
            role: 'Main DJ',
            imageUrl: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7'
          }
        ],
        organizer: {
          id: 'org2',
          firstName: 'Emily',
          lastName: 'Johnson',
          email: 'emily.j@events.com'
        }
      },
      {
        id: '3',
        title: 'Fall Food & Wine Festival',
        description: 'Celebrate autumn flavors with local wineries and gourmet food vendors',
        startDateTime: '2024-09-15T12:00:00',
        endDateTime: '2024-09-15T20:00:00',
        date: '2024-09-15',
        location: 'Riverside Gardens',
        venue: {
          name: 'Riverside Gardens Event Space',
          address: '789 River Road, New York, NY 10024',
          mapUrl: 'https://maps.google.com/maps?q=riverside+gardens+ny&output=embed'
        },
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
        type: 'Food & Drink',
        price: 75.00,
        availableTickets: 300,
        artists: [],
        organizer: {
          id: 'org3',
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michael.b@events.com'
        }
      },
      {
        id: '4',
        title: 'Tech Innovation Summit 2025',
        description: 'Join industry leaders and innovators for a day of cutting-edge technology discussions',
        startDateTime: '2025-10-20',
        endDateTime: '2025-10-20',
        date: '2025-10-20',
        location: 'Convention Center',
        venue: {
          name: 'Convention Center',
          address: '123 Convention St, New York, NY 10024',
          mapUrl: 'https://maps.google.com/maps?q=convention+center+ny&output=embed'
        },
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        type: 'Conference',
        price: 299.99,
        availableTickets: 400,
        artists: [],
        organizer: {
          id: 'org4',
          firstName: 'Sophia',
          lastName: 'Lee',
          email: 'sophia.l@events.com'
        }
      },
      {
        id: '5',
        title: 'Autumn Art Fair',
        description: 'Showcase featuring local artists, live demonstrations, and interactive workshops',
        startDateTime: '2025-10-08',
        endDateTime: '2025-10-08',
        date: '2025-10-08',
        location: 'City Art Gallery',
        venue: {
          name: 'City Art Gallery',
          address: '456 Art St, New York, NY 10024',
          mapUrl: 'https://maps.google.com/maps?q=city+art+gallery+ny&output=embed'
        },
        imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
        type: 'Art',
        price: 25.00,
        availableTickets: 250,
        artists: [],
        organizer: {
          id: 'org5',
          firstName: 'Ethan',
          lastName: 'Wang',
          email: 'ethan.w@events.com'
        }
      },
      {
        id: '6',
        title: 'Fall Classical Concert',
        description: 'An evening of Beethoven, Mozart, and Tchaikovsky performed by the City Symphony',
        startDateTime: '2025-10-25',
        endDateTime: '2025-10-25',
        date: '2025-10-25',
        location: 'Symphony Hall',
        venue: {
          name: 'Symphony Hall',
          address: '789 Music St, New York, NY 10024',
          mapUrl: 'https://maps.google.com/maps?q=symphony+hall+ny&output=embed'
        },
        imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6',
        type: 'Music',
        price: 150.00,
        availableTickets: 180,
        artists: [],
        organizer: {
          id: 'org6',
          firstName: 'Ava',
          lastName: 'Chen',
          email: 'ava.c@events.com'
        }
      },
      {
        id: '7',
        title: 'Oktoberfest Celebration',
        description: 'Traditional German beer, food, and music festival',
        startDateTime: '2025-10-05',
        endDateTime: '2025-10-05',
        date: '2025-10-05',
        location: 'Riverfront Park',
        venue: {
          name: 'Riverfront Park',
          address: '123 Riverfront St, New York, NY 10024',
          mapUrl: 'https://maps.google.com/maps?q=riverfront+park+ny&output=embed'
        },
        imageUrl: 'https://images.unsplash.com/photo-1505075106905-fb052892c116',
        type: 'Festival',
        price: 45.00,
        availableTickets: 500,
        artists: [],
        organizer: {
          id: 'org7',
          firstName: 'Liam',
          lastName: 'Nguyen',
          email: 'liam.n@events.com'
        }
      },
      {
        id: '8',
        title: 'Stand-up Comedy Night',
        description: 'A hilarious evening featuring top comedians from around the country',
        startDateTime: '2025-10-18',
        endDateTime: '2025-10-18',
        date: '2025-10-18',
        location: 'Laugh Factory',
        venue: {
          name: 'Laugh Factory',
          address: '456 Comedy St, New York, NY 10024',
          mapUrl: 'https://maps.google.com/maps?q=laugh+factory+ny&output=embed'
        },
        imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca',
        type: 'Comedy',
        price: 35.00,
        availableTickets: 120,
        artists: [],
        organizer: {
          id: 'org8',
          firstName: 'Mia',
          lastName: 'Kim',
          email: 'mia.k@events.com'
        }
      }
    ];
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  // Modify the filtering logic to include time status
  const getFilteredEvents = () => {
    return events.filter(event => {
      const matchesSearch = filters.search
        ? event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.description.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      const matchesType = filters.type === 'all' ? true : event.type === filters.type;
      const matchesLocation = filters.location === 'all' ? true : event.location === filters.location;
      
      let matchesDate = true;
      if (filters.date !== 'all') {
        if (filters.date === 'today') matchesDate = isToday(event.startDateTime);
        else if (filters.date === 'this-week') matchesDate = isThisWeek(event.startDateTime);
        else if (filters.date === 'this-month') matchesDate = isThisMonth(event.startDateTime);
      }

      let matchesPrice = true;
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        matchesPrice = event.price >= min && (max ? event.price <= max : true);
      }

      const matchesTimeStatus = filters.timeStatus === 'all' ? true : getEventStatus(event) === filters.timeStatus;

      return matchesSearch && matchesType && matchesLocation && matchesDate && matchesPrice && matchesTimeStatus;
    });
  };

  const uniqueTypes = Array.from(new Set(events.map(event => event.type)));
  const uniqueLocations = Array.from(new Set(events.map(event => event.location)));

  const handleEventClick = (event: Event) => {
    navigate(`/events/${event.id}`);
  };

  const handleFavoriteClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event card click when clicking heart
    if (isFavorite(event.id)) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

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
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFE6A7]" size={20} />
            <input
              type="text"
              placeholder="Search events, artists, or performers..."
              className="w-full pl-10 pr-10 py-3 bg-[#99582A] rounded-lg placeholder-[#FFE6A7]/70 text-[#FFE6A7] outline-none"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => filters.search && setShowAutocomplete(true)}
            />
            {filters.search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FFE6A7] hover:text-[#FFE6A7]/70 transition-colors"
              >
                <X size={16} />
              </button>
            )}
            
            {/* Updated Autocomplete Dropdown */}
            {showAutocomplete && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-[#432818] rounded-lg shadow-lg overflow-hidden">
                {searchResults.map((event) => (
                  <button
                    key={event.id}
                    className="w-full px-4 py-3 text-left hover:bg-[#99582A] transition-colors flex items-center gap-3 text-[#FFE6A7]"
                    onClick={() => handleSelectSuggestion(event)}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      {event.artists && event.artists.length > 0 && (
                        <div className="text-sm text-[#BB9457] mt-1">
                          Featuring: {event.artists.map(artist => artist.name).join(', ')}
                        </div>
                      )}
                      <div className="text-sm text-[#BB9457] line-clamp-1 mt-1">{event.description}</div>
                    </div>
                    <div className="text-sm text-[#BB9457] flex flex-col items-end">
                      <span>{event.type}</span>
                      <span className="mt-1">{formatDate(event.startDateTime)}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                filters.type !== 'all' || filters.location !== 'all' || filters.date !== 'all' || filters.priceRange !== 'all'
                  ? 'bg-[#6F1D1B] text-[#FFE6A7]'
                  : 'bg-[#99582A] text-[#FFE6A7] hover:bg-[#432818]'
              }`}
              onClick={() => setFilters({
                search: '',
                type: 'all',
                location: 'all',
                date: 'all',
                priceRange: 'all',
                timeStatus: filters.timeStatus
              })}
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
            <button
              className="p-3 bg-[#99582A] text-[#FFE6A7] rounded-lg hover:bg-[#432818] transition-colors"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <select
            className="w-full px-4 py-3 bg-[#99582A] rounded-lg text-[#FFE6A7] appearance-none cursor-pointer hover:bg-[#432818] transition-colors outline-none"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="all">All Types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            className="w-full px-4 py-3 bg-[#99582A] rounded-lg text-[#FFE6A7] appearance-none cursor-pointer hover:bg-[#432818] transition-colors outline-none"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="all">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            className="w-full px-4 py-3 bg-[#99582A] rounded-lg text-[#FFE6A7] appearance-none cursor-pointer hover:bg-[#432818] transition-colors outline-none"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>

          <select
            className="w-full px-4 py-3 bg-[#99582A] rounded-lg text-[#FFE6A7] appearance-none cursor-pointer hover:bg-[#432818] transition-colors outline-none"
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          >
            <option value="all">All Prices</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200">$200+</option>
          </select>

          <select
            className="w-full px-4 py-3 bg-[#99582A] rounded-lg text-[#FFE6A7] appearance-none cursor-pointer hover:bg-[#432818] transition-colors outline-none"
            value={filters.timeStatus}
            onChange={(e) => setFilters({ ...filters, timeStatus: e.target.value })}
          >
            <option value="all">All Events</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <div className="flex justify-end">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              filters.type !== 'all' || filters.location !== 'all' || filters.date !== 'all' || filters.priceRange !== 'all' || filters.timeStatus !== 'all'
                ? 'bg-[#6F1D1B] text-[#FFE6A7]'
                : 'bg-[#99582A] text-[#FFE6A7] hover:bg-[#432818]'
            }`}
            onClick={() => setFilters({
              search: '',
              type: 'all',
              location: 'all',
              date: 'all',
              priceRange: 'all',
              timeStatus: 'all'
            })}
          >
            <Filter size={20} />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Events Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {getFilteredEvents().map(event => (
          <div
            key={event.id}
            className={`group bg-[#432818] rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer ${
              viewMode === 'list' ? 'flex' : ''
            }`}
            onClick={() => handleEventClick(event)}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full'}`}>
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6F1D1B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <button
                onClick={(e) => handleFavoriteClick(event, e)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#432818]/80 text-[#FFE6A7] hover:bg-[#6F1D1B] transition-colors"
                aria-label={isFavorite(event.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  size={20}
                  fill={isFavorite(event.id) ? '#FFE6A7' : 'none'}
                  className="transition-colors"
                />
              </button>
            </div>
            <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
              <h3 className="text-lg font-semibold text-[#FFE6A7] mb-2 line-clamp-1">{event.title}</h3>
              <p className="text-[#BB9457] text-sm mb-4 line-clamp-2">{event.description}</p>
              
              {/* Add Artists Section */}
              {event.artists && event.artists.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {event.artists.map((artist, index) => (
                      <div 
                        key={`${event.id}-${artist.name}-${index}`}
                        className="flex items-center gap-1 bg-[#6F1D1B] rounded-full px-3 py-1"
                      >
                        <img 
                          src={artist.imageUrl} 
                          alt={artist.name}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span className="text-xs text-[#FFE6A7]">{artist.name}</span>
                        <span className="text-xs text-[#BB9457]">• {artist.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-sm text-[#BB9457]">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(event.startDateTime)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>

              {/* Organizer Info */}
              <div className="mt-3 flex items-center gap-2 text-sm text-[#BB9457]">
                <User size={16} />
                <span>{event.organizer.firstName} {event.organizer.lastName}</span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-[#FFE6A7] font-semibold">${event.price.toFixed(2)}</span>
                <span className="text-sm text-[#BB9457]">
                  {event.availableTickets} tickets left
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getFilteredEvents().length === 0 && (
        <div className="bg-[#432818] rounded-xl shadow-sm p-8 text-center">
          <Calendar className="w-12 h-12 text-[#BB9457] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#FFE6A7] mb-2">No Events Found</h3>
          <p className="text-[#BB9457]">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};

export default EventFeed; 
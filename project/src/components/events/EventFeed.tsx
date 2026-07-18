import React, { useState, useEffect, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, MapPin, Calendar, Filter, Grid, List, X, Heart, User, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { MOCK_EVENTS, Event } from '../../data/events';

interface Filters {
  search: string;
  type: string;
  location: string;
  date: string;
  priceRange: string;
  timeStatus: string;
}

const EventFeed: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    type: 'all',
    location: 'all',
    date: 'all',
    priceRange: 'all',
    timeStatus: 'all',
  });
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  // ── Fuse.js instance (memoised — rebuilt only when event list changes) ──
  const fuse = useMemo(
    () =>
      new Fuse(MOCK_EVENTS, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'artists.name', weight: 2 },
          { name: 'type', weight: 2 },
          { name: 'description', weight: 1 },
          { name: 'location', weight: 1 },
        ],
        threshold: 0.4, // tolerates typos
        includeScore: true,
        minMatchCharLength: 2,
      }),
    []
  );

  // ── Close autocomplete on outside click ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Fuzzy search handler ──
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
    if (value.length >= 2) {
      const results = fuse.search(value).map(({ item }) => item).slice(0, 5);
      setSearchResults(results);
      setShowAutocomplete(true);
    } else {
      setSearchResults([]);
      setShowAutocomplete(false);
    }
  };

  const clearSearch = () => {
    setFilters((prev) => ({ ...prev, search: '' }));
    setSearchResults([]);
    setShowAutocomplete(false);
  };

  const handleSelectSuggestion = (event: Event) => {
    setFilters((prev) => ({ ...prev, search: event.title }));
    setShowAutocomplete(false);
  };

  // ── Date helpers ──
  const isToday = (dt: string) => {
    const d = new Date(dt), t = new Date();
    return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  };
  const isThisWeek = (dt: string) => {
    const d = new Date(dt), t = new Date();
    const start = new Date(t.setDate(t.getDate() - t.getDay()));
    const end = new Date(t.setDate(t.getDate() + 6));
    return d >= start && d <= end;
  };
  const isThisMonth = (dt: string) => {
    const d = new Date(dt), t = new Date();
    return d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  };
  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const getEventStatus = (event: Event): 'ongoing' | 'upcoming' | 'past' => {
    const now = new Date();
    const start = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);
    if (now >= start && now <= end) return 'ongoing';
    if (now < start) return 'upcoming';
    return 'past';
  };

  // ── Combined filter pipeline ──
  const getFilteredEvents = (): Event[] => {
    // Fuzzy search first (if query present)
    let pool: Event[] = filters.search.length >= 2
      ? fuse.search(filters.search).map(({ item }) => item)
      : [...MOCK_EVENTS];

    return pool.filter((event) => {
      const matchesType = filters.type === 'all' || event.type === filters.type;
      const matchesLocation = filters.location === 'all' || event.location === filters.location;

      let matchesDate = true;
      if (filters.date === 'today') matchesDate = isToday(event.startDateTime);
      else if (filters.date === 'this-week') matchesDate = isThisWeek(event.startDateTime);
      else if (filters.date === 'this-month') matchesDate = isThisMonth(event.startDateTime);

      let matchesPrice = true;
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        matchesPrice = event.price >= min && (max ? event.price <= max : true);
      }

      const matchesTimeStatus =
        filters.timeStatus === 'all' || getEventStatus(event) === filters.timeStatus;

      return matchesType && matchesLocation && matchesDate && matchesPrice && matchesTimeStatus;
    });
  };

  const uniqueTypes = Array.from(new Set(MOCK_EVENTS.map((e) => e.type)));
  const uniqueLocations = Array.from(new Set(MOCK_EVENTS.map((e) => e.location)));

  const handleEventClick = (event: Event) => navigate(`/events/${event.id}`);

  const handleFavoriteClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(event.id)) removeFavorite(event.id);
    else addFavorite(event);
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className="space-y-8">
      {/* ── Search + Controls ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* Fuzzy search bar */}
          <div className="relative flex-1" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFE6A7]" size={20} />
            <input
              type="text"
              placeholder="Search events, artists, or performers… (typos OK!)"
              className="w-full pl-10 pr-10 py-3 bg-[#99582A] rounded-lg placeholder-[#FFE6A7]/70 text-[#FFE6A7] outline-none"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => filters.search && setShowAutocomplete(true)}
            />
            {filters.search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FFE6A7] hover:text-[#FFE6A7]/70 transition-colors"
              >
                <X size={16} />
              </button>
            )}

            {/* Autocomplete dropdown */}
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
                      {event.artists.length > 0 && (
                        <div className="text-sm text-[#BB9457] mt-0.5">
                          Featuring: {event.artists.map((a) => a.name).join(', ')}
                        </div>
                      )}
                      <div className="text-sm text-[#BB9457] line-clamp-1 mt-0.5">{event.description}</div>
                    </div>
                    <div className="text-sm text-[#BB9457] flex flex-col items-end shrink-0">
                      <span>{event.type}</span>
                      <span className="mt-1">{formatDate(event.startDateTime)}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View toggle */}
          <button
            className="p-3 bg-[#99582A] text-[#FFE6A7] rounded-lg hover:bg-[#432818] transition-colors"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            title={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
          >
            {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
          </button>
        </div>

        {/* Filter row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              value: filters.type,
              onChange: (v: string) => setFilters((p) => ({ ...p, type: v })),
              options: [['all', 'All Types'], ...uniqueTypes.map((t) => [t, t])],
            },
            {
              value: filters.location,
              onChange: (v: string) => setFilters((p) => ({ ...p, location: v })),
              options: [['all', 'All Locations'], ...uniqueLocations.map((l) => [l, l])],
            },
            {
              value: filters.date,
              onChange: (v: string) => setFilters((p) => ({ ...p, date: v })),
              options: [['all', 'All Dates'], ['today', 'Today'], ['this-week', 'This Week'], ['this-month', 'This Month']],
            },
            {
              value: filters.priceRange,
              onChange: (v: string) => setFilters((p) => ({ ...p, priceRange: v })),
              options: [['all', 'All Prices'], ['0-50', 'Under $50'], ['50-100', '$50–$100'], ['100-200', '$100–$200'], ['200', '$200+']],
            },
            {
              value: filters.timeStatus,
              onChange: (v: string) => setFilters((p) => ({ ...p, timeStatus: v })),
              options: [['all', 'All Events'], ['ongoing', 'Ongoing'], ['upcoming', 'Upcoming'], ['past', 'Past']],
            },
          ].map(({ value, onChange, options }, i) => (
            <select
              key={i}
              className="w-full px-4 py-3 bg-[#99582A] rounded-lg text-[#FFE6A7] appearance-none cursor-pointer hover:bg-[#432818] transition-colors outline-none"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {(options as [string, string][]).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          ))}
        </div>

        {/* Reset */}
        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#99582A] text-[#FFE6A7] hover:bg-[#432818] rounded-lg transition-colors"
            onClick={() =>
              setFilters({ search: '', type: 'all', location: 'all', date: 'all', priceRange: 'all', timeStatus: 'all' })
            }
          >
            <Filter size={16} />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* ── Event Grid / List ── */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredEvents.map((event) => (
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
                <Heart size={20} fill={isFavorite(event.id) ? '#FFE6A7' : 'none'} className="transition-colors" />
              </button>
            </div>

            <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
              <h3 className="text-lg font-semibold text-[#FFE6A7] mb-2 line-clamp-1">{event.title}</h3>
              <p className="text-[#BB9457] text-sm mb-4 line-clamp-2">{event.description}</p>

              {event.artists.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {event.artists.map((artist, idx) => (
                    <div
                      key={`${event.id}-${artist.name}-${idx}`}
                      className="flex items-center gap-1 bg-[#6F1D1B] rounded-full px-3 py-1"
                    >
                      <img src={artist.imageUrl} alt={artist.name} className="w-4 h-4 rounded-full object-cover" />
                      <span className="text-xs text-[#FFE6A7]">{artist.name}</span>
                      <span className="text-xs text-[#BB9457]">• {artist.role}</span>
                    </div>
                  ))}
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

              <div className="mt-3 flex items-center gap-2 text-sm text-[#BB9457]">
                <User size={16} />
                <span>{event.organizer.firstName} {event.organizer.lastName}</span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-[#FFE6A7] font-semibold">${event.price.toFixed(2)}</span>
                <span className="text-sm text-[#BB9457]">{event.availableTickets} tickets left</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="bg-[#432818] rounded-xl shadow-sm p-8 text-center">
          <Calendar className="w-12 h-12 text-[#BB9457] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#FFE6A7] mb-2">No Events Found</h3>
          <p className="text-[#BB9457]">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default EventFeed;
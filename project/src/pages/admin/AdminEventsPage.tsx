import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, Filter, Eye, EyeOff, Music, Users, Ticket, DollarSign, ArrowUpDown, Star, Search, X } from 'lucide-react';

interface Artist {
  name: string;
  role: string;
  imageUrl: string;
}

interface Organizer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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
}

interface Column {
  key: keyof Event | 'organizer.fullName' | 'organizer.email' | 'ticketsBooked' | 'venue.name';
  label: string;
  visible: boolean;
}

const AdminEventsPage = () => {
  // Mock data with realistic events
  const events: Event[] = [
    {
      id: '1',
      title: 'Summer Music Festival',
      description: 'A magical evening of jazz under the stars featuring world-renowned artists and local talents',
      startDateTime: '2024-07-15T16:00:00',
      endDateTime: '2024-07-15T23:00:00',
      location: 'Central Park Amphitheater',
      venue: {
        name: 'Central Park Amphitheater',
        address: '123 Park Avenue, New York, NY 10022',
        mapUrl: 'https://maps.google.com/maps?q=central+park+ny'
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
      title: 'Tech Conference 2024',
      description: 'Join industry leaders for cutting-edge insights and networking opportunities',
      startDateTime: '2024-08-20T09:00:00',
      endDateTime: '2024-08-20T18:00:00',
      location: 'Convention Center',
      venue: {
        name: 'Metropolitan Convention Center',
        address: '789 Tech Blvd, New York, NY 10001',
        mapUrl: 'https://maps.google.com/maps?q=convention+center+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
      type: 'Technology',
      price: 299.99,
      availableTickets: 500,
      artists: [],
      organizer: {
        id: 'org2',
        firstName: 'Alice',
        lastName: 'Chen',
        email: 'alice.chen@techevents.com'
      }
    },
    {
      id: '3',
      title: 'Food & Wine Festival',
      description: 'Experience culinary delights and wine tastings from around the world',
      startDateTime: '2024-06-10T11:00:00',
      endDateTime: '2024-06-10T20:00:00',
      location: 'Riverside Gardens',
      venue: {
        name: 'Riverside Gardens',
        address: '456 River Road, New York, NY 10023',
        mapUrl: 'https://maps.google.com/maps?q=riverside+gardens+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
      type: 'Food & Beverage',
      price: 75.00,
      availableTickets: 200,
      artists: [],
      organizer: {
        id: 'org3',
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria@culinaryarts.org'
      }
    },
    {
      id: '4',
      title: 'Art Exhibition: Modern Masters',
      description: 'Contemporary art showcase featuring emerging and established artists',
      startDateTime: '2024-05-01T10:00:00',
      endDateTime: '2024-05-01T20:00:00',
      location: 'Metropolitan Museum',
      venue: {
        name: 'Metropolitan Museum',
        address: '1000 Fifth Avenue, New York, NY 10028',
        mapUrl: 'https://maps.google.com/maps?q=metropolitan+museum+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5',
      type: 'Art',
      price: 25.00,
      availableTickets: 550,
      artists: [],
      organizer: {
        id: 'org4',
        firstName: 'David',
        lastName: 'Lee',
        email: 'david@metmuseum.org'
      }
    },
    {
      id: '5',
      title: 'Marathon 2024',
      description: 'Annual city marathon with professional and amateur divisions',
      startDateTime: '2024-09-30T06:00:00',
      endDateTime: '2024-09-30T15:00:00',
      location: 'City Streets',
      venue: {
        name: 'Central Park Start Line',
        address: 'Central Park, New York, NY 10024',
        mapUrl: 'https://maps.google.com/maps?q=central+park+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635',
      type: 'Sports',
      price: 85.00,
      availableTickets: 2500,
      artists: [],
      organizer: {
        id: 'org5',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael@sportsassoc.com'
      }
    },
    {
      id: '6',
      title: 'Comedy Night Special',
      description: 'An evening of laughter with top stand-up comedians',
      startDateTime: '2024-04-15T20:00:00',
      endDateTime: '2024-04-15T23:00:00',
      location: 'Grand Theater',
      venue: {
        name: 'Grand Theater',
        address: '789 Broadway, New York, NY 10003',
        mapUrl: 'https://maps.google.com/maps?q=grand+theater+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca',
      type: 'Entertainment',
      price: 35.00,
      availableTickets: 20,
      artists: [
        {
          name: 'Mike Thompson',
          role: 'Headliner',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
        }
      ],
      organizer: {
        id: 'org6',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah@laughfactory.com'
      }
    },
    {
      id: '7',
      title: 'Business Leadership Summit',
      description: 'Connect with industry leaders and learn from their experiences',
      startDateTime: '2024-08-05T08:00:00',
      endDateTime: '2024-08-05T17:00:00',
      location: 'Grand Hotel',
      venue: {
        name: 'Grand Hotel Conference Center',
        address: '123 Business Ave, New York, NY 10004',
        mapUrl: 'https://maps.google.com/maps?q=grand+hotel+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
      type: 'Business',
      price: 599.99,
      availableTickets: 300,
      artists: [],
      organizer: {
        id: 'org7',
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert@bni.com'
      }
    },
    {
      id: '8',
      title: 'Garden & Flower Show',
      description: 'Annual exhibition of rare flowers and garden designs',
      startDateTime: '2024-05-20T09:00:00',
      endDateTime: '2024-05-20T18:00:00',
      location: 'Botanical Gardens',
      venue: {
        name: 'City Botanical Gardens',
        address: '990 Washington Ave, New York, NY 11225',
        mapUrl: 'https://maps.google.com/maps?q=botanical+gardens+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      type: 'Lifestyle',
      price: 20.00,
      availableTickets: 200,
      artists: [],
      organizer: {
        id: 'org8',
        firstName: 'Emma',
        lastName: 'Davis',
        email: 'emma@botanical.org'
      }
    },
    {
      id: '9',
      title: 'Classical Music Concert',
      description: 'An evening of classical masterpieces',
      startDateTime: '2024-06-30T19:30:00',
      endDateTime: '2024-06-30T22:00:00',
      location: 'Concert Hall',
      venue: {
        name: 'City Concert Hall',
        address: '881 7th Avenue, New York, NY 10019',
        mapUrl: 'https://maps.google.com/maps?q=concert+hall+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0',
      type: 'Music',
      price: 150.00,
      availableTickets: 50,
      artists: [
        {
          name: 'Victoria Chang',
          role: 'Conductor',
          imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e'
        }
      ],
      organizer: {
        id: 'org9',
        firstName: 'Richard',
        lastName: 'Wagner',
        email: 'richard@symphony.org'
      }
    },
    {
      id: '10',
      title: 'Gaming Convention',
      description: 'The ultimate gaming experience with latest releases and tournaments',
      startDateTime: '2024-07-01T10:00:00',
      endDateTime: '2024-07-01T22:00:00',
      location: 'Expo Center',
      venue: {
        name: 'City Expo Center',
        address: '655 W 34th St, New York, NY 10001',
        mapUrl: 'https://maps.google.com/maps?q=expo+center+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
      type: 'Gaming',
      price: 45.00,
      availableTickets: 800,
      artists: [],
      organizer: {
        id: 'org10',
        firstName: 'Alex',
        lastName: 'Turner',
        email: 'alex@gamecon.com'
      }
    },
    {
      id: '11',
      title: 'Fashion Week Preview',
      description: 'Exclusive preview of upcoming fashion trends',
      startDateTime: '2024-09-15T18:00:00',
      endDateTime: '2024-09-15T22:00:00',
      location: 'Fashion Center',
      venue: {
        name: 'Metropolitan Fashion Center',
        address: '601 West 26th Street, New York, NY 10001',
        mapUrl: 'https://maps.google.com/maps?q=fashion+center+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1537832816519-689ad163238b',
      type: 'Fashion',
      price: 200.00,
      availableTickets: 150,
      artists: [],
      organizer: {
        id: 'org11',
        firstName: 'Isabella',
        lastName: 'Martinez',
        email: 'isabella@fashionweek.com'
      }
    },
    {
      id: '12',
      title: 'Science and Technology Expo',
      description: 'Showcasing the latest innovations in science and technology',
      startDateTime: '2024-10-10T09:00:00',
      endDateTime: '2024-10-10T18:00:00',
      location: 'Science Center',
      venue: {
        name: 'National Science Center',
        address: '47-01 111th Street, Queens, NY 11368',
        mapUrl: 'https://maps.google.com/maps?q=science+center+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      type: 'Science',
      price: 30.00,
      availableTickets: 400,
      artists: [],
      organizer: {
        id: 'org12',
        firstName: 'Thomas',
        lastName: 'Anderson',
        email: 'thomas@scienceexpo.com'
      }
    },
    {
      id: '13',
      title: 'International Film Festival',
      description: 'Celebrating independent films from around the world',
      startDateTime: '2024-11-01T11:00:00',
      endDateTime: '2024-11-07T23:00:00',
      location: 'Cinema Complex',
      venue: {
        name: 'Downtown Cinema Complex',
        address: '144 W 65th Street, New York, NY 10023',
        mapUrl: 'https://maps.google.com/maps?q=cinema+complex+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
      type: 'Film',
      price: 50.00,
      availableTickets: 300,
      artists: [],
      organizer: {
        id: 'org13',
        firstName: 'Sophie',
        lastName: 'Laurent',
        email: 'sophie@filmfest.com'
      }
    },
    {
      id: '14',
      title: 'Dance Workshop Series',
      description: 'Learn various dance styles from professional instructors',
      startDateTime: '2024-08-15T14:00:00',
      endDateTime: '2024-08-15T20:00:00',
      location: 'Dance Academy',
      venue: {
        name: 'City Dance Academy',
        address: '434 Avenue of the Americas, New York, NY 10011',
        mapUrl: 'https://maps.google.com/maps?q=dance+academy+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
      type: 'Dance',
      price: 40.00,
      availableTickets: 100,
      artists: [
        {
          name: 'Elena Rodriguez',
          role: 'Lead Instructor',
          imageUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b'
        }
      ],
      organizer: {
        id: 'org14',
        firstName: 'Carlos',
        lastName: 'Ruiz',
        email: 'carlos@danceacademy.com'
      }
    },
    {
      id: '15',
      title: 'Photography Exhibition',
      description: 'Showcasing works from emerging photographers',
      startDateTime: '2024-07-20T11:00:00',
      endDateTime: '2024-07-20T20:00:00',
      location: 'Art Gallery',
      venue: {
        name: 'Modern Art Gallery',
        address: '235 Bowery, New York, NY 10002',
        mapUrl: 'https://maps.google.com/maps?q=modern+art+gallery+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1552672205-c80c0c67f18d',
      type: 'Art',
      price: 15.00,
      availableTickets: 250,
      artists: [],
      organizer: {
        id: 'org15',
        firstName: 'Nina',
        lastName: 'Patel',
        email: 'nina@artgallery.com'
      }
    },
    {
      id: '16',
      title: 'Wellness and Yoga Retreat',
      description: 'A day of mindfulness, yoga, and wellness activities',
      startDateTime: '2024-06-25T08:00:00',
      endDateTime: '2024-06-25T17:00:00',
      location: 'Wellness Center',
      venue: {
        name: 'Urban Wellness Center',
        address: '123 Peace Street, Brooklyn, NY 11201',
        mapUrl: 'https://maps.google.com/maps?q=wellness+center+brooklyn'
      },
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      type: 'Wellness',
      price: 120.00,
      availableTickets: 80,
      artists: [],
      organizer: {
        id: 'org16',
        firstName: 'Maya',
        lastName: 'Singh',
        email: 'maya@wellnessretreat.com'
      }
    },
    {
      id: '17',
      title: 'Book Fair and Literary Festival',
      description: 'Meet authors and discover new books',
      startDateTime: '2024-09-05T10:00:00',
      endDateTime: '2024-09-05T19:00:00',
      location: 'Public Library',
      venue: {
        name: 'Central Public Library',
        address: '476 5th Ave, New York, NY 10018',
        mapUrl: 'https://maps.google.com/maps?q=public+library+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
      type: 'Literary',
      price: 0.00,
      availableTickets: 1000,
      artists: [],
      organizer: {
        id: 'org17',
        firstName: 'James',
        lastName: 'Wilson',
        email: 'james@literaryfest.com'
      }
    },
    {
      id: '18',
      title: 'Craft Beer Festival',
      description: 'Sample craft beers from local and international breweries',
      startDateTime: '2024-08-30T12:00:00',
      endDateTime: '2024-08-30T22:00:00',
      location: 'Waterfront Park',
      venue: {
        name: 'Waterfront Event Space',
        address: '89 South Street, New York, NY 10038',
        mapUrl: 'https://maps.google.com/maps?q=waterfront+park+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1575367439058-6096bb9cf5e2',
      type: 'Food & Beverage',
      price: 65.00,
      availableTickets: 450,
      artists: [],
      organizer: {
        id: 'org18',
        firstName: 'Samuel',
        lastName: 'Craft',
        email: 'samuel@beerfest.com'
      }
    },
    {
      id: '19',
      title: 'Children\'s Science Fair',
      description: 'Interactive science experiments and demonstrations for kids',
      startDateTime: '2024-07-10T09:00:00',
      endDateTime: '2024-07-10T16:00:00',
      location: 'Children\'s Museum',
      venue: {
        name: 'Children\'s Museum of Manhattan',
        address: '212 W 83rd St, New York, NY 10024',
        mapUrl: 'https://maps.google.com/maps?q=childrens+museum+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491',
      type: 'Education',
      price: 12.00,
      availableTickets: 300,
      artists: [],
      organizer: {
        id: 'org19',
        firstName: 'Linda',
        lastName: 'Thompson',
        email: 'linda@sciencefair.com'
      }
    },
    {
      id: '20',
      title: 'Vintage Car Show',
      description: 'Exhibition of classic and vintage automobiles',
      startDateTime: '2024-09-25T10:00:00',
      endDateTime: '2024-09-25T18:00:00',
      location: 'Auto Museum',
      venue: {
        name: 'Classic Car Museum',
        address: '1 Museum Mile, New York, NY 10029',
        mapUrl: 'https://maps.google.com/maps?q=auto+museum+ny'
      },
      imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
      type: 'Automotive',
      price: 25.00,
      availableTickets: 400,
      artists: [],
      organizer: {
        id: 'org20',
        firstName: 'George',
        lastName: 'Miller',
        email: 'george@carshow.com'
      }
    }
  ];

  const [columns, setColumns] = useState<Column[]>([
    { key: 'title', label: 'Event Name', visible: true },
    { key: 'organizer.fullName', label: 'Organizer', visible: true },
    { key: 'organizer.email', label: 'Email', visible: true },
    { key: 'type', label: 'Category', visible: true },
    { key: 'startDateTime', label: 'Date', visible: true },
    { key: 'location', label: 'Location', visible: true },
    { key: 'venue.name', label: 'Venue', visible: true },
    { key: 'price', label: 'Price', visible: true },
    { key: 'ticketsBooked', label: 'Tickets Available', visible: true }
  ]);

  // Add pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(10);
  const [showPerPageMenu, setShowPerPageMenu] = useState(false);
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const perPageOptions = [5, 10, 15, 20, 50];

  const filterEvents = (events: Event[]): Event[] => {
    if (!searchQuery) return events;
    
    const query = searchQuery.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.type.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.venue.name.toLowerCase().includes(query) ||
      `${event.organizer.firstName} ${event.organizer.lastName}`.toLowerCase().includes(query) ||
      event.organizer.email.toLowerCase().includes(query)
    );
  };

  const getSortedEvents = () => {
    const filteredEvents = filterEvents(events);
    return [...filteredEvents].sort((a, b) => {
      switch (currentSort) {
        case 'newest':
          return new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime();
        case 'oldest':
          return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
        case 'cheapest':
          return a.price - b.price;
        case 'expensive':
          return b.price - a.price;
        case 'popularity':
          return b.availableTickets - a.availableTickets;
        case 'least-popular':
          return a.availableTickets - b.availableTickets;
        case 'rating':
          const aRating = (a.availableTickets / a.availableTickets) * 100;
          const bRating = (b.availableTickets / b.availableTickets) * 100;
          return bRating - aRating;
        default:
          return 0;
      }
    });
  };

  const getPaginatedEvents = (sortedEvents: Event[]) => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    return sortedEvents.slice(startIndex, startIndex + eventsPerPage);
  };

  const sortedEvents = getSortedEvents();
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const paginatedEvents = getPaginatedEvents(sortedEvents);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'music':
        return <Music className="w-5 h-5" />;
      default:
        return <Music className="w-5 h-5" />;
    }
  };

  const getValue = (event: Event, key: string): string | number => {
    if (key === 'organizer.fullName') return `${event.organizer.firstName} ${event.organizer.lastName}`;
    if (key === 'organizer.email') return event.organizer.email;
    if (key === 'startDateTime') return new Date(event.startDateTime).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (key === 'price') return `$${event.price.toFixed(2)}`;
    if (key === 'ticketsBooked') return `${event.availableTickets}/${event.availableTickets + 500}`; // Mock total capacity
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      return (event as any)[parent]?.[child]?.toString() || '';
    }
    return (event as any)[key]?.toString() || '';
  };

  return (
    <div className="p-8 bg-[#FFE6A7]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[#432818]">Event Management</h1>
            <p className="text-[#432818]/70 text-lg">
              Showing <span className="font-medium text-[#432818]">{paginatedEvents.length}</span> of{' '}
              <span className="font-medium text-[#432818]">{filterEvents(events).length}</span> events
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-64 px-4 py-3 pr-10 bg-[#FFE6A7] border-2 border-[#432818] rounded-lg text-[#432818] placeholder-[#432818]/50 focus:outline-none focus:border-[#6F1D1B] transition-colors"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#432818]" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-[#432818] hover:text-[#6F1D1B]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowPerPageMenu(!showPerPageMenu)}
                className="flex items-center gap-3 px-6 py-3 bg-[#432818] text-[#FFE6A7] rounded-lg hover:bg-[#6F1D1B] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Users size={20} />
                <span className="font-medium">{eventsPerPage} per page</span>
              </button>
              {showPerPageMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-[#FFE6A7] border-2 border-[#432818] rounded-xl shadow-xl z-10">
                  <div className="py-2">
                    {perPageOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setEventsPerPage(option);
                          setCurrentPage(1);
                          setShowPerPageMenu(false);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                          eventsPerPage === option ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                        }`}
                      >
                        <span className="font-medium">{option} per page</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-3 px-6 py-3 bg-[#432818] text-[#FFE6A7] rounded-lg hover:bg-[#6F1D1B] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ArrowUpDown size={20} />
                <span className="font-medium">Sort By</span>
              </button>
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-[#FFE6A7] border-2 border-[#432818] rounded-xl shadow-xl z-10">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setCurrentSort('newest');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'newest' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Newest First</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSort('oldest');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'oldest' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Oldest First</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSort('cheapest');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'cheapest' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Price: Low to High</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSort('expensive');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'expensive' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Price: High to Low</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSort('popularity');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'popularity' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Most Popular</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowColumnFilter(!showColumnFilter)}
              className="flex items-center gap-3 px-6 py-3 bg-[#432818] text-[#FFE6A7] rounded-lg hover:bg-[#6F1D1B] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Filter size={20} />
              <span className="font-medium">Column Filter</span>
            </button>
          </div>
        </div>

        {showColumnFilter && (
          <div className="bg-[#FFE6A7] border-2 border-[#432818] rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-[#432818] mb-4">Column Visibility</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {columns.map((column) => (
                <label key={column.key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={column.visible}
                    onChange={() => {
                      setColumns(columns.map((col) =>
                        col.key === column.key ? { ...col, visible: !col.visible } : col
                      ));
                    }}
                    className="w-4 h-4 text-[#432818] border-2 border-[#432818] rounded focus:ring-[#6F1D1B]"
                  />
                  <span className="text-[#432818]">{column.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border-2 border-[#432818] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse bg-[#FFE6A7]">
              <thead>
                <tr className="bg-[#432818] text-[#FFE6A7]">
                  {columns.filter(col => col.visible).map(column => (
                    <th
                      key={column.key}
                      className="px-6 py-4 text-left font-semibold text-base border-b-2 border-[#432818]/20"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedEvents.map((event, index) => (
                  <tr
                    key={event.id}
                    className={`border-b border-[#432818]/20 hover:bg-[#432818]/5 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-[#FFE6A7]' : 'bg-[#FFE6A7]/50'
                    }`}
                  >
                    {columns
                      .filter(col => col.visible)
                      .map(column => (
                        <td
                          key={`${event.id}-${column.key}`}
                          className="px-6 py-4 text-[#432818]"
                        >
                          {column.key === 'type' ? (
                            <div className="flex items-center gap-3">
                              {getCategoryIcon(event.type)}
                              <span className="font-medium">{event.type}</span>
                            </div>
                          ) : column.key === 'ticketsBooked' ? (
                            <div className="flex items-center gap-3">
                              <Ticket className="w-5 h-5" />
                              <span className="font-medium">{event.availableTickets}/{event.availableTickets + 500}</span>
                            </div>
                          ) : column.key === 'price' ? (
                            <div className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5" />
                              <span className="font-medium">{getValue(event, column.key)}</span>
                            </div>
                          ) : column.key === 'organizer.fullName' ? (
                            <span className="font-medium">{getValue(event, column.key)}</span>
                          ) : column.key === 'organizer.email' ? (
                            <span>{getValue(event, column.key)}</span>
                          ) : (
                            getValue(event, column.key)
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-[#432818]/30 text-[#FFE6A7]/50 cursor-not-allowed'
                  : 'bg-[#432818] text-[#FFE6A7] hover:bg-[#6F1D1B]'
              } transition-colors`}
            >
              Previous
            </button>
            <span className="text-[#432818]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-[#432818]/30 text-[#FFE6A7]/50 cursor-not-allowed'
                  : 'bg-[#432818] text-[#FFE6A7] hover:bg-[#6F1D1B]'
              } transition-colors`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventsPage;

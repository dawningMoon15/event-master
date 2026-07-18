// Centralised mock data — single source of truth for all 8 events.
// All components (EventFeed, EventDetails, TicketPurchase) import from here.

export interface Artist {
  name: string;
  role: string;
  imageUrl: string;
}

export interface Venue {
  name: string;
  address: string;
  mapUrl: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  date: string;
  time: string;
  location: string;
  venue: Venue;
  imageUrl: string;
  artists: Artist[];
  type: string;
  price: number;
  availableTickets: number;
  organizer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description:
      'A magical evening of jazz under the stars featuring world-renowned artists and local talents. Enjoy a weekend of amazing music and performances featuring top artists from around the world.',
    startDateTime: '2024-07-15T16:00:00',
    endDateTime: '2024-07-15T23:00:00',
    date: '2024-07-15',
    time: '16:00',
    location: 'Central Park Amphitheater',
    venue: {
      name: 'Central Park Amphitheater',
      address: '123 Park Avenue, New York, NY 10022',
      mapUrl: 'https://maps.google.com/maps?q=central+park+ny&output=embed',
    },
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    type: 'Music',
    price: 89.99,
    availableTickets: 150,
    artists: [
      {
        name: 'Sarah Johnson',
        role: 'Headliner',
        imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      },
      {
        name: 'The Midnight Band',
        role: 'Supporting Act',
        imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
      },
    ],
    organizer: {
      id: 'org1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@events.com',
    },
  },
  {
    id: '2',
    title: 'Halloween Masquerade Ball',
    description:
      'An elegant evening of mystery, music, and dance. Costumes required! Step into a world of glamour and intrigue.',
    startDateTime: '2024-10-31T20:00:00',
    endDateTime: '2024-11-01T02:00:00',
    date: '2024-10-31',
    time: '20:00',
    location: 'Grand Plaza Hotel',
    venue: {
      name: 'Grand Plaza Ballroom',
      address: '456 Luxury Ave, New York, NY 10023',
      mapUrl: 'https://maps.google.com/maps?q=grand+plaza+ny&output=embed',
    },
    imageUrl: 'https://images.unsplash.com/photo-1509666537727-9154b6962292',
    type: 'Party',
    price: 120.0,
    availableTickets: 200,
    artists: [
      {
        name: 'DJ Phantom',
        role: 'Main DJ',
        imageUrl: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7',
      },
    ],
    organizer: {
      id: 'org2',
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.j@events.com',
    },
  },
  {
    id: '3',
    title: 'Fall Food & Wine Festival',
    description:
      'Celebrate autumn flavors with local wineries and gourmet food vendors. A curated experience for food lovers and connoisseurs.',
    startDateTime: '2024-09-15T12:00:00',
    endDateTime: '2024-09-15T20:00:00',
    date: '2024-09-15',
    time: '12:00',
    location: 'Riverside Gardens',
    venue: {
      name: 'Riverside Gardens Event Space',
      address: '789 River Road, New York, NY 10024',
      mapUrl: 'https://maps.google.com/maps?q=riverside+gardens+ny&output=embed',
    },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
    type: 'Food & Drink',
    price: 75.0,
    availableTickets: 300,
    artists: [
      {
        name: 'Chef Maria Rodriguez',
        role: 'Featured Chef',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      },
    ],
    organizer: {
      id: 'org3',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.b@events.com',
    },
  },
  {
    id: '4',
    title: 'Tech Innovation Summit 2025',
    description:
      'Join industry leaders and innovators for a day of cutting-edge technology discussions, keynote speakers, and networking opportunities.',
    startDateTime: '2025-10-20T09:00:00',
    endDateTime: '2025-10-20T18:00:00',
    date: '2025-10-20',
    time: '09:00',
    location: 'Convention Center',
    venue: {
      name: 'Convention Center',
      address: '123 Convention St, New York, NY 10024',
      mapUrl: 'https://maps.google.com/maps?q=convention+center+ny&output=embed',
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
      email: 'sophia.l@events.com',
    },
  },
  {
    id: '5',
    title: 'Autumn Art Fair',
    description:
      'Showcase featuring local artists, live demonstrations, and interactive workshops. Discover emerging talent and purchase one-of-a-kind pieces.',
    startDateTime: '2025-10-08T10:00:00',
    endDateTime: '2025-10-08T18:00:00',
    date: '2025-10-08',
    time: '10:00',
    location: 'City Art Gallery',
    venue: {
      name: 'City Art Gallery',
      address: '456 Art St, New York, NY 10024',
      mapUrl: 'https://maps.google.com/maps?q=city+art+gallery+ny&output=embed',
    },
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
    type: 'Art',
    price: 25.0,
    availableTickets: 250,
    artists: [],
    organizer: {
      id: 'org5',
      firstName: 'Ethan',
      lastName: 'Wang',
      email: 'ethan.w@events.com',
    },
  },
  {
    id: '6',
    title: 'Fall Classical Concert',
    description:
      'An evening of Beethoven, Mozart, and Tchaikovsky performed by the City Symphony. A transcendent musical experience in an intimate setting.',
    startDateTime: '2025-10-25T19:30:00',
    endDateTime: '2025-10-25T22:00:00',
    date: '2025-10-25',
    time: '19:30',
    location: 'Symphony Hall',
    venue: {
      name: 'Symphony Hall',
      address: '789 Music St, New York, NY 10024',
      mapUrl: 'https://maps.google.com/maps?q=symphony+hall+ny&output=embed',
    },
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6',
    type: 'Music',
    price: 150.0,
    availableTickets: 180,
    artists: [],
    organizer: {
      id: 'org6',
      firstName: 'Ava',
      lastName: 'Chen',
      email: 'ava.c@events.com',
    },
  },
  {
    id: '7',
    title: 'Oktoberfest Celebration',
    description:
      'Traditional German beer, food, and music festival. Lederhosen and dirndls welcome! Authentic cuisine, live bands, and great company.',
    startDateTime: '2025-10-05T12:00:00',
    endDateTime: '2025-10-05T22:00:00',
    date: '2025-10-05',
    time: '12:00',
    location: 'Riverfront Park',
    venue: {
      name: 'Riverfront Park',
      address: '123 Riverfront St, New York, NY 10024',
      mapUrl: 'https://maps.google.com/maps?q=riverfront+park+ny&output=embed',
    },
    imageUrl: 'https://images.unsplash.com/photo-1505075106905-fb052892c116',
    type: 'Festival',
    price: 45.0,
    availableTickets: 500,
    artists: [],
    organizer: {
      id: 'org7',
      firstName: 'Liam',
      lastName: 'Nguyen',
      email: 'liam.n@events.com',
    },
  },
  {
    id: '8',
    title: 'Stand-up Comedy Night',
    description:
      'A hilarious evening featuring top comedians from around the country. Expect laughs, surprises, and a night you won\'t forget.',
    startDateTime: '2025-10-18T20:00:00',
    endDateTime: '2025-10-18T23:00:00',
    date: '2025-10-18',
    time: '20:00',
    location: 'Laugh Factory',
    venue: {
      name: 'Laugh Factory',
      address: '456 Comedy St, New York, NY 10024',
      mapUrl: 'https://maps.google.com/maps?q=laugh+factory+ny&output=embed',
    },
    imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca',
    type: 'Comedy',
    price: 35.0,
    availableTickets: 120,
    artists: [],
    organizer: {
      id: 'org8',
      firstName: 'Mia',
      lastName: 'Kim',
      email: 'mia.k@events.com',
    },
  },
];

export const getEventById = (id: string): Event | undefined =>
  MOCK_EVENTS.find((e) => e.id === id);

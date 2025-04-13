import React, { useState } from 'react';
import { Building2, DollarSign, Calendar, MapPin, Clock, Search, X, ArrowUpDown, Filter } from 'lucide-react';

interface SponsorshipDetails {
  eventId: string;
  amount: number;
  sponsorshipTier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  benefits: string[];
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  paymentHistory: {
    date: string;
    amount: number;
    transactionId: string;
  }[];
}

interface Event {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  venue: {
    name: string;
    address: string;
  };
  type: string;
  price: number;
  availableTickets: number;
  sponsorshipDetails: SponsorshipDetails;
}

interface Sponsor {
  id: string;
  name: string;
  industry: string;
  totalSpent: number;
  contactPerson: string;
  email: string;
  phone: string;
  sponsoredEvents: Event[];
}

interface Column {
  key: keyof Sponsor | 'sponsoredEventsCount';
  label: string;
  visible: boolean;
}

const AdminSponsorsPage = () => {
  // Mock data with realistic sponsors and their sponsored events
  const sponsors: Sponsor[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      industry: 'Technology',
      totalSpent: 50000,
      contactPerson: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      sponsoredEvents: [
        {
          id: '1',
          title: 'Tech Conference 2024',
          startDateTime: '2024-08-20T09:00:00',
          endDateTime: '2024-08-20T18:00:00',
          location: 'Convention Center',
          venue: {
            name: 'Metropolitan Convention Center',
            address: '789 Tech Blvd, New York, NY 10001'
          },
          type: 'Technology',
          price: 299.99,
          availableTickets: 500,
          sponsorshipDetails: {
            eventId: '1',
            amount: 30000,
            sponsorshipTier: 'Platinum',
            benefits: [
              'Main stage naming rights',
              'Premium booth location',
              'Logo on all marketing materials',
              'VIP access for 10 people'
            ],
            paymentStatus: 'Paid',
            paymentHistory: [
              {
                date: '2024-01-15',
                amount: 15000,
                transactionId: 'TRX-001'
              },
              {
                date: '2024-02-15',
                amount: 15000,
                transactionId: 'TRX-002'
              }
            ]
          }
        },
        {
          id: '2',
          title: 'Gaming Convention',
          startDateTime: '2024-07-01T10:00:00',
          endDateTime: '2024-07-01T22:00:00',
          location: 'Expo Center',
          venue: {
            name: 'City Expo Center',
            address: '655 W 34th St, New York, NY 10001'
          },
          type: 'Gaming',
          price: 45.00,
          availableTickets: 800,
          sponsorshipDetails: {
            eventId: '2',
            amount: 20000,
            sponsorshipTier: 'Gold',
            benefits: [
              'Gaming zone branding',
              'Logo on event website',
              'Social media mentions',
              'VIP access for 5 people'
            ],
            paymentStatus: 'Partial',
            paymentHistory: [
              {
                date: '2024-02-01',
                amount: 10000,
                transactionId: 'TRX-003'
              }
            ]
          }
        }
      ]
    },
    {
      id: '2',
      name: 'Global Beverages Inc.',
      industry: 'Food & Beverage',
      totalSpent: 35000,
      contactPerson: 'Sarah Johnson',
      email: 'sarah.j@globalbev.com',
      phone: '+1 (555) 234-5678',
      sponsoredEvents: [
        {
          id: '3',
          title: 'Food & Wine Festival',
          startDateTime: '2024-06-10T11:00:00',
          endDateTime: '2024-06-10T20:00:00',
          location: 'Riverside Gardens',
          venue: {
            name: 'Riverside Gardens',
            address: '456 River Road, New York, NY 10023'
          },
          type: 'Food & Beverage',
          price: 75.00,
          availableTickets: 200
        },
        {
          id: '4',
          title: 'Craft Beer Festival',
          startDateTime: '2024-08-30T12:00:00',
          endDateTime: '2024-08-30T22:00:00',
          location: 'Waterfront Park',
          venue: {
            name: 'Waterfront Event Space',
            address: '89 South Street, New York, NY 10038'
          },
          type: 'Food & Beverage',
          price: 65.00,
          availableTickets: 450
        }
      ]
    },
    {
      id: '3',
      name: 'Fashion Forward Group',
      industry: 'Fashion',
      totalSpent: 45000,
      contactPerson: 'Michael Chen',
      email: 'm.chen@fashionforward.com',
      phone: '+1 (555) 345-6789',
      sponsoredEvents: [
        {
          id: '5',
          title: 'Fashion Week Preview',
          startDateTime: '2024-09-15T18:00:00',
          endDateTime: '2024-09-15T22:00:00',
          location: 'Fashion Center',
          venue: {
            name: 'Metropolitan Fashion Center',
            address: '601 West 26th Street, New York, NY 10001'
          },
          type: 'Fashion',
          price: 200.00,
          availableTickets: 150
        }
      ]
    },
    {
      id: '4',
      name: 'Health & Wellness Corp',
      industry: 'Wellness',
      totalSpent: 30000,
      contactPerson: 'Emma Davis',
      email: 'e.davis@healthwell.com',
      phone: '+1 (555) 456-7890',
      sponsoredEvents: [
        {
          id: '6',
          title: 'Wellness and Yoga Retreat',
          startDateTime: '2024-06-25T08:00:00',
          endDateTime: '2024-06-25T17:00:00',
          location: 'Wellness Center',
          venue: {
            name: 'Urban Wellness Center',
            address: '123 Peace Street, Brooklyn, NY 11201'
          },
          type: 'Wellness',
          price: 120.00,
          availableTickets: 80
        }
      ]
    }
  ];

  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Sponsor Name', visible: true },
    { key: 'industry', label: 'Industry', visible: true },
    { key: 'totalSpent', label: 'Total Spent', visible: true },
    { key: 'contactPerson', label: 'Contact Person', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'phone', label: 'Phone', visible: true },
    { key: 'sponsoredEventsCount', label: 'Sponsored Events', visible: true }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>('name');
  const [expandedSponsor, setExpandedSponsor] = useState<string | null>(null);

  const filterSponsors = (sponsors: Sponsor[]): Sponsor[] => {
    if (!searchQuery) return sponsors;
    
    const query = searchQuery.toLowerCase();
    return sponsors.filter(sponsor => 
      sponsor.name.toLowerCase().includes(query) ||
      sponsor.industry.toLowerCase().includes(query) ||
      sponsor.contactPerson.toLowerCase().includes(query) ||
      sponsor.email.toLowerCase().includes(query) ||
      sponsor.phone.toLowerCase().includes(query)
    );
  };

  const getSortedSponsors = () => {
    const filteredSponsors = filterSponsors(sponsors);
    return [...filteredSponsors].sort((a, b) => {
      switch (currentSort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'industry':
          return a.industry.localeCompare(b.industry);
        case 'totalSpent':
          return b.totalSpent - a.totalSpent;
        case 'sponsoredEventsCount':
          return b.sponsoredEvents.length - a.sponsoredEvents.length;
        default:
          return 0;
      }
    });
  };

  const getValue = (sponsor: Sponsor, key: string): string | number => {
    if (key === 'sponsoredEventsCount') return sponsor.sponsoredEvents.length;
    if (key === 'totalSpent') return `$${sponsor.totalSpent.toLocaleString()}`;
    return (sponsor as any)[key]?.toString() || '';
  };

  const toggleSponsorExpand = (sponsorId: string) => {
    setExpandedSponsor(expandedSponsor === sponsorId ? null : sponsorId);
  };

  const renderSponsorshipDetails = (event: Event) => {
    const { sponsorshipDetails } = event;
    const totalPaid = sponsorshipDetails.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
    const remainingAmount = sponsorshipDetails.amount - totalPaid;

    return (
      <div className="mt-4 space-y-4 border-t border-[#432818]/10 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-[#432818]">Sponsorship Details</h5>
            <div className="mt-2 space-y-2">
              <p className="text-[#432818]/70">
                <span className="font-medium">Tier:</span> {sponsorshipDetails.sponsorshipTier}
              </p>
              <p className="text-[#432818]/70">
                <span className="font-medium">Total Amount:</span> ${sponsorshipDetails.amount.toLocaleString()}
              </p>
              <p className="text-[#432818]/70">
                <span className="font-medium">Status:</span>{' '}
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                  sponsorshipDetails.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                  sponsorshipDetails.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {sponsorshipDetails.paymentStatus}
                </span>
              </p>
              {sponsorshipDetails.paymentStatus === 'Partial' && (
                <p className="text-[#432818]/70">
                  <span className="font-medium">Remaining:</span> ${remainingAmount.toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-[#432818]">Benefits</h5>
            <ul className="mt-2 space-y-1">
              {sponsorshipDetails.benefits.map((benefit, index) => (
                <li key={index} className="text-[#432818]/70 flex items-start">
                  <span className="mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <h5 className="font-semibold text-[#432818] mb-2">Payment History</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#432818]/10">
              <thead>
                <tr className="text-[#432818]">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#432818]/10">
                {sponsorshipDetails.paymentHistory.map((payment, index) => (
                  <tr key={index} className="text-[#432818]/70">
                    <td className="px-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">${payment.amount.toLocaleString()}</td>
                    <td className="px-4 py-2">{payment.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-[#FFE6A7]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[#432818]">Sponsor Management</h1>
            <p className="text-[#432818]/70 text-lg">
              Showing <span className="font-medium text-[#432818]">{filterSponsors(sponsors).length}</span> sponsors
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sponsors..."
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
                        setCurrentSort('name');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'name' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Name (A-Z)</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSort('industry');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'industry' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Industry</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSort('totalSpent');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'totalSpent' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Total Spent</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentSort('sponsoredEventsCount');
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                        currentSort === 'sponsoredEventsCount' ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                      }`}
                    >
                      <span className="font-medium">Sponsored Events</span>
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
                  <th className="px-6 py-4 text-left font-semibold text-base border-b-2 border-[#432818]/20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {getSortedSponsors().map((sponsor, index) => (
                  <React.Fragment key={sponsor.id}>
                    <tr
                      className={`border-b border-[#432818]/20 hover:bg-[#432818]/5 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-[#FFE6A7]' : 'bg-[#FFE6A7]/50'
                      }`}
                    >
                      {columns
                        .filter(col => col.visible)
                        .map(column => (
                          <td
                            key={`${sponsor.id}-${column.key}`}
                            className="px-6 py-4 text-[#432818]"
                          >
                            {column.key === 'totalSpent' ? (
                              <div className="flex items-center gap-3">
                                <DollarSign className="w-5 h-5" />
                                <span className="font-medium">{getValue(sponsor, column.key)}</span>
                              </div>
                            ) : (
                              getValue(sponsor, column.key)
                            )}
                          </td>
                        ))}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleSponsorExpand(sponsor.id)}
                          className="text-[#432818] hover:text-[#6F1D1B] transition-colors"
                        >
                          {expandedSponsor === sponsor.id ? 'Hide Events' : 'Show Events'}
                        </button>
                      </td>
                    </tr>
                    {expandedSponsor === sponsor.id && (
                      <tr className="bg-[#432818]/5">
                        <td colSpan={columns.filter(col => col.visible).length + 1} className="px-6 py-4">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold text-[#432818] mb-4">Sponsored Events</h3>
                              <div className="grid grid-cols-1 gap-6">
                                {sponsor.sponsoredEvents.map(event => (
                                  <div
                                    key={event.id}
                                    className="bg-[#FFE6A7] border-2 border-[#432818] rounded-lg p-6"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="text-xl font-semibold text-[#432818]">{event.title}</h4>
                                        <div className="mt-2 space-y-2">
                                          <div className="flex items-center gap-2 text-[#432818]/70">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(event.startDateTime).toLocaleDateString()}</span>
                                          </div>
                                          <div className="flex items-center gap-2 text-[#432818]/70">
                                            <Clock className="w-4 h-4" />
                                            <span>
                                              {new Date(event.startDateTime).toLocaleTimeString()} -{' '}
                                              {new Date(event.endDateTime).toLocaleTimeString()}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2 text-[#432818]/70">
                                            <MapPin className="w-4 h-4" />
                                            <span>{event.venue.name}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#432818] text-[#FFE6A7]">
                                          {event.type}
                                        </div>
                                      </div>
                                    </div>
                                    {renderSponsorshipDetails(event)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSponsorsPage; 
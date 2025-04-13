import React, { useState } from 'react';
import { Calendar, DollarSign, Download, Eye, Filter, Search, X, ArrowUpDown, Users, ChevronLeft, PieChart, BarChart } from 'lucide-react';

interface Revenue {
  ticketSales: number;
  sponsorships: number;
  merchandise: number;
  foodAndBeverage: number;
  other: number;
}

interface Expenses {
  artistFees: number;
  venueCost: number;
  logistics: number;
  marketing: number;
  staffing: number;
  security: number;
  insurance: number;
  other: number;
}

interface FinancialReport {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  organizer: {
    id: string;
    name: string;
    email: string;
  };
  reportDate: string;
  revenue: Revenue;
  expenses: Expenses;
  totalRevenue: number;
  totalExpenses: number;
  profitLoss: number;
}

const mockReports: FinancialReport[] = [
  {
    id: '1',
    eventId: '1',
    eventName: 'Summer Music Festival',
    eventDate: '2024-07-15',
    organizer: {
      id: 'org1',
      name: 'John Smith',
      email: 'john.smith@events.com'
    },
    reportDate: '2024-07-16',
    revenue: {
      ticketSales: 89.99 * 850,
      sponsorships: 25000,
      merchandise: 15000,
      foodAndBeverage: 20000,
      other: 5000
    },
    expenses: {
      artistFees: 50000,
      venueCost: 15000,
      logistics: 10000,
      marketing: 8000,
      staffing: 12000,
      security: 5000,
      insurance: 3000,
      other: 2000
    },
    totalRevenue: (89.99 * 850) + 65000,
    totalExpenses: 105000,
    profitLoss: (89.99 * 850 + 65000) - 105000
  },
  {
    id: '2',
    eventId: '2',
    eventName: 'Tech Conference 2024',
    eventDate: '2024-08-20',
    organizer: {
      id: 'org2',
      name: 'Alice Chen',
      email: 'alice.chen@techevents.com'
    },
    reportDate: '2024-08-21',
    revenue: {
      ticketSales: 299.99 * 500,
      sponsorships: 100000,
      merchandise: 5000,
      foodAndBeverage: 15000,
      other: 10000
    },
    expenses: {
      artistFees: 0,
      venueCost: 50000,
      logistics: 25000,
      marketing: 20000,
      staffing: 15000,
      security: 10000,
      insurance: 5000,
      other: 5000
    },
    totalRevenue: (299.99 * 500) + 130000,
    totalExpenses: 130000,
    profitLoss: (299.99 * 500 + 130000) - 130000
  },
  {
    id: '3',
    eventId: '3',
    eventName: 'Food & Wine Festival',
    eventDate: '2024-06-10',
    organizer: {
      id: 'org3',
      name: 'Maria Garcia',
      email: 'maria@culinaryarts.org'
    },
    reportDate: '2024-06-11',
    revenue: {
      ticketSales: 75.00 * 800,
      sponsorships: 40000,
      merchandise: 8000,
      foodAndBeverage: 45000,
      other: 7000
    },
    expenses: {
      artistFees: 0,
      venueCost: 25000,
      logistics: 15000,
      marketing: 12000,
      staffing: 20000,
      security: 8000,
      insurance: 4000,
      other: 6000
    },
    totalRevenue: (75.00 * 800) + 100000,
    totalExpenses: 90000,
    profitLoss: (75.00 * 800 + 100000) - 90000
  },
  {
    id: '4',
    eventId: '4',
    eventName: 'Art Exhibition: Modern Masters',
    eventDate: '2024-05-01',
    organizer: {
      id: 'org4',
      name: 'David Lee',
      email: 'david@metmuseum.org'
    },
    reportDate: '2024-05-02',
    revenue: {
      ticketSales: 25.00 * 550,
      sponsorships: 35000,
      merchandise: 25000,
      foodAndBeverage: 8000,
      other: 5000
    },
    expenses: {
      artistFees: 25000,
      venueCost: 20000,
      logistics: 8000,
      marketing: 12000,
      staffing: 10000,
      security: 5000,
      insurance: 3000,
      other: 4000
    },
    totalRevenue: (25.00 * 550) + 73000,
    totalExpenses: 87000,
    profitLoss: (25.00 * 550 + 73000) - 87000
  },
  {
    id: '5',
    eventId: '5',
    eventName: 'Marathon 2024',
    eventDate: '2024-09-30',
    organizer: {
      id: 'org5',
      name: 'Michael Johnson',
      email: 'michael@sportsassoc.com'
    },
    reportDate: '2024-10-01',
    revenue: {
      ticketSales: 85.00 * 2500,
      sponsorships: 120000,
      merchandise: 45000,
      foodAndBeverage: 35000,
      other: 15000
    },
    expenses: {
      artistFees: 0,
      venueCost: 40000,
      logistics: 65000,
      marketing: 35000,
      staffing: 50000,
      security: 25000,
      insurance: 20000,
      other: 15000
    },
    totalRevenue: (85.00 * 2500) + 215000,
    totalExpenses: 250000,
    profitLoss: (85.00 * 2500 + 215000) - 250000
  },
  {
    id: '11',
    eventId: '11',
    eventName: 'Fashion Week Preview',
    eventDate: '2024-09-15',
    organizer: {
      id: 'org11',
      name: 'Isabella Martinez',
      email: 'isabella@fashionweek.com'
    },
    reportDate: '2024-09-16',
    revenue: {
      ticketSales: 200.00 * 850,
      sponsorships: 150000,
      merchandise: 75000,
      foodAndBeverage: 25000,
      other: 15000
    },
    expenses: {
      artistFees: 100000,
      venueCost: 75000,
      logistics: 35000,
      marketing: 45000,
      staffing: 30000,
      security: 15000,
      insurance: 10000,
      other: 15000
    },
    totalRevenue: (200.00 * 850) + 265000,
    totalExpenses: 325000,
    profitLoss: (200.00 * 850 + 265000) - 325000
  },
  {
    id: '13',
    eventId: '13',
    eventName: 'International Film Festival',
    eventDate: '2024-11-01',
    organizer: {
      id: 'org13',
      name: 'Sophie Laurent',
      email: 'sophie@filmfest.com'
    },
    reportDate: '2024-11-08',
    revenue: {
      ticketSales: 50.00 * 700,
      sponsorships: 80000,
      merchandise: 15000,
      foodAndBeverage: 30000,
      other: 10000
    },
    expenses: {
      artistFees: 40000,
      venueCost: 35000,
      logistics: 20000,
      marketing: 25000,
      staffing: 18000,
      security: 12000,
      insurance: 8000,
      other: 7000
    },
    totalRevenue: (50.00 * 700) + 135000,
    totalExpenses: 165000,
    profitLoss: (50.00 * 700 + 135000) - 165000
  },
  {
    id: '17',
    eventId: '17',
    eventName: 'Book Fair and Literary Festival',
    eventDate: '2024-09-05',
    organizer: {
      id: 'org17',
      name: 'James Wilson',
      email: 'james@literaryfest.com'
    },
    reportDate: '2024-09-06',
    revenue: {
      ticketSales: 0,
      sponsorships: 45000,
      merchandise: 25000,
      foodAndBeverage: 18000,
      other: 7000
    },
    expenses: {
      artistFees: 15000,
      venueCost: 20000,
      logistics: 12000,
      marketing: 15000,
      staffing: 10000,
      security: 8000,
      insurance: 5000,
      other: 5000
    },
    totalRevenue: 95000,
    totalExpenses: 90000,
    profitLoss: 5000
  },
  {
    id: '18',
    eventId: '18',
    eventName: 'Craft Beer Festival',
    eventDate: '2024-08-30',
    organizer: {
      id: 'org18',
      name: 'Samuel Craft',
      email: 'samuel@beerfest.com'
    },
    reportDate: '2024-08-31',
    revenue: {
      ticketSales: 65.00 * 550,
      sponsorships: 60000,
      merchandise: 12000,
      foodAndBeverage: 85000,
      other: 8000
    },
    expenses: {
      artistFees: 0,
      venueCost: 30000,
      logistics: 25000,
      marketing: 18000,
      staffing: 25000,
      security: 15000,
      insurance: 8000,
      other: 9000
    },
    totalRevenue: (65.00 * 550) + 165000,
    totalExpenses: 130000,
    profitLoss: (65.00 * 550 + 165000) - 130000
  }
];

const AdminFinancialPage = () => {
  const [reports, setReports] = useState<FinancialReport[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const [showPerPageMenu, setShowPerPageMenu] = useState(false);
  const [currentSort, setCurrentSort] = useState<'date' | 'profitLoss' | 'name'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  const perPageOptions = [5, 10, 15, 20, 50];

  const filterReports = (reports: FinancialReport[]): FinancialReport[] => {
    return reports.filter(report => {
      const matchesSearch = searchQuery
        ? report.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.organizer.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesDateRange =
        (!dateRange.start || report.eventDate >= dateRange.start) &&
        (!dateRange.end || report.eventDate <= dateRange.end);

      return matchesSearch && matchesDateRange;
    });
  };

  const getSortedReports = (filteredReports: FinancialReport[]): FinancialReport[] => {
    return [...filteredReports].sort((a, b) => {
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      switch (currentSort) {
        case 'date':
          return multiplier * (new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
        case 'profitLoss':
          return multiplier * (a.profitLoss - b.profitLoss);
        case 'name':
          return multiplier * a.eventName.localeCompare(b.eventName);
        default:
          return 0;
      }
    });
  };

  const getPaginatedReports = (sortedReports: FinancialReport[]): FinancialReport[] => {
    const startIndex = (currentPage - 1) * reportsPerPage;
    return sortedReports.slice(startIndex, startIndex + reportsPerPage);
  };

  const filteredReports = filterReports(reports);
  const sortedReports = getSortedReports(filteredReports);
  const paginatedReports = getPaginatedReports(sortedReports);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handleSort = (sortKey: 'date' | 'profitLoss' | 'name') => {
    if (currentSort === sortKey) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setCurrentSort(sortKey);
      setSortDirection('desc');
    }
  };

  const handleDownloadPDF = (reportId: string) => {
    // TODO: Implement PDF download functionality
    console.log('Downloading PDF for report:', reportId);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (selectedReport) {
    return (
      <div className="p-8 bg-[#FFE6A7]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedReport(null)}
              className="flex items-center gap-2 text-[#432818] hover:text-[#6F1D1B] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Reports</span>
            </button>
            <button
              onClick={() => handleDownloadPDF(selectedReport.id)}
              className="flex items-center gap-2 px-4 py-2 bg-[#432818] text-[#FFE6A7] rounded-lg hover:bg-[#6F1D1B] transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-[#FFE6A7] border-2 border-[#432818] rounded-xl p-6">
                <h2 className="text-2xl font-bold text-[#432818] mb-4">Event Details</h2>
                <div className="space-y-3">
                  <p className="text-[#432818]">
                    <span className="font-medium">Event Name:</span> {selectedReport.eventName}
                  </p>
                  <p className="text-[#432818]">
                    <span className="font-medium">Event Date:</span>{' '}
                    {new Date(selectedReport.eventDate).toLocaleDateString()}
                  </p>
                  <p className="text-[#432818]">
                    <span className="font-medium">Organizer:</span> {selectedReport.organizer.name}
                  </p>
                  <p className="text-[#432818]">
                    <span className="font-medium">Report Generated:</span>{' '}
                    {new Date(selectedReport.reportDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-[#FFE6A7] border-2 border-[#432818] rounded-xl p-6">
                <h2 className="text-2xl font-bold text-[#432818] mb-4">Summary</h2>
                <div className="space-y-3">
                  <p className="text-[#432818]">
                    <span className="font-medium">Total Revenue:</span>{' '}
                    <span className="text-green-600">{formatCurrency(selectedReport.totalRevenue)}</span>
                  </p>
                  <p className="text-[#432818]">
                    <span className="font-medium">Total Expenses:</span>{' '}
                    <span className="text-red-600">{formatCurrency(selectedReport.totalExpenses)}</span>
                  </p>
                  <p className="text-[#432818] text-lg font-bold">
                    <span className="font-medium">Net Profit/Loss:</span>{' '}
                    <span className={selectedReport.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(selectedReport.profitLoss)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#FFE6A7] border-2 border-[#432818] rounded-xl p-6">
                <h2 className="text-2xl font-bold text-[#432818] mb-4">Revenue Breakdown</h2>
                <div className="space-y-3">
                  {Object.entries(selectedReport.revenue).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-[#432818] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-green-600">{formatCurrency(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FFE6A7] border-2 border-[#432818] rounded-xl p-6">
                <h2 className="text-2xl font-bold text-[#432818] mb-4">Expenses Breakdown</h2>
                <div className="space-y-3">
                  {Object.entries(selectedReport.expenses).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-[#432818] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-red-600">{formatCurrency(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#FFE6A7]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[#432818]">Financial Reports</h1>
            <p className="text-[#432818]/70 text-lg">
              Showing <span className="font-medium text-[#432818]">{paginatedReports.length}</span> of{' '}
              <span className="font-medium text-[#432818]">{filteredReports.length}</span> reports
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reports..."
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
                <span className="font-medium">{reportsPerPage} per page</span>
              </button>
              {showPerPageMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-[#FFE6A7] border-2 border-[#432818] rounded-xl shadow-xl z-10">
                  <div className="py-2">
                    {perPageOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setReportsPerPage(option);
                          setCurrentPage(1);
                          setShowPerPageMenu(false);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#432818]/5 transition-colors ${
                          reportsPerPage === option ? 'bg-[#432818]/10 text-[#6F1D1B]' : 'text-[#432818]'
                        }`}
                      >
                        <span className="font-medium">{option} per page</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-[#432818] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse bg-[#FFE6A7]">
              <thead>
                <tr className="bg-[#432818] text-[#FFE6A7]">
                  <th
                    className="px-6 py-4 text-left font-semibold text-base border-b-2 border-[#432818]/20 cursor-pointer hover:bg-[#6F1D1B] transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    Event Name
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold text-base border-b-2 border-[#432818]/20 cursor-pointer hover:bg-[#6F1D1B] transition-colors"
                    onClick={() => handleSort('date')}
                  >
                    Report Date
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-base border-b-2 border-[#432818]/20">
                    Total Revenue
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-base border-b-2 border-[#432818]/20">
                    Total Expenses
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold text-base border-b-2 border-[#432818]/20 cursor-pointer hover:bg-[#6F1D1B] transition-colors"
                    onClick={() => handleSort('profitLoss')}
                  >
                    Profit/Loss
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-base border-b-2 border-[#432818]/20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedReports.map((report, index) => (
                  <tr
                    key={report.id}
                    className={`border-b border-[#432818]/20 hover:bg-[#432818]/5 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-[#FFE6A7]' : 'bg-[#FFE6A7]/50'
                    }`}
                  >
                    <td className="px-6 py-4 text-[#432818]">{report.eventName}</td>
                    <td className="px-6 py-4 text-[#432818]">
                      {new Date(report.reportDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-600">{formatCurrency(report.totalRevenue)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-red-600">{formatCurrency(report.totalExpenses)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={report.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}
                      >
                        {formatCurrency(report.profitLoss)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="flex items-center gap-2 text-[#432818] hover:text-[#6F1D1B] transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(report.id)}
                          className="flex items-center gap-2 text-[#432818] hover:text-[#6F1D1B] transition-colors"
                        >
                          <Download className="w-5 h-5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </td>
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

export default AdminFinancialPage; 
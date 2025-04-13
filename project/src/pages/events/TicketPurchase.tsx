import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, CreditCard, Ticket, QrCode, Smartphone, Building2 } from 'lucide-react';

interface Artist {
  name: string;
  role: string;
  imageUrl: string;
}

interface Venue {
  name: string;
  address: string;
  mapUrl: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: Venue;
  imageUrl: string;
  artists: Artist[];
  type: string;
  price: number;
  availableTickets: number;
}

type MockEvents = {
  [key: string]: Event;
};

const TicketPurchase: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'netbanking' | 'upi'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    bankName: '',
    accountNumber: '',
    upiId: '',
    email: '',
  });

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

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(`/events/${id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateQRCode = () => {
    if (!event) return '';
    // Mock QR code data
    const qrData = {
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue.name,
      quantity,
      totalPrice: (event.price * quantity).toFixed(2),
      confirmationCode: Math.random().toString(36).substring(2, 15)
    };
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${JSON.stringify(qrData)}`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6F1D1B]"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#FFE6A7] hover:text-[#BB9457] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{step === 1 ? 'Back to Event' : 'Previous Step'}</span>
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i + 1 === step ? 'bg-[#6F1D1B]' : 'bg-[#BB9457]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Event Title */}
      <h1 className="text-3xl font-bold text-[#FFE6A7] mb-8">{event.title}</h1>

      {/* Step Content */}
      <div className="bg-[#432818] rounded-xl p-6 mb-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Select Quantity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#99582A] rounded-lg">
                <div>
                  <h3 className="font-medium text-[#FFE6A7]">Standard Ticket</h3>
                  <p className="text-sm text-[#BB9457]">{event.availableTickets} tickets available</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg bg-[#432818] text-[#FFE6A7] hover:bg-[#6F1D1B] transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-[#FFE6A7] font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(event.availableTickets, quantity + 1))}
                    className="p-2 rounded-lg bg-[#432818] text-[#FFE6A7] hover:bg-[#6F1D1B] transition-colors"
                    disabled={quantity >= event.availableTickets}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#99582A] rounded-lg">
                <span className="text-[#FFE6A7]">Total Price</span>
                <span className="text-xl font-bold text-[#FFE6A7]">
                  ${(event.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Event Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#BB9457]">
                <Calendar size={20} />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-[#BB9457]">
                <Clock size={20} />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-start gap-2 text-[#BB9457]">
                <MapPin size={20} className="mt-1" />
                <div>
                  <p className="text-[#FFE6A7]">{event.venue.name}</p>
                  <p>{event.venue.address}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <button
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'bg-[#6F1D1B] text-[#FFE6A7]'
                      : 'bg-[#99582A] text-[#FFE6A7] hover:bg-[#6F1D1B]'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={24} />
                  <span>Card</span>
                </button>
                <button
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
                    paymentMethod === 'netbanking'
                      ? 'bg-[#6F1D1B] text-[#FFE6A7]'
                      : 'bg-[#99582A] text-[#FFE6A7] hover:bg-[#6F1D1B]'
                  }`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <Building2 size={24} />
                  <span>Net Banking</span>
                </button>
                <button
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
                    paymentMethod === 'upi'
                      ? 'bg-[#6F1D1B] text-[#FFE6A7]'
                      : 'bg-[#99582A] text-[#FFE6A7] hover:bg-[#6F1D1B]'
                  }`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <Smartphone size={24} />
                  <span>UPI</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm text-[#BB9457] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457]"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm text-[#BB9457] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457]"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm text-[#BB9457] mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457]"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cardName" className="block text-sm text-[#BB9457] mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457]"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bankName" className="block text-sm text-[#BB9457] mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457]"
                      placeholder="Enter your bank name"
                    />
                  </div>
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm text-[#BB9457] mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457]"
                      placeholder="Enter your account number"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="upiId" className="block text-sm text-[#BB9457] mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457]"
                      placeholder="username@upi"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm text-[#BB9457] mb-1">
                  Email (for receipt)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457]"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Confirmation</h2>
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  src={generateQRCode()}
                  alt="Ticket QR Code"
                  className="w-48 h-48"
                />
              </div>
              <div className="space-y-4 text-center">
                <p className="text-[#FFE6A7]">Your tickets have been confirmed!</p>
                <p className="text-[#BB9457]">
                  A confirmation email has been sent to {formData.email}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-[#6F1D1B] text-[#FFE6A7] px-6 py-2 rounded-lg hover:bg-[#99582A] transition-colors"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-[#99582A] text-[#FFE6A7] rounded-lg hover:bg-[#432818] transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#6F1D1B] text-[#FFE6A7] rounded-lg hover:bg-[#99582A] transition-colors"
          >
            {step === 3 ? 'Confirm Payment' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketPurchase; 
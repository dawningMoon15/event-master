import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Smartphone,
  Building2,
  QrCode,
} from 'lucide-react';
import { getEventById } from '../../data/events';

type PaymentMethod = 'card' | 'netbanking' | 'upi';

const TicketPurchase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = id ? getEventById(id) : undefined;

  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
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

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center h-96">
        <p className="text-[#6F1D1B] text-xl mb-4">Event not found</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[#FFE6A7] hover:text-[#BB9457] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Events</span>
        </button>
      </div>
    );
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const formatTime = (t: string) =>
    new Date(`2000-01-01T${t}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(`/events/${id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const generateQRCode = () => {
    const qrData = {
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue.name,
      quantity,
      totalPrice: (event.price * quantity).toFixed(2),
      confirmationCode: Math.random().toString(36).substring(2, 15),
    };
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      JSON.stringify(qrData)
    )}`;
  };

  const inputClass =
    'w-full px-4 py-2 bg-[#99582A] rounded-lg text-[#FFE6A7] placeholder-[#BB9457] outline-none';
  const labelClass = 'block text-sm text-[#BB9457] mb-1';

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
        {/* Step dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                s === step ? 'bg-[#6F1D1B]' : s < step ? 'bg-[#FFE6A7]' : 'bg-[#BB9457]'
              }`}
            />
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-[#FFE6A7] mb-8">{event.title}</h1>

      <div className="bg-[#432818] rounded-xl p-6 mb-8">
        {/* Step 1 — Quantity */}
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
                    disabled={quantity <= 1}
                    className="p-2 rounded-lg bg-[#432818] text-[#FFE6A7] hover:bg-[#6F1D1B] transition-colors disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="text-[#FFE6A7] font-medium w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(event.availableTickets, quantity + 1))}
                    disabled={quantity >= event.availableTickets}
                    className="p-2 rounded-lg bg-[#432818] text-[#FFE6A7] hover:bg-[#6F1D1B] transition-colors disabled:opacity-40"
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

        {/* Step 2 — Event Details */}
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

        {/* Step 3 — Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Payment Method</h2>
            <div className="space-y-4">
              {/* Method tabs */}
              <div className="grid grid-cols-3 gap-4">
                {([
                  { id: 'card', label: 'Card', icon: <CreditCard size={24} /> },
                  { id: 'netbanking', label: 'Net Banking', icon: <Building2 size={24} /> },
                  { id: 'upi', label: 'UPI', icon: <Smartphone size={24} /> },
                ] as { id: PaymentMethod; label: string; icon: React.ReactNode }[]).map(({ id: mid, label, icon }) => (
                  <button
                    key={mid}
                    onClick={() => setPaymentMethod(mid)}
                    className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === mid
                        ? 'bg-[#6F1D1B] text-[#FFE6A7]'
                        : 'bg-[#99582A] text-[#FFE6A7] hover:bg-[#6F1D1B]'
                    }`}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className={labelClass}>Card Number</label>
                    <input id="cardNumber" name="cardNumber" type="text" value={formData.cardNumber}
                      onChange={handleInputChange} className={inputClass} placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className={labelClass}>Expiry Date</label>
                      <input id="expiryDate" name="expiryDate" type="text" value={formData.expiryDate}
                        onChange={handleInputChange} className={inputClass} placeholder="MM/YY" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className={labelClass}>CVV</label>
                      <input id="cvv" name="cvv" type="text" value={formData.cvv}
                        onChange={handleInputChange} className={inputClass} placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cardName" className={labelClass}>Name on Card</label>
                    <input id="cardName" name="cardName" type="text" value={formData.cardName}
                      onChange={handleInputChange} className={inputClass} placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bankName" className={labelClass}>Bank Name</label>
                    <input id="bankName" name="bankName" type="text" value={formData.bankName}
                      onChange={handleInputChange} className={inputClass} placeholder="Enter your bank name" />
                  </div>
                  <div>
                    <label htmlFor="accountNumber" className={labelClass}>Account Number</label>
                    <input id="accountNumber" name="accountNumber" type="text" value={formData.accountNumber}
                      onChange={handleInputChange} className={inputClass} placeholder="Enter your account number" />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div>
                  <label htmlFor="upiId" className={labelClass}>UPI ID</label>
                  <input id="upiId" name="upiId" type="text" value={formData.upiId}
                    onChange={handleInputChange} className={inputClass} placeholder="username@upi" />
                </div>
              )}

              <div>
                <label htmlFor="email" className={labelClass}>Email (for receipt)</label>
                <input id="email" name="email" type="email" value={formData.email}
                  onChange={handleInputChange} className={inputClass} placeholder="your@email.com" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Confirmation */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#FFE6A7] mb-4">Confirmation</h2>
            <div className="space-y-6">
              <div className="flex justify-center">
                <img src={generateQRCode()} alt="Ticket QR Code" className="w-48 h-48 rounded-lg" />
              </div>
              <div className="space-y-4 text-center">
                <p className="text-[#FFE6A7] text-lg font-semibold">Your tickets have been confirmed! 🎉</p>
                {formData.email && (
                  <p className="text-[#BB9457]">A confirmation email has been sent to {formData.email}</p>
                )}
                <div className="pt-4">
                  <button
                    onClick={() => navigate('/dashboard/attendee')}
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

      {/* Navigation */}
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
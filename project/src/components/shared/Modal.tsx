import React from 'react';
import { X, CheckCircle2, AlertTriangle, QrCode } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'confirmation' | 'error' | 'qr' | 'refund';
  title: string;
  message?: string;
  qrCode?: string;
  ticketInfo?: {
    eventName: string;
    ticketType: string;
    price: number;
  };
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  qrCode,
  ticketInfo,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'confirmation':
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-12 h-12 text-red-500" />;
      case 'qr':
        return <QrCode className="w-12 h-12 text-primary" />;
      case 'refund':
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-secondary/90 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-md w-full mx-4 border border-primary-light/20">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h3 className="text-xl font-bold text-accent">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-accent/60 hover:text-accent transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {message && (
          <p className="text-accent/80 mb-4">{message}</p>
        )}

        {type === 'qr' && qrCode && (
          <div className="flex justify-center my-4">
            <img src={qrCode} alt="QR Code" className="w-48 h-48" />
          </div>
        )}

        {type === 'refund' && ticketInfo && (
          <div className="bg-primary-light/10 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-accent mb-2">Ticket Information</h4>
            <div className="space-y-2">
              <p className="text-sm text-accent/80">
                Event: {ticketInfo.eventName}
              </p>
              <p className="text-sm text-accent/80">
                Type: {ticketInfo.ticketType}
              </p>
              <p className="text-sm text-accent/80">
                Price: ${ticketInfo.price.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-primary-light/20 text-accent/80 hover:text-accent hover:border-accent/50 transition-colors"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg ${
                type === 'error' || type === 'refund'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-primary hover:bg-primary-light'
              } text-white transition-colors`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal; 
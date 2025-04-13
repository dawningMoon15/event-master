import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface RealTimeStatusProps {
  type: 'ticket' | 'event';
  status: 'available' | 'sold-out' | 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  count?: number;
  total?: number;
  lastUpdated?: string;
}

const RealTimeStatus: React.FC<RealTimeStatusProps> = ({
  type,
  status,
  count,
  total,
  lastUpdated
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'available':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
          text: 'Available',
          color: 'text-green-500'
        };
      case 'sold-out':
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          text: 'Sold Out',
          color: 'text-red-500'
        };
      case 'scheduled':
        return {
          icon: <Clock className="w-4 h-4 text-blue-500" />,
          text: 'Scheduled',
          color: 'text-blue-500'
        };
      case 'ongoing':
        return {
          icon: <Clock className="w-4 h-4 text-yellow-500" />,
          text: 'Ongoing',
          color: 'text-yellow-500'
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
          text: 'Completed',
          color: 'text-green-500'
        };
      case 'cancelled':
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          text: 'Cancelled',
          color: 'text-red-500'
        };
      default:
        return {
          icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
          text: 'Unknown',
          color: 'text-yellow-500'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex items-center space-x-2">
      {statusConfig.icon}
      <span className={`text-sm font-medium ${statusConfig.color}`}>
        {statusConfig.text}
      </span>
      {type === 'ticket' && count !== undefined && total !== undefined && (
        <span className="text-sm text-accent/80">
          ({count}/{total} remaining)
        </span>
      )}
      {lastUpdated && (
        <span className="text-xs text-accent/60">
          Updated {new Date(lastUpdated).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

export default RealTimeStatus; 
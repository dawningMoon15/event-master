import React from 'react';
import EventFeed from '../../components/events/EventFeed';

const AttendeesDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFE6A7] px-4 py-8">
      <div className="container mx-auto">
        <EventFeed />
      </div>
    </div>
  );
};

export default AttendeesDashboard;
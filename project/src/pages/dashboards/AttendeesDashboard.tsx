import React from 'react';
import EventFeed from '../../components/events/EventFeed';
import RecommendedEvents from '../../components/events/RecommendedEvents';

const AttendeesDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#99582A] p-6">
      <RecommendedEvents />
      <EventFeed />
    </div>
  );
};

export default AttendeesDashboard;
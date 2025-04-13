import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Image, 
  Music, 
  Link, 
  Mail, 
  CheckCircle, 
  XCircle,
  Star,
  FileText
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: 'pending' | 'accepted' | 'declined';
  image: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  genres: string[];
  performanceType: string;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

const ArtistDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [eventInvites, setEventInvites] = useState<Event[]>([
    {
      id: 1,
      title: "Summer Music Festival 2025",
      date: "2025-07-15",
      time: "16:00",
      venue: "Central Park Arena",
      status: "pending",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop"
    }
  ]);
  const [acceptedEvents, setAcceptedEvents] = useState<Event[]>([
    {
      id: 2,
      title: "Spring Jazz Festival",
      date: "2025-04-20",
      time: "19:00",
      venue: "Downtown Jazz Club",
      status: "accepted",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop"
    }
  ]);

  const handleAcceptInvite = (eventId: number): void => {
    setEventInvites((prev: Event[]) => prev.filter((event: Event) => event.id !== eventId));
    const acceptedEvent = eventInvites.find((event: Event) => event.id === eventId);
    if (acceptedEvent) {
      setAcceptedEvents((prev: Event[]) => [...prev, { ...acceptedEvent, status: 'accepted' }]);
    }
  };

  const handleDeclineInvite = (eventId: number): void => {
    setEventInvites((prev: Event[]) => prev.map((event: Event) => 
      event.id === eventId ? { ...event, status: 'declined' } : event
    ));
  };

  const handleAddPortfolioItem = (item: PortfolioItem): void => {
    setPortfolioItems((prev: PortfolioItem[]) => [...prev, item]);
  };

  const handleAddSocialLink = (link: SocialLink): void => {
    setSocialLinks((prev: SocialLink[]) => [...prev, link]);
  };

  const renderPortfolioSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-primary-light/20">
        <h2 className="text-xl font-semibold text-primary mb-4">Portfolio Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary">Upload Media</h3>
            <div className="border-2 border-dashed border-primary-light/20 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*,video/*,audio/*"
                className="hidden"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Image className="w-12 h-12 text-primary-light" />
                <span className="text-secondary">Drag and drop or click to upload</span>
                <span className="text-sm text-secondary-light">Images, Videos, Audio</span>
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-primary">Social Links</h3>
            <div className="space-y-4">
              {socialLinks.map(link => (
                <div key={link.id} className="flex items-center space-x-2">
                  <Link className="w-5 h-5 text-primary-light" />
                  <span className="text-secondary">{link.platform}</span>
                  <span className="text-secondary-light">{link.url}</span>
                </div>
              ))}
              <button className="flex items-center space-x-2 text-primary hover:text-primary-light">
                <Link className="w-5 h-5" />
                <span>Add Social Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-primary-light/20">
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <div className="flex flex-wrap gap-2">
                {item.genres.map(genre => (
                  <span key={genre} className="px-2 py-1 bg-primary-light/10 text-primary rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="text-secondary">
                <span className="font-medium">Type:</span> {item.performanceType}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInvitesSection = () => (
    <div className="space-y-6">
      {eventInvites.map(event => (
        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-primary-light/20">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-primary">{event.title}</h3>
            <div className="space-y-2">
              <div className="flex items-center text-secondary">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-secondary">
                <Clock className="w-4 h-4 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-secondary">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.venue}</span>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleAcceptInvite(event.id)}
                className="flex items-center space-x-2 bg-primary text-accent px-4 py-2 rounded-md hover:bg-primary-light transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Accept</span>
              </button>
              <button
                onClick={() => handleDeclineInvite(event.id)}
                className="flex items-center space-x-2 bg-secondary-light/20 text-secondary px-4 py-2 rounded-md hover:bg-secondary-light/30 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Decline</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEventsSection = () => (
    <div className="space-y-6">
      {acceptedEvents.map(event => (
        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-primary-light/20">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-primary">{event.title}</h3>
            <div className="space-y-2">
              <div className="flex items-center text-secondary">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-secondary">
                <Clock className="w-4 h-4 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-secondary">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.venue}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-primary-light/20">
              <h4 className="text-md font-medium text-primary mb-2">Attendee Feedback</h4>
              <div className="space-y-2">
                <div className="flex items-center text-secondary">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span>4.8/5.0 (120 reviews)</span>
                </div>
                <div className="text-secondary-light">
                  "Amazing performance! The energy was incredible."
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (currentPath.includes('/invites')) {
      return renderInvitesSection();
    } else if (currentPath.includes('/events')) {
      return renderEventsSection();
    }
    return renderPortfolioSection();
  };

  return (
    <div className="space-y-6 bg-accent/10 p-6 rounded-lg">
      {renderContent()}
    </div>
  );
};

export default ArtistDashboard;
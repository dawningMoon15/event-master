import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Image as ImageIcon, 
  Music, 
  Link as LinkIcon, 
  Mail, 
  CheckCircle, 
  XCircle,
  Star,
  FileText,
  UserCircle,
  Mic2,
  Share2,
  ExternalLink,
  PlayCircle
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
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "Summer Jazz Performance",
      type: "video",
      url: "/videos/jazz-performance.mp4",
      genres: ["Jazz", "Blues"],
      performanceType: "Live Performance"
    },
    {
      id: 2,
      title: "Classical Piano Recital",
      type: "audio",
      url: "/audio/piano-recital.mp3",
      genres: ["Classical"],
      performanceType: "Solo Performance"
    }
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: 1,
      platform: "Instagram",
      url: "instagram.com/artistname"
    },
    {
      id: 2,
      platform: "YouTube",
      url: "youtube.com/@artistname"
    }
  ]);

  const [eventInvites, setEventInvites] = useState<Event[]>([
    {
      id: 1,
      title: "Summer Music Festival 2024",
      date: "2024-07-15",
      time: "18:00",
      venue: "Central Park Amphitheater",
      status: "pending",
      image: "https://example.com/festival-image.jpg"
    },
    {
      id: 2,
      title: "Jazz Night at Blue Note",
      date: "2024-06-01",
      time: "20:00",
      venue: "Blue Note Jazz Club",
      status: "pending",
      image: "https://example.com/jazz-club-image.jpg"
    }
  ]);

  const [acceptedEvents, setAcceptedEvents] = useState<Event[]>([
    {
      id: 3,
      title: "Spring Music Showcase",
      date: "2024-04-20",
      time: "19:30",
      venue: "City Concert Hall",
      status: "accepted",
      image: "https://example.com/concert-hall-image.jpg"
    },
    {
      id: 4,
      title: "Arts & Music Festival",
      date: "2024-05-10",
      time: "16:00",
      venue: "Riverside Park",
      status: "accepted",
      image: "https://example.com/festival-image.jpg"
    }
  ]);

  const [profile, setProfile] = useState({
    bio: '',
    genres: [] as string[],
    profilePhoto: '',
  });

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

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenreChange = (genre: string) => {
    setProfile(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile(prev => ({ ...prev, bio: e.target.value }));
  };

  const renderPortfolioSection = () => (
    <div className="space-y-8">
      <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-primary-light/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-accent">Portfolio Management</h2>
          <button className="flex items-center space-x-2 bg-primary/90 text-accent px-4 py-2 rounded-lg hover:bg-primary transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share Portfolio</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent flex items-center">
              <Mic2 className="w-5 h-5 mr-2" />
              Upload Media
            </h3>
            <div className="border-2 border-dashed border-primary-light/20 rounded-xl p-8 text-center bg-secondary/80 hover:bg-secondary/90 transition-colors group cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*,audio/*"
                className="hidden"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="cursor-pointer flex flex-col items-center space-y-3"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ImageIcon className="w-8 h-8 text-accent" />
                </div>
                <span className="text-lg font-medium text-accent">Drag and drop or click to upload</span>
                <span className="text-sm text-accent/80">Support for images, videos, and audio files</span>
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent flex items-center">
              <LinkIcon className="w-5 h-5 mr-2" />
              Social Links
            </h3>
            <div className="space-y-4 bg-secondary/80 p-6 rounded-xl">
              {socialLinks.map(link => (
                <div key={link.id} className="flex items-center justify-between p-3 rounded-lg border border-primary-light/10 hover:border-primary-light/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <LinkIcon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-accent font-medium">{link.platform}</span>
                      <p className="text-sm text-accent/80">{link.url}</p>
                    </div>
                  </div>
                  <a href={`https://${link.url}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              ))}
              <button className="w-full flex items-center justify-center space-x-2 text-accent hover:text-accent/80 p-3 rounded-lg border border-dashed border-primary-light/20 hover:border-primary-light/40 transition-colors">
                <LinkIcon className="w-5 h-5" />
                <span>Add Social Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map(item => (
          <div key={item.id} className="group bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-primary-light/20 hover:border-primary-light/40 transition-all hover:transform hover:scale-[1.02]">
            <div className="relative aspect-video bg-primary/10">
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              {item.type === 'audio' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music className="w-12 h-12 text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              <img 
                src={item.type === 'video' ? 
                  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80" : 
                  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"
                } 
                alt={item.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-accent group-hover:text-accent/90 transition-colors">{item.title}</h3>
              <div className="flex flex-wrap gap-2">
                {item.genres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-primary/90 text-accent rounded-full text-sm font-medium">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-accent/80">
                <Music className="w-4 h-4 mr-2" />
                <span className="font-medium">{item.performanceType}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-secondary/30 rounded-xl border-2 border-dashed border-primary-light/20 flex items-center justify-center p-8 cursor-pointer hover:bg-secondary/40 transition-colors">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-accent/80" />
            </div>
            <h3 className="text-lg font-medium text-accent">Add New Item</h3>
            <p className="text-sm text-accent/80 mt-2">Upload images, videos, or audio files</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvitesSection = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">Event Invitations</h2>
        <div className="flex items-center space-x-2 text-accent/80">
          <Calendar className="w-5 h-5" />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>
      {eventInvites.length === 0 ? (
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-primary-light/20 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-accent/80" />
          </div>
          <h3 className="text-lg font-medium text-accent mb-2">No Pending Invitations</h3>
          <p className="text-accent/80">Check back later for new event opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {eventInvites.map(event => (
            <div key={event.id} className="group bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-primary-light/20 hover:border-primary-light/40 transition-all">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80"
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-accent mb-2">{event.title}</h3>
                  <div className="flex items-center space-x-4 text-accent/90">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-accent">Venue</h4>
                    <p className="text-accent/80">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4">
                  <button
                    onClick={() => handleAcceptInvite(event.id)}
                    className="flex items-center space-x-2 bg-primary/90 text-accent px-6 py-2 rounded-lg hover:bg-primary transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleDeclineInvite(event.id)}
                    className="flex items-center space-x-2 bg-secondary text-accent px-6 py-2 rounded-lg hover:bg-secondary/80 transition-colors border border-primary-light/20"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEventsSection = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-accent">Upcoming Events</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-accent/80 hover:text-accent">
            <Calendar className="w-5 h-5" />
            <span>Calendar View</span>
          </button>
        </div>
      </div>
      {acceptedEvents.length === 0 ? (
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-primary-light/20 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-accent/80" />
          </div>
          <h3 className="text-lg font-medium text-accent mb-2">No Upcoming Events</h3>
          <p className="text-accent/80">Check your invitations to accept new events.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {acceptedEvents.map(event => (
            <div key={event.id} className="bg-secondary/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-primary-light/20">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 relative">
                  <img
                    src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80"
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-transparent lg:bg-gradient-to-t" />
                  <div className="absolute bottom-4 left-4 right-4 lg:right-0">
                    <h3 className="text-xl font-bold text-accent mb-2">{event.title}</h3>
                    <div className="flex items-center space-x-4 text-accent/90">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 lg:w-2/3 lg:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-accent">Performance Time</h4>
                          <p className="text-accent/80">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-accent">Venue</h4>
                          <p className="text-accent/80">{event.venue}</p>
                          <p className="text-accent/80 mt-1">Stage: Main Stage</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-secondary/80 rounded-lg p-4">
                        <h4 className="font-medium text-accent mb-3 flex items-center">
                          <Star className="w-5 h-5 text-yellow-500 mr-2" />
                          Attendee Feedback
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-accent">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="text-lg font-bold">4.8</span>
                                <span className="text-sm text-accent/80 ml-1">/5.0</span>
                              </div>
                              <span className="text-sm text-accent/80">120 reviews</span>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 text-yellow-500" fill={star <= 4 ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <div className="text-accent/90 italic">
                            "Amazing performance! The energy was incredible."
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const getCurrentSection = () => {
    if (location.pathname.includes('/profile')) {
      return (
        <div className="bg-secondary rounded-lg shadow-md p-6 border border-primary-light/20">
          <h2 className="text-xl font-semibold text-accent mb-6">Artist Profile</h2>
          
          {/* Profile Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-accent mb-2">Profile Photo</label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center">
                    <UserCircle className="w-16 h-16 text-accent" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-sm text-accent/80">Click to upload a profile photo</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-accent mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={handleBioChange}
              rows={4}
              className="w-full px-3 py-2 bg-secondary border border-primary-light/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-accent placeholder-accent/50"
              placeholder="Tell us about yourself and your artistic journey..."
            />
          </div>

          {/* Genres */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-accent mb-2">Genres</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {['Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 'Folk', 'Country', 'R&B', 'Metal'].map((genre) => (
                <label key={genre} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={profile.genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    className="h-4 w-4 text-accent focus:ring-accent border-primary-light/20 rounded bg-secondary"
                  />
                  <span className="text-sm text-accent">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => console.log('Save profile:', profile)}
            className="bg-primary text-accent px-4 py-2 rounded-md hover:bg-primary-light transition-colors"
          >
            Save Profile
          </button>
        </div>
      );
    } else if (location.pathname.includes('/invites')) {
      return renderInvitesSection();
    } else if (location.pathname.includes('/events')) {
      return renderEventsSection();
    } else {
      return renderPortfolioSection();
    }
  };

  return (
    <div className="space-y-6 bg-secondary p-6 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-accent">Artist Dashboard</h1>
      </div>

      {getCurrentSection()}
    </div>
  );
};

export default ArtistDashboard;
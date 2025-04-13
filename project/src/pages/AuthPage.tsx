import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Calendar, Image, Music, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ArtistFormData {
  bio: string;
  genres: string[];
  profilePhoto: File | null;
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [role, setRole] = useState<string>('attendee');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [artistData, setArtistData] = useState<ArtistFormData>({
    bio: '',
    genres: [],
    profilePhoto: null
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // In a real app, you would make an API call here
    // For now, we'll simulate successful auth and redirect
    
    if (isLogin) {
      // Simulate login - in real app, validate credentials
      navigate(`/dashboard/${role}`);
    } else {
      // Simulate registration - in real app, create account
      navigate(`/dashboard/${role}`);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setArtistData((prev: ArtistFormData) => ({ ...prev, profilePhoto: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleGenreChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    setArtistData((prev: ArtistFormData) => ({
      ...prev,
      genres: checked
        ? [...prev.genres, value]
        : prev.genres.filter((genre: string) => genre !== value)
    }));
  };

  const renderArtistFields = (): JSX.Element | null => {
    if (role !== 'artist' || isLogin) return null;

    const genreOptions = [
      'Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop',
      'Electronic', 'Folk', 'Country', 'R&B', 'Metal'
    ];

    return (
      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-secondary">
            Profile Photo
          </label>
          <div className="mt-2 flex items-center space-x-4">
            <div className="relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary-light/20 flex items-center justify-center">
                  <Image className="w-8 h-8 text-primary-light" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-sm text-secondary-light">
              Click to upload a profile photo
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary">
            Bio
          </label>
          <div className="mt-1">
            <textarea
              value={artistData.bio}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                setArtistData((prev: ArtistFormData) => ({ ...prev, bio: e.target.value }))
              }
              rows={4}
              className="appearance-none block w-full px-3 py-2 border border-primary-light rounded-md shadow-sm placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-light"
              placeholder="Tell us about yourself and your artistic journey..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Genres
          </label>
          <div className="grid grid-cols-2 gap-2">
            {genreOptions.map((genre: string) => (
              <label key={genre} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={genre}
                  checked={artistData.genres.includes(genre)}
                  onChange={handleGenreChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-primary-light rounded"
                />
                <span className="text-sm text-secondary">{genre}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-accent/20 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center space-x-2">
          <Calendar className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-primary">EventMaster</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg border border-primary-light/20 sm:rounded-lg sm:px-10">
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary">
                I am a...
              </label>
              <select
                value={role}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-light"
              >
                <option value="attendee">Attendee</option>
                <option value="artist">Artist</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-primary-light rounded-md shadow-sm placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-light"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-primary-light rounded-md shadow-sm placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-light"
                />
              </div>
            </div>

            {renderArtistFields()}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-light/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-secondary">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary-light"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
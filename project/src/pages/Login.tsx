import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to log in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE6A7] px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-[#FFE6A7] rounded-lg shadow-lg border-2 border-[#432818]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#432818]">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-[#6F1D1B] text-sm text-center font-medium">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#432818] placeholder-[#432818]/70 text-[#432818] rounded-t-md focus:outline-none focus:ring-[#6F1D1B] focus:border-[#6F1D1B] focus:z-10 sm:text-sm bg-[#FFE6A7]"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#432818] placeholder-[#432818]/70 text-[#432818] rounded-b-md focus:outline-none focus:ring-[#6F1D1B] focus:border-[#6F1D1B] focus:z-10 sm:text-sm bg-[#FFE6A7]"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#FFE6A7] bg-[#432818] hover:bg-[#99582A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6F1D1B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 
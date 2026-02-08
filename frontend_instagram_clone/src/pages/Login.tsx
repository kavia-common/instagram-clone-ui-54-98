import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
/**
 * Login page component with Instagram-style UI
 * Handles mock authentication and redirects to home feed
 */
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // PUBLIC_INTERFACE
  /**
   * Handle form submission for login
   * @param e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-sm w-full px-4">
        {/* Main login card */}
        <div className="bg-white border border-gray-300 rounded-sm p-10 mb-3">
          {/* Instagram logo */}
          <h1 className="text-5xl font-['Billabong',cursive] text-center mb-8 tracking-wider">
            Instagram
          </h1>
          
          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              placeholder="Phone number, username, or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-2 py-2 text-xs border border-gray-300 rounded-sm bg-gray-50 focus:outline-none focus:border-gray-400"
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-2 py-2 text-xs border border-gray-300 rounded-sm bg-gray-50 focus:outline-none focus:border-gray-400"
            />
            
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-blue-500 text-white font-semibold py-1.5 rounded-lg mt-4 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          {/* OR divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          
          {/* Facebook login (mock) */}
          <button className="w-full flex items-center justify-center text-blue-900 font-semibold text-sm">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Log in with Facebook
          </button>
          
          {/* Forgot password */}
          <div className="text-center mt-4">
            <a href="#" className="text-xs text-blue-900">
              Forgot password?
            </a>
          </div>
        </div>
        
        {/* Sign up card */}
        <div className="bg-white border border-gray-300 rounded-sm p-5 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 font-semibold">
              Sign up
            </a>
          </p>
        </div>
        
        {/* Get app section */}
        <div className="text-center mt-5">
          <p className="text-sm mb-4">Get the app.</p>
          <div className="flex justify-center gap-2">
            <img 
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" 
              alt="Download on App Store" 
              className="h-10"
            />
            <img 
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" 
              alt="Get it on Google Play" 
              className="h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

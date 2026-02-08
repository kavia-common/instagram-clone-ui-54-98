import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface TopNavigationProps {
  onSearch?: (query: string) => void;
}

// PUBLIC_INTERFACE
/**
 * Top navigation bar component with Instagram-style layout
 * Contains logo, search bar, and action icons
 */
const TopNavigation: React.FC<TopNavigationProps> = ({ onSearch }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <h1 
          className="text-2xl font-['Billaboo,cursive] tracking-wider cursor-pointer"
          onClick={() => navigate('/home')}
        >
          Instagram
        </h1>
        
        {/* Search bar - hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-xs mx-4">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full px-4 py-1.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        
        {/* Action icons */}
        <div className="flex items-center gap-5">
          {/* Home */}
          <svg 
            className="w-6 h-6 cursor-pointer hover:scale-110 transition" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            onClick={() => navigate('/home')}
          >
            <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"/>
          </svg>
          
          {/* Messages - hidden on mobile */}
          <svg 
            className="w-6 h-6 cursor-pointer hover:scale-110 transition hidden md:block" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            onClick={() => navigate('/messages')}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          
          {/* New post */}
          <svg 
            className="w-6 h-6 cursor-pointer hover:scale-110 transition hidden md:block" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/>
            <line x1="12" y1="8" x2="12" y2="16" strokeWidth={2} strokeLinecap="round"/>
            <line x1="8" y1="12" x2="16" y2="12" strokeWidth={2} strokeLinecap="round"/>
          </svg>
          
          {/* Explore */}
          <svg 
            className="w-6 h-6 cursor-pointer hover:scale-110 transition hidden md:block" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            onClick={() => navigate('/explore')}
          >
            <polygon points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" strokeWidth={2} fill="currentColor"/>
            <circle cx="12.001" cy="12.005" r="10.5" strokeWidth={2}/>
          </svg>
          
          {/* Notifications */}
          <svg 
            className="w-6 h-6 cursor-pointer hover:scale-110 transition hidden md:block" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          
          {/* Profile / Menu */}
          <div className="relative group">
            <img 
              src={user?.avatar || 'https://i.pravatar.cc/150?img=12'}
              alt="Profile" 
              className="w-7 h-7 rounded-full cursor-pointer border-2 border-transparent hover:border-gray-300"
            />
            
            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-200">
              <button 
                onClick={() => navigate('/profile')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </span>
              </button>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Saved
                </span>
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </span>
              </a>
              <hr className="my-1"/>
              <button 
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;

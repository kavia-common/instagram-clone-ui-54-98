import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface BottomNavigationProps {
  onCreatePost?: () => void;
}

// PUBLIC_INTERFACE
/**
 * Bottom navigation bar for mobile devices
 * Contains main navigation icons similar to Instagram mobile app
 */
const BottomNavigation: React.FC<BottomNavigationProps> = ({ onCreatePost }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-50">
      <div className="flex items-center justify-around h-12 px-2">
        {/* Home */}
        <button onClick={() => navigate('/home')} className="p-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"/>
          </svg>
        </button>
        
        {/* Search */}
        <button onClick={() => navigate('/explore')} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        {/* New post */}
        <button onClick={onCreatePost} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/>
            <line x1="12" y1="8" x2="12" y2="16" strokeWidth={2} strokeLinecap="round"/>
            <line x1="8" y1="12" x2="16" y2="12" strokeWidth={2} strokeLinecap="round"/>
          </svg>
        </button>
        
        {/* Reels */}
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </button>
        
        {/* Profile */}
        <button onClick={() => navigate('/profile')} className="p-2">
          <img 
            src={user?.avatar || 'https://i.pravatar.cc/150?img=12'}
            alt="Profile" 
            className="w-6 h-6 rounded-full object-cover border border-gray-300"
          />
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;

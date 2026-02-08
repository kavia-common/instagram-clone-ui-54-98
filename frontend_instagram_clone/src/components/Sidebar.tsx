import React from 'react';
import { Suggestion } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  suggestions: Suggestion[];
}

// PUBLIC_INTERFACE
/**
 * Sidebar component displaying user profile and suggestions
 * Shows on desktop layouts only
 */
const Sidebar: React.FC<SidebarProps> = ({ suggestions }) => {
  const { user } = useAuth();

  return (
    <div className="hidden lg:block w-80 pl-16 pt-8">
      {/* Current user profile */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={user?.avatar || 'https://i.pravatar.cc/150?img=12'} 
            alt={user?.username}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{user?.username}</p>
            <p className="text-sm text-gray-500">{user?.fullName}</p>
          </div>
        </div>
        <button className="text-blue-500 text-xs font-semibold hover:text-blue-700">
          Switch
        </button>
      </div>
      
      {/* Suggestions header */}
      <div className="flex items-center justify-between mb-4 mt-6">
        <h3 className="text-gray-500 font-semibold text-sm">Suggestions For You</h3>
        <button className="text-xs font-semibold hover:text-gray-600">See All</button>
      </div>
      
      {/* Suggestions list */}
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div key={suggestion.user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={suggestion.user.avatar} 
                alt={suggestion.user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{suggestion.user.username}</p>
                <p className="text-xs text-gray-500">{suggestion.relationText}</p>
              </div>
            </div>
            <button className="text-blue-500 text-xs font-semibold hover:text-blue-700">
              Follow
            </button>
          </div>
        ))}
      </div>
      
      {/* Footer links */}
      <div className="mt-8 text-xs text-gray-400 space-y-2">
        <div className="flex flex-wrap gap-x-2">
          <a href="#" className="hover:underline">About</a>
          <span>·</span>
          <a href="#" className="hover:underline">Help</a>
          <span>·</span>
          <a href="#" className="hover:underline">Press</a>
          <span>·</span>
          <a href="#" className="hover:underline">API</a>
          <span>·</span>
          <a href="#" className="hover:underline">Jobs</a>
          <span>·</span>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <a href="#" className="hover:underline">Terms</a>
          <span>·</span>
          <a href="#" className="hover:underline">Locations</a>
          <span>·</span>
          <a href="#" className="hover:underline">Language</a>
        </div>
        <p className="mt-4">© 2024 INSTAGRAM CLONE</p>
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { Story } from '../utils/mockData';

interface StoriesProps {
  stories: Story[];
}

// PUBLIC_INTERFACE
/**
 * Stories component displaying horizontal scrolling row of user stories
 * Shows avatars with gradient borders for unviewed stories
 */
const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center flex-shrink-0 cursor-pointer"
          >
            <div 
              className={`p-0.5 rounded-full ${
                story.isViewed 
                  ? 'bg-gray-300' 
                  : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
              }`}
            >
              <div className="bg-white p-0.5 rounded-full">
                <img 
                  src={story.user.avatar} 
                  alt={story.user.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs mt-1 max-w-[64px] truncate">
              {story.user.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;

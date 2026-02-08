import React from 'react';

// PUBLIC_INTERFACE
/**
 * StoriesSkeleton component for displaying loading placeholder for stories
 * Shows animated shimmer effect for horizontal scrolling story circles
 */
const StoriesSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center flex-shrink-0 animate-pulse"
          >
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="h-2 w-12 bg-gray-300 rounded mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesSkeleton;

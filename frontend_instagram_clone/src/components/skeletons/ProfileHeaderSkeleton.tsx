import React from 'react';

// PUBLIC_INTERFACE
/**
 * ProfileHeaderSkeleton component for displaying loading placeholder for profile header
 * Shows animated shimmer effect for profile picture, username, stats, and bio
 */
const ProfileHeaderSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 md:p-10 mb-8 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Profile picture skeleton */}
        <div className="flex justify-center md:justify-start">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300"></div>
        </div>
        
        {/* Profile info skeleton */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="flex gap-2">
              <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
              <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
              <div className="w-10 h-8 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
          
          {/* Stats skeleton */}
          <div className="flex justify-around md:justify-start md:gap-10 mb-6">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
          
          {/* Bio skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-3 w-48 bg-gray-300 rounded"></div>
            <div className="h-3 w-40 bg-gray-300 rounded"></div>
            <div className="h-3 w-36 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;

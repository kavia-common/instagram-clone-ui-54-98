import React from 'react';

// PUBLIC_INTERFACE
/**
 * PostSkeleton component for displaying loading placeholder for posts
 * Shows animated shimmer effect for post structure (header, image, actions, caption)
 */
const PostSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg mb-6 animate-pulse">
      {/* Post header skeleton */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="h-3 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
      </div>
      
      {/* Post image skeleton */}
      <div className="w-full aspect-square bg-gray-300"></div>
      
      {/* Action buttons skeleton */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 bg-gray-300 rounded"></div>
          <div className="w-7 h-7 bg-gray-300 rounded"></div>
          <div className="w-7 h-7 bg-gray-300 rounded"></div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
      </div>
      
      {/* Likes skeleton */}
      <div className="px-3 pb-2">
        <div className="h-3 w-20 bg-gray-300 rounded"></div>
      </div>
      
      {/* Caption skeleton */}
      <div className="px-3 pb-2 space-y-2">
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
      </div>
      
      {/* Comments skeleton */}
      <div className="px-3 pb-2 space-y-2">
        <div className="h-3 w-32 bg-gray-300 rounded"></div>
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
      </div>
      
      {/* Timestamp skeleton */}
      <div className="px-3 pb-2">
        <div className="h-2 w-16 bg-gray-300 rounded"></div>
      </div>
      
      {/* Add comment skeleton */}
      <div className="border-t border-gray-300 p-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
          <div className="flex-1 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;

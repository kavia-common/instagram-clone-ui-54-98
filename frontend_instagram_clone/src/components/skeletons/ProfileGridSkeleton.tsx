import React from 'react';

// PUBLIC_INTERFACE
/**
 * ProfileGridSkeleton component for displaying loading placeholder for profile posts grid
 * Shows animated shimmer effect for 3-column grid of square placeholders
 */
const ProfileGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="relative aspect-square bg-gray-300 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default ProfileGridSkeleton;

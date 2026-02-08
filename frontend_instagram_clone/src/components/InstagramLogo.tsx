import React from 'react';

interface InstagramLogoProps {
  className?: string;
  onClick?: () => void;
}

// PUBLIC_INTERFACE
/**
 * Instagram logo component using the official Instagram icon
 * Displays the official Instagram gradient camera icon from Wikimedia Commons
 */
const InstagramLogo: React.FC<InstagramLogoProps> = ({ className = '', onClick }) => {
  return (
    <img
      src="/instagram-icon.svg"
      alt="Instagram"
      className={className}
      onClick={onClick}
      style={{
        width: '29px',
        height: '29px',
        cursor: onClick ? 'pointer' : 'default'
      }}
    />
  );
};

export default InstagramLogo;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMockReels, Reel } from '../utils/mockReels';

// PUBLIC_INTERFACE
/**
 * Reels page component displaying vertical full-screen video feed
 * Features swipe/scroll navigation, video playback, and Instagram-style interactions
 */
const Reels: React.FC = () => {
  const navigate = useNavigate();
  const [reels, setReels] = useState<Reel[]>(getMockReels());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  const currentReel = reels[currentIndex];

  // PUBLIC_INTERFACE
  /**
   * Handle video playback for current reel
   */
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play().catch(() => {
          // Auto-play might be blocked, that's okay
        });
      } else {
        currentVideo.pause();
      }
    }

    // Pause other videos
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== currentIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, isPlaying]);

  // PUBLIC_INTERFACE
  /**
   * Handle scroll/swipe to navigate between reels
   */
  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'down' && currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    } else if (direction === 'up' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(true);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handle wheel scroll events
   */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (Math.abs(e.deltaY) > 10) {
      handleScroll(e.deltaY > 0 ? 'down' : 'up');
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handle touch events for mobile swipe
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    
    if (Math.abs(diff) > 50) {
      handleScroll(diff > 0 ? 'down' : 'up');
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Toggle video play/pause
   */
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // PUBLIC_INTERFACE
  /**
   * Toggle like on current reel
   */
  const handleLike = () => {
    setReels(prevReels =>
      prevReels.map((reel, idx) =>
        idx === currentIndex
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
            }
          : reel
      )
    );
  };

  // PUBLIC_INTERFACE
  /**
   * Toggle save on current reel
   */
  const handleSave = () => {
    setReels(prevReels =>
      prevReels.map((reel, idx) =>
        idx === currentIndex
          ? { ...reel, isSaved: !reel.isSaved }
          : reel
      )
    );
  };

  // PUBLIC_INTERFACE
  /**
   * Handle keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleScroll('down');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleScroll('up');
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isPlaying]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate('/home')}
            className="text-white hover:text-gray-300 transition"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white text-xl font-semibold">Reels</h2>
          <button className="text-white hover:text-gray-300 transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={reel.videoUrl}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={isMuted}
              onClick={togglePlayPause}
              poster={reel.thumbnailUrl}
            />

            {/* Play/Pause overlay */}
            {!isPlaying && index === currentIndex && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/50 rounded-full p-6">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Right side actions */}
        <div className="absolute right-4 bottom-20 z-10 flex flex-col gap-6 items-center">
          {/* Profile */}
          <div className="relative">
            <img
              src={currentReel.user.avatar}
              alt={currentReel.user.username}
              className="w-12 h-12 rounded-full border-2 border-white object-cover cursor-pointer"
              onClick={() => navigate('/profile')}
            />
            {currentReel.user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Like */}
          <button onClick={handleLike} className="flex flex-col items-center gap-1">
            {currentReel.isLiked ? (
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            <span className="text-white text-xs font-semibold">
              {currentReel.likes >= 1000
                ? `${(currentReel.likes / 1000).toFixed(1)}K`
                : currentReel.likes}
            </span>
          </button>

          {/* Comment */}
          <button className="flex flex-col items-center gap-1">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-white text-xs font-semibold">{currentReel.comments}</span>
          </button>

          {/* Share */}
          <button className="flex flex-col items-center gap-1">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="text-white text-xs font-semibold">{currentReel.shares}</span>
          </button>

          {/* Save */}
          <button onClick={handleSave} className="flex flex-col items-center gap-1">
            {currentReel.isSaved ? (
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            ) : (
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>

          {/* More */}
          <button className="flex flex-col items-center">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {/* Audio icon */}
          <button className="mt-2">
            <img
              src={currentReel.user.avatar}
              alt="Audio"
              className="w-8 h-8 rounded border border-white animate-spin-slow"
              style={{ animationDuration: '3s' }}
            />
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute left-4 right-20 bottom-20 z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white font-semibold text-sm">@{currentReel.user.username}</span>
            <button className="px-4 py-1 border border-white text-white text-xs font-semibold rounded-md hover:bg-white hover:text-black transition">
              Follow
            </button>
          </div>
          <p className="text-white text-sm mb-2 line-clamp-2">{currentReel.caption}</p>
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            <span className="text-white text-xs font-light">{currentReel.audioName}</span>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-20 right-4 z-10 bg-black/50 rounded-full p-2"
        >
          {isMuted ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        {/* Progress indicator */}
        <div className="absolute top-20 left-4 right-4 z-10">
          <div className="flex gap-1">
            {reels.map((_, index) => (
              <div
                key={index}
                className={`h-0.5 flex-1 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reels;

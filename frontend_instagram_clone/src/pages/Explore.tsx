import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import BottomNavigation from '../components/BottomNavigation';
import CreatePostModal from '../components/CreatePostModal';
import { getMockExplorePosts } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Explore/Search page component displaying grid of photos to discover
 * Features search bar and masonry-style photo grid similar to Instagram explore
 */
const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const explorePosts = getMockExplorePosts();
  
  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? explorePosts.filter(
        (post) =>
          post.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.caption.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : explorePosts;

  // PUBLIC_INTERFACE
  /**
   * Handle search query changes
   * @param query - Search query string
   */
  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation onSearch={handleSearch} onCreatePost={() => setIsCreateModalOpen(true)} />
      <CreatePostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      
      <div className="max-w-5xl mx-auto pt-6 px-4 pb-20 md:pb-8">
        {/* Mobile search bar */}
        <div className="md:hidden mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>

        {/* Search results info */}
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Photo grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {filteredPosts.map((post, index) => {
            // Create varied heights for masonry effect on larger screens
            const isLarge = index % 7 === 0;
            const isMedium = index % 5 === 0 && !isLarge;
            
            return (
              <div
                key={post.id}
                className={`relative bg-gray-200 cursor-pointer group overflow-hidden ${
                  isLarge
                    ? 'md:col-span-2 md:row-span-2'
                    : isMedium
                    ? 'md:row-span-2'
                    : ''
                } aspect-square`}
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Hover overlay with stats */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="font-bold">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      <span className="font-bold">{post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No results message */}
        {searchQuery && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-light mb-2">No results found</h3>
            <p className="text-gray-500 text-sm">
              Try searching for something else
            </p>
          </div>
        )}
      </div>
      
      <BottomNavigation onCreatePost={() => setIsCreateModalOpen(true)} />
    </div>
  );
};

export default Explore;

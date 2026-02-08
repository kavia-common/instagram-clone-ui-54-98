import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import BottomNavigation from '../components/BottomNavigation';
import CreatePostModal from '../components/CreatePostModal';
import { useAuth } from '../contexts/AuthContext';
import { getMockUserPosts } from '../utils/mockData';

// PUBLIC_INTERFACE
/**
 * Profile page component displaying user profile with stats and posts grid
 * Shows profile picture, bio, stats (posts/followers/following), and photo grid
 */
const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const userPosts = getMockUserPosts();
  
  // Mock profile stats
  const profileStats = {
    posts: userPosts.length,
    followers: 1234,
    following: 567,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation onCreatePost={() => setIsCreateModalOpen(true)} />
      <CreatePostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      
      <div className="max-w-4xl mx-auto pt-8 px-4 pb-20 md:pb-8">
        {/* Profile header */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Profile picture */}
            <div className="flex justify-center md:justify-start">
              <img
                src={user?.avatar || 'https://i.pravatar.cc/150?img=12'}
                alt={user?.username}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
            
            {/* Profile info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                <h2 className="text-2xl font-light">{user?.username || 'your_username'}</h2>
                <div className="flex gap-2">
                  <button className="px-6 py-1.5 bg-gray-200 hover:bg-gray-300 font-semibold text-sm rounded-lg transition">
                    Edit profile
                  </button>
                  <button className="px-6 py-1.5 bg-gray-200 hover:bg-gray-300 font-semibold text-sm rounded-lg transition">
                    View archive
                  </button>
                  <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex justify-around md:justify-start md:gap-10 mb-6">
                <div className="text-center md:text-left">
                  <span className="font-semibold">{profileStats.posts}</span>
                  <span className="text-gray-600 ml-1">posts</span>
                </div>
                <div className="text-center md:text-left cursor-pointer hover:text-gray-600">
                  <span className="font-semibold">{profileStats.followers}</span>
                  <span className="text-gray-600 ml-1">followers</span>
                </div>
                <div className="text-center md:text-left cursor-pointer hover:text-gray-600">
                  <span className="font-semibold">{profileStats.following}</span>
                  <span className="text-gray-600 ml-1">following</span>
                </div>
              </div>
              
              {/* Bio */}
              <div className="text-center md:text-left">
                <p className="font-semibold">{user?.fullName || 'Your Name'}</p>
                <p className="text-sm mt-1">
                  📸 Photography enthusiast<br />
                  🌍 Exploring the world<br />
                  ☕ Coffee lover
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stories highlights section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {['Travel', 'Food', 'Nature', 'Friends'].map((highlight, index) => (
              <div key={index} className="flex flex-col items-center flex-shrink-0 cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                  <div className="bg-white p-0.5 rounded-full w-full h-full">
                    <div className="bg-gray-200 rounded-full w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="text-xs mt-2">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-300">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-widest transition ${
                activeTab === 'posts'
                  ? 'text-gray-900 border-t-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Posts
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-widest transition ${
                activeTab === 'saved'
                  ? 'text-gray-900 border-t-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved
            </button>
            <button
              onClick={() => setActiveTab('tagged')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-widest transition ${
                activeTab === 'tagged'
                  ? 'text-gray-900 border-t-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Tagged
            </button>
          </div>
          
          {/* Posts grid */}
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="relative aspect-square bg-gray-100 cursor-pointer group overflow-hidden"
                >
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-6 text-white">
                      <div className="flex items-center gap-2">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        <span className="font-semibold">{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Saved posts tab content */}
          {activeTab === 'saved' && (
            <div className="py-16 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h3 className="text-2xl font-light mb-2">Save</h3>
              <p className="text-gray-500 text-sm">
                Save photos and videos that you want to see again.
              </p>
            </div>
          )}
          
          {/* Tagged posts tab content */}
          {activeTab === 'tagged' && (
            <div className="py-16 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="text-2xl font-light mb-2">Photos of you</h3>
              <p className="text-gray-500 text-sm">
                When people tag you in photos, they'll appear here.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation onCreatePost={() => setIsCreateModalOpen(true)} />
    </div>
  );
};

export default Profile;

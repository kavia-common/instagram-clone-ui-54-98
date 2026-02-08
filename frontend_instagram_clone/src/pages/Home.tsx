import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import Stories from '../components/Stories';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import BottomNavigation from '../components/BottomNavigation';
import CreatePostModal from '../components/CreatePostModal';
import { getMockStories, getMockPosts, getMockSuggestions, Post as PostType } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
/**
 * Home page component displaying the main Instagram feed
 * Contains stories, posts feed, and sidebar with suggestions
 */
const Home: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[]>(getMockPosts());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const stories = getMockStories();
  const suggestions = getMockSuggestions();

  // PUBLIC_INTERFACE
  /**
   * Handle post like toggle
   * @param postId - ID of the post to like/unlike
   */
  const handleLike = (postId: string): void => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  // PUBLIC_INTERFACE
  /**
   * Handle post save toggle
   * @param postId - ID of the post to save/unsave
   */
  const handleSave = (postId: string): void => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, isSaved: !post.isSaved }
          : post
      )
    );
  };

  // PUBLIC_INTERFACE
  /**
   * Handle adding a comment to a post
   * @param postId - ID of the post to comment on
   * @param text - Comment text
   */
  const handleComment = (postId: string, text: string): void => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [
                ...post.comments,
                {
                  id: `c${Date.now()}`,
                  user: {
                    id: 'current',
                    username: 'your_username',
                    fullName: 'Your Name',
                    avatar: 'https://i.pravatar.cc/150?img=12',
                  },
                  text,
                  timestamp: 'Just now',
                }
              ]
            }
          : post
      )
    );
  };

  // PUBLIC_INTERFACE
  /**
   * Handle creating a new post
   * @param imageUrl - URL of the uploaded image
   * @param caption - Post caption
   */
  const handleCreatePost = (imageUrl: string, caption: string): void => {
    const newPost: PostType = {
      id: `p${Date.now()}`,
      user: {
        id: user?.id || 'current',
        username: user?.username || 'your_username',
        fullName: user?.fullName || 'Your Name',
        avatar: user?.avatar || 'https://i.pravatar.cc/150?img=12',
      },
      imageUrl,
      caption,
      likes: 0,
      timestamp: 'Just now',
      isLiked: false,
      isSaved: false,
      comments: [],
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation onCreatePost={() => setIsCreateModalOpen(true)} />
      <CreatePostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
      
      <div className="max-w-5xl mx-auto flex gap-8 pt-8 px-4 pb-20 md:pb-8">
        {/* Main feed */}
        <div className="flex-1 max-w-[630px]">
          <Stories stories={stories} />
          
          <div className="space-y-0">
            {posts.map(post => (
              <Post 
                key={post.id}
                post={post}
                onLike={handleLike}
                onSave={handleSave}
                onComment={handleComment}
              />
            ))}
          </div>
        </div>
        
        {/* Sidebar - desktop only */}
        <Sidebar suggestions={suggestions} />
      </div>
      
      {/* Bottom navigation - mobile only */}
      <BottomNavigation onCreatePost={() => setIsCreateModalOpen(true)} />
    </div>
  );
};

export default Home;

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
 * Contains stories, posts feed with infinite scroll, and sidebar with suggestions
 */
const Home: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[]>(getMockPosts());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const stories = getMockStories();
  const suggestions = getMockSuggestions();
  const observerTarget = useRef<HTMLDivElement>(null);

  // PUBLIC_INTERFACE
  /**
   * Load more posts for infinite scroll
   * Generates additional mock posts based on the current page
   */
  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newPosts = getMockPosts().map((post, index) => ({
        ...post,
        id: `p${page}_${index}`,
        timestamp: `${page} day${page > 1 ? 's' : ''} ago`,
      }));

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);

      // Stop infinite scroll after 5 pages (20 posts total)
      if (page >= 5) {
        setHasMore(false);
      }
    }, 800);
  }, [isLoading, hasMore, page]);

  // PUBLIC_INTERFACE
  /**
   * Set up Intersection Observer for infinite scroll
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMorePosts, hasMore, isLoading]);

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

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* Intersection observer target */}
          <div ref={observerTarget} className="h-10" />

          {/* End of feed message */}
          {!hasMore && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">You're all caught up!</p>
              <p className="text-gray-400 text-xs mt-1">You've seen all posts from the past few days.</p>
            </div>
          )}
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

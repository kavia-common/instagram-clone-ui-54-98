import React, { useState } from 'react';
import { Post as PostType } from '../utils/mockData';

interface PostProps {
  post: PostType;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
}

// PUBLIC_INTERFACE
/**
 * Post component for displaying individual Instagram-style posts
 * Includes header, image, action buttons, likes, caption, and comments
 */
const Post: React.FC<PostProps> = ({ post, onLike, onSave, onComment }) => {
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  // PUBLIC_INTERFACE
  /**
   * Handle comment submission
   */
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg mb-6">
      {/* Post header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img 
            src={post.user.avatar} 
            alt={post.user.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">{post.user.username}</span>
            {post.user.isVerified && (
              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        
        <button className="text-gray-900 hover:text-gray-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
      </div>
      
      {/* Post image */}
      <div className="w-full aspect-square bg-gray-100">
        <img 
          src={post.imageUrl} 
          alt="Post content"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onLike(post.id)}
            className="hover:text-gray-600 transition"
          >
            {post.isLiked ? (
              <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
          
          <button className="hover:text-gray-600 transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          
          <button className="hover:text-gray-600 transition">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        <button 
          onClick={() => onSave(post.id)}
          className="hover:text-gray-600 transition"
        >
          {post.isSaved ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Likes count */}
      <div className="px-3 pb-2">
        <span className="font-semibold text-sm">
          {post.likes.toLocaleString()} likes
        </span>
      </div>
      
      {/* Caption */}
      <div className="px-3 pb-2">
        <span className="font-semibold text-sm mr-2">{post.user.username}</span>
        <span className="text-sm">{post.caption}</span>
      </div>
      
      {/* Comments */}
      {post.comments.length > 0 && (
        <div className="px-3 pb-2">
          {!showAllComments && post.comments.length > 2 && (
            <button 
              onClick={() => setShowAllComments(true)}
              className="text-sm text-gray-500 mb-2"
            >
              View all {post.comments.length} comments
            </button>
          )}
          
          {(showAllComments ? post.comments : post.comments.slice(0, 2)).map((comment) => (
            <div key={comment.id} className="mb-1">
              <span className="font-semibold text-sm mr-2">{comment.user.username}</span>
              <span className="text-sm">{comment.text}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Timestamp */}
      <div className="px-3 pb-2">
        <span className="text-xs text-gray-500 uppercase">{post.timestamp}</span>
      </div>
      
      {/* Add comment */}
      <div className="border-t border-gray-300 p-3">
        <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
          <button type="button" className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 text-sm focus:outline-none"
          />
          
          {commentText && (
            <button 
              type="submit"
              className="text-blue-500 font-semibold text-sm hover:text-blue-700"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Post;

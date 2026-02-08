import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost?: (imageUrl: string, caption: string) => void;
}

// PUBLIC_INTERFACE
/**
 * Create Post Modal component for creating new Instagram-style posts
 * Features image upload/preview, caption input, and post creation with mock state
 */
const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onCreatePost }) => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [step, setStep] = useState<'select' | 'edit'>('select');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PUBLIC_INTERFACE
  /**
   * Handle image file selection and preview
   * @param event - File input change event
   */
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStep('edit');
      };
      reader.readAsDataURL(file);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handle post creation
   */
  const handleCreatePost = () => {
    if (selectedImage && caption.trim()) {
      onCreatePost?.(selectedImage, caption);
      handleClose();
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Reset modal state and close
   */
  const handleClose = () => {
    setSelectedImage(null);
    setCaption('');
    setStep('select');
    onClose();
  };

  // PUBLIC_INTERFACE
  /**
   * Go back to image selection
   */
  const handleBack = () => {
    setStep('select');
    setSelectedImage(null);
    setCaption('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
          {step === 'edit' && (
            <button
              onClick={handleBack}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {step === 'select' && <div className="w-6" />}
          
          <h2 className="text-base font-semibold flex-1 text-center">
            {step === 'select' ? 'Create new post' : 'Create new post'}
          </h2>
          
          {step === 'edit' ? (
            <button
              onClick={handleCreatePost}
              disabled={!caption.trim()}
              className="text-blue-500 hover:text-blue-700 font-semibold disabled:text-blue-300 disabled:cursor-not-allowed"
            >
              Share
            </button>
          ) : (
            <button onClick={handleClose} className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === 'select' && !selectedImage && (
            <div className="flex flex-col items-center justify-center h-96 p-8">
              <svg
                className="w-24 h-24 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl mb-4">Drag photos and videos here</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Select from computer
              </button>
            </div>
          )}

          {step === 'edit' && selectedImage && (
            <div className="flex flex-col md:flex-row">
              {/* Image preview */}
              <div className="flex-1 bg-black flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-h-96 md:max-h-[500px] w-auto object-contain"
                />
              </div>

              {/* Caption and details */}
              <div className="md:w-80 border-l border-gray-300 flex flex-col">
                {/* User info */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-300">
                  <img
                    src={user?.avatar || 'https://i.pravatar.cc/150?img=12'}
                    alt={user?.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-sm">{user?.username || 'your_username'}</span>
                </div>

                {/* Caption input */}
                <div className="flex-1 p-4">
                  <textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full h-40 resize-none text-sm focus:outline-none"
                    maxLength={2200}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <span className="text-xs text-gray-400">{caption.length}/2,200</span>
                  </div>
                </div>

                {/* Additional options */}
                <div className="border-t border-gray-300">
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
                    <span className="text-sm">Add location</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition border-t border-gray-300">
                    <span className="text-sm">Accessibility</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition border-t border-gray-300">
                    <span className="text-sm">Advanced settings</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';
import BottomNavigation from '../components/BottomNavigation';
import CreatePostModal from '../components/CreatePostModal';
import { getMockConversations, Conversation, Message } from '../utils/mockMessages';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
/**
 * Messages page component displaying DM conversations and chat interface
 * Features conversation list, message thread, and message composition
 */
const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(getMockConversations());
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    conversations[0]?.id || null
  );
  const [messageInput, setMessageInput] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  // PUBLIC_INTERFACE
  /**
   * Handle sending a new message
   */
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversationId) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'current',
      text: messageInput,
      timestamp: 'Just now',
      isRead: true,
    };

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: messageInput,
              timestamp: 'Just now',
            }
          : conv
      )
    );

    setMessageInput('');
  };

  // PUBLIC_INTERFACE
  /**
   * Mark conversation as read when selected
   */
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId ? { ...conv, isUnread: false } : conv
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation onCreatePost={() => setIsCreateModalOpen(true)} />
      <CreatePostModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <div className="max-w-5xl mx-auto pt-4 pb-20 md:pb-4">
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden flex h-[calc(100vh-120px)] md:h-[600px]">
          {/* Conversations list */}
          <div className="w-full md:w-96 border-r border-gray-300 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/home')}
                  className="md:hidden hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-semibold">{user?.username || 'Messages'}</h2>
              </div>
              <button className="hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                  className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition ${
                    selectedConversationId === conversation.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.username}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {conversation.isUnread && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-sm ${
                          conversation.isUnread ? 'font-semibold' : 'font-normal'
                        } truncate`}
                      >
                        {conversation.user.username}
                      </span>
                      {conversation.user.isVerified && (
                        <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm text-gray-500 truncate ${
                          conversation.isUnread ? 'font-semibold text-gray-900' : ''
                        }`}
                      >
                        {conversation.lastMessage}
                      </p>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          {selectedConversation ? (
            <div className="hidden md:flex flex-1 flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation.user.avatar}
                    alt={selectedConversation.user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm">
                        {selectedConversation.user.username}
                      </span>
                      {selectedConversation.user.isVerified && (
                        <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{selectedConversation.user.fullName}</p>
                  </div>
                </div>
                <button className="hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === 'current' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-3xl ${
                        message.senderId === 'current'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm break-words">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-300">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-gray-400"
                  />
                  {messageInput && (
                    <button
                      type="submit"
                      className="text-blue-500 font-semibold text-sm hover:text-blue-700"
                    >
                      Send
                    </button>
                  )}
                  {!messageInput && (
                    <>
                      <button type="button" className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                      <button type="button" className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button type="button" className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-xl font-light mb-2">Your Messages</h3>
                <p className="text-gray-500 text-sm">
                  Send private messages to a friend or group
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation onCreatePost={() => setIsCreateModalOpen(true)} />
    </div>
  );
};

export default Messages;

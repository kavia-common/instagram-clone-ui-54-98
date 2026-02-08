/**
 * Mock data utilities for Messages/DM functionality
 * Provides sample conversations and messages for the Messages UI
 */

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  user: {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
    isVerified?: boolean;
  };
  lastMessage: string;
  timestamp: string;
  isUnread: boolean;
  messages: Message[];
}

// PUBLIC_INTERFACE
/**
 * Get mock conversations for the messages list
 * @returns Array of Conversation objects
 */
export const getMockConversations = (): Conversation[] => {
  return [
    {
      id: 'conv1',
      user: {
        id: '1',
        username: 'sarah_johnson',
        fullName: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        isVerified: true,
      },
      lastMessage: 'That sounds great! Let\'s do it 🎉',
      timestamp: '2m',
      isUnread: true,
      messages: [
        {
          id: 'm1',
          senderId: '1',
          text: 'Hey! How are you doing?',
          timestamp: '10:30 AM',
          isRead: true,
        },
        {
          id: 'm2',
          senderId: 'current',
          text: 'Hi Sarah! I\'m doing great, thanks! How about you?',
          timestamp: '10:32 AM',
          isRead: true,
        },
        {
          id: 'm3',
          senderId: '1',
          text: 'I\'m good! Want to grab coffee this weekend?',
          timestamp: '10:35 AM',
          isRead: true,
        },
        {
          id: 'm4',
          senderId: 'current',
          text: 'That sounds great! Let\'s do it 🎉',
          timestamp: '10:37 AM',
          isRead: true,
        },
      ],
    },
    {
      id: 'conv2',
      user: {
        id: '2',
        username: 'mike_wilson',
        fullName: 'Mike Wilson',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      lastMessage: 'Did you see the game last night?',
      timestamp: '1h',
      isUnread: false,
      messages: [
        {
          id: 'm5',
          senderId: '2',
          text: 'Did you see the game last night?',
          timestamp: 'Yesterday 9:15 PM',
          isRead: true,
        },
        {
          id: 'm6',
          senderId: 'current',
          text: 'No, I missed it! Who won?',
          timestamp: 'Yesterday 9:20 PM',
          isRead: true,
        },
      ],
    },
    {
      id: 'conv3',
      user: {
        id: '3',
        username: 'emma_davis',
        fullName: 'Emma Davis',
        avatar: 'https://i.pravatar.cc/150?img=3',
        isVerified: true,
      },
      lastMessage: 'Thanks for the recommendation!',
      timestamp: '3h',
      isUnread: true,
      messages: [
        {
          id: 'm7',
          senderId: 'current',
          text: 'You should check out that new restaurant downtown',
          timestamp: 'Yesterday 6:45 PM',
          isRead: true,
        },
        {
          id: 'm8',
          senderId: '3',
          text: 'Thanks for the recommendation!',
          timestamp: 'Yesterday 7:10 PM',
          isRead: true,
        },
      ],
    },
    {
      id: 'conv4',
      user: {
        id: '4',
        username: 'alex_brown',
        fullName: 'Alex Brown',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      lastMessage: 'See you tomorrow!',
      timestamp: '1d',
      isUnread: false,
      messages: [
        {
          id: 'm9',
          senderId: '4',
          text: 'See you tomorrow!',
          timestamp: '2 days ago',
          isRead: true,
        },
      ],
    },
    {
      id: 'conv5',
      user: {
        id: '5',
        username: 'lisa_garcia',
        fullName: 'Lisa Garcia',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      lastMessage: 'Love your latest post! 😍',
      timestamp: '2d',
      isUnread: false,
      messages: [
        {
          id: 'm10',
          senderId: '5',
          text: 'Love your latest post! 😍',
          timestamp: '3 days ago',
          isRead: true,
        },
        {
          id: 'm11',
          senderId: 'current',
          text: 'Thank you so much! 🙏',
          timestamp: '3 days ago',
          isRead: true,
        },
      ],
    },
  ];
};

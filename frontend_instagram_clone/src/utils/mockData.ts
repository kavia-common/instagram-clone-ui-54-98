/**
 * Mock data utilities for Instagram clone
 * Provides sample posts, stories, users, and suggestions for the UI
 */

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  isVerified?: boolean;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  isViewed: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Suggestion {
  user: User;
  relationText: string;
}

// Mock users
const mockUsers: User[] = [
  {
    id: '1',
    username: 'sarah_johnson',
    fullName: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isVerified: true,
  },
  {
    id: '2',
    username: 'mike_wilson',
    fullName: 'Mike Wilson',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    username: 'emma_davis',
    fullName: 'Emma Davis',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isVerified: true,
  },
  {
    id: '4',
    username: 'alex_brown',
    fullName: 'Alex Brown',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    username: 'lisa_garcia',
    fullName: 'Lisa Garcia',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

// PUBLIC_INTERFACE
/**
 * Get mock stories for the stories section
 * @returns Array of Story objects
 */
export const getMockStories = (): Story[] => {
  return [
    {
      id: 's1',
      user: mockUsers[0],
      imageUrl: 'https://picsum.photos/seed/story1/150/150',
      isViewed: false,
    },
    {
      id: 's2',
      user: mockUsers[1],
      imageUrl: 'https://picsum.photos/seed/story2/150/150',
      isViewed: false,
    },
    {
      id: 's3',
      user: mockUsers[2],
      imageUrl: 'https://picsum.photos/seed/story3/150/150',
      isViewed: true,
    },
    {
      id: 's4',
      user: mockUsers[3],
      imageUrl: 'https://picsum.photos/seed/story4/150/150',
      isViewed: false,
    },
    {
      id: 's5',
      user: mockUsers[4],
      imageUrl: 'https://picsum.photos/seed/story5/150/150',
      isViewed: false,
    },
  ];
};

// PUBLIC_INTERFACE
/**
 * Get mock posts for the main feed
 * @returns Array of Post objects
 */
export const getMockPosts = (): Post[] => {
  return [
    {
      id: 'p1',
      user: mockUsers[0],
      imageUrl: 'https://picsum.photos/seed/post1/600/600',
      caption: 'Beautiful sunset at the beach 🌅 #nature #photography',
      likes: 1243,
      timestamp: '2 hours ago',
      isLiked: false,
      isSaved: false,
      comments: [
        {
          id: 'c1',
          user: mockUsers[1],
          text: 'Absolutely stunning! 😍',
          timestamp: '1 hour ago',
        },
        {
          id: 'c2',
          user: mockUsers[2],
          text: 'Where is this?',
          timestamp: '45 minutes ago',
        },
      ],
    },
    {
      id: 'p2',
      user: mockUsers[1],
      imageUrl: 'https://picsum.photos/seed/post2/600/600',
      caption: 'Morning coffee ☕️ Perfect start to the day!',
      likes: 856,
      timestamp: '5 hours ago',
      isLiked: true,
      isSaved: false,
      comments: [
        {
          id: 'c3',
          user: mockUsers[3],
          text: 'Coffee lover here! ❤️',
          timestamp: '4 hours ago',
        },
      ],
    },
    {
      id: 'p3',
      user: mockUsers[2],
      imageUrl: 'https://picsum.photos/seed/post3/600/600',
      caption: 'Adventures await 🏔️ #travel #explore',
      likes: 2134,
      timestamp: '1 day ago',
      isLiked: false,
      isSaved: true,
      comments: [
        {
          id: 'c4',
          user: mockUsers[0],
          text: 'Take me with you!',
          timestamp: '20 hours ago',
        },
        {
          id: 'c5',
          user: mockUsers[4],
          text: 'Amazing view! 🤩',
          timestamp: '18 hours ago',
        },
      ],
    },
    {
      id: 'p4',
      user: mockUsers[3],
      imageUrl: 'https://picsum.photos/seed/post4/600/600',
      caption: 'Fitness goals 💪 Never give up!',
      likes: 987,
      timestamp: '2 days ago',
      isLiked: true,
      isSaved: false,
      comments: [],
    },
  ];
};

// PUBLIC_INTERFACE
/**
 * Get mock suggestions for the sidebar
 * @returns Array of Suggestion objects
 */
export const getMockSuggestions = (): Suggestion[] => {
  return [
    {
      user: {
        id: '6',
        username: 'john_smith',
        fullName: 'John Smith',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
      relationText: 'Followed by sarah_johnson + 2 more',
    },
    {
      user: {
        id: '7',
        username: 'kate_williams',
        fullName: 'Kate Williams',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      relationText: 'Followed by mike_wilson + 3 more',
    },
    {
      user: {
        id: '8',
        username: 'david_lee',
        fullName: 'David Lee',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      relationText: 'Followed by emma_davis',
    },
    {
      user: {
        id: '9',
        username: 'rachel_moore',
        fullName: 'Rachel Moore',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      relationText: 'New to Instagram',
    },
    {
      user: {
        id: '10',
        username: 'chris_taylor',
        fullName: 'Chris Taylor',
        avatar: 'https://i.pravatar.cc/150?img=10',
      },
      relationText: 'Followed by alex_brown + 1 more',
    },
  ];
};

// PUBLIC_INTERFACE
/**
 * Get current logged in user (mock)
 * @returns User object
 */
export const getCurrentUser = (): User => {
  return {
    id: 'current',
    username: 'your_username',
    fullName: 'Your Name',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };
};

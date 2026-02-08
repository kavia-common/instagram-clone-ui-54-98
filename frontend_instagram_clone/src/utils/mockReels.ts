/**
 * Mock data utilities for Reels functionality
 * Provides sample reels with video URLs, user info, and engagement metrics
 */

import { User } from './mockData';

export interface Reel {
  id: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  views: string;
  isLiked: boolean;
  isSaved: boolean;
  audioName: string;
}

// Mock users for reels
const reelsUsers: User[] = [
  {
    id: '1',
    username: 'travel_adventures',
    fullName: 'Travel Adventures',
    avatar: 'https://i.pravatar.cc/150?img=20',
    isVerified: true,
  },
  {
    id: '2',
    username: 'cooking_guru',
    fullName: 'Chef Master',
    avatar: 'https://i.pravatar.cc/150?img=21',
  },
  {
    id: '3',
    username: 'fitness_pro',
    fullName: 'Fitness Pro',
    avatar: 'https://i.pravatar.cc/150?img=22',
    isVerified: true,
  },
  {
    id: '4',
    username: 'art_studio',
    fullName: 'Art Studio',
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
  {
    id: '5',
    username: 'nature_explorer',
    fullName: 'Nature Explorer',
    avatar: 'https://i.pravatar.cc/150?img=24',
    isVerified: true,
  },
  {
    id: '6',
    username: 'music_vibes',
    fullName: 'Music Vibes',
    avatar: 'https://i.pravatar.cc/150?img=25',
  },
  {
    id: '7',
    username: 'dance_moves',
    fullName: 'Dance Moves',
    avatar: 'https://i.pravatar.cc/150?img=26',
  },
  {
    id: '8',
    username: 'comedy_clips',
    fullName: 'Comedy Central',
    avatar: 'https://i.pravatar.cc/150?img=27',
    isVerified: true,
  },
];

// PUBLIC_INTERFACE
/**
 * Get mock reels data for the reels feed
 * @returns Array of Reel objects
 */
export const getMockReels = (): Reel[] => {
  return [
    {
      id: 'r1',
      user: reelsUsers[0],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnailUrl: 'https://picsum.photos/seed/reel1/1080/1920',
      caption: 'Exploring the beautiful mountains 🏔️ #travel #nature #adventure',
      likes: 15234,
      comments: 432,
      shares: 123,
      views: '1.2M',
      isLiked: false,
      isSaved: false,
      audioName: 'Original Audio - travel_adventures',
    },
    {
      id: 'r2',
      user: reelsUsers[1],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnailUrl: 'https://picsum.photos/seed/reel2/1080/1920',
      caption: 'Quick pasta recipe you need to try! 🍝 #cooking #food #recipe',
      likes: 23456,
      comments: 567,
      shares: 234,
      views: '2.5M',
      isLiked: true,
      isSaved: false,
      audioName: 'Cooking Beats - DJ Chef',
    },
    {
      id: 'r3',
      user: reelsUsers[2],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://picsum.photos/seed/reel3/1080/1920',
      caption: '30-second workout routine 💪 #fitness #workout #health',
      likes: 34567,
      comments: 789,
      shares: 456,
      views: '3.8M',
      isLiked: false,
      isSaved: true,
      audioName: 'Workout Mix 2024',
    },
    {
      id: 'r4',
      user: reelsUsers[3],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnailUrl: 'https://picsum.photos/seed/reel4/1080/1920',
      caption: 'Time-lapse painting 🎨 #art #painting #creative',
      likes: 18765,
      comments: 321,
      shares: 189,
      views: '987K',
      isLiked: false,
      isSaved: false,
      audioName: 'Chill Vibes - Lofi Beats',
    },
    {
      id: 'r5',
      user: reelsUsers[4],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnailUrl: 'https://picsum.photos/seed/reel5/1080/1920',
      caption: 'Wildlife in 4K 🦁 #nature #wildlife #animals',
      likes: 45678,
      comments: 891,
      shares: 678,
      views: '5.2M',
      isLiked: true,
      isSaved: true,
      audioName: 'Nature Sounds - Ambient',
    },
    {
      id: 'r6',
      user: reelsUsers[5],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnailUrl: 'https://picsum.photos/seed/reel6/1080/1920',
      caption: 'Guitar solo 🎸 #music #guitar #cover',
      likes: 27890,
      comments: 543,
      shares: 321,
      views: '1.8M',
      isLiked: false,
      isSaved: false,
      audioName: 'Original Audio - music_vibes',
    },
    {
      id: 'r7',
      user: reelsUsers[6],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      thumbnailUrl: 'https://picsum.photos/seed/reel7/1080/1920',
      caption: 'Dance challenge! 💃 #dance #trending #viral',
      likes: 56789,
      comments: 1234,
      shares: 890,
      views: '6.7M',
      isLiked: true,
      isSaved: false,
      audioName: 'Trending Sound 2024',
    },
    {
      id: 'r8',
      user: reelsUsers[7],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      thumbnailUrl: 'https://picsum.photos/seed/reel8/1080/1920',
      caption: 'When you realize... 😂 #comedy #funny #relatable',
      likes: 67890,
      comments: 1567,
      shares: 1234,
      views: '8.9M',
      isLiked: false,
      isSaved: false,
      audioName: 'Comedy Sound - Funny Moments',
    },
  ];
};

// Base Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User extends BaseEntity {
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string | null;
  coverImage?: string | null;
  location?: string;
  website?: string;
  birthDate?: string;
  isVerified: boolean;
  isPrivate: boolean;
  followersCount: number;
  followingCount: number;
  tweetsCount: number;
  likesCount: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    mentions: boolean;
    likes: boolean;
    retweets: boolean;
    follows: boolean;
    directMessages: boolean;
  };
  privacy: {
    isPrivate: boolean;
    allowDirectMessages: boolean;
    allowTagging: boolean;
    allowLocationTracking: boolean;
  };
}

// Tweet Types
export interface Tweet extends BaseEntity {
  content: string;
  author: User;
  images?: string[];
  video?: string;
  gif?: string;
  poll?: Poll;
  location?: Location;
  replyTo?: string; // Tweet ID
  quoteTweet?: Tweet;
  mentions: string[]; // User IDs
  hashtags: string[];
  urls: string[];
  
  // Engagement
  likesCount: number;
  retweetsCount: number;
  repliesCount: number;
  quotesCount: number;
  viewsCount: number;
  bookmarksCount: number;
  
  // User interactions
  isLiked: boolean;
  isRetweeted: boolean;
  isBookmarked: boolean;
  isFollowingAuthor: boolean;
  
  // Metadata
  editHistory?: TweetEdit[];
  isEdited: boolean;
  visibility: 'public' | 'followers' | 'mentioned';
  replySettings: 'everyone' | 'following' | 'mentioned' | 'none';
}

export interface TweetEdit {
  content: string;
  editedAt: string;
  reason?: string;
}

export interface TweetDraft {
  id: string;
  content: string;
  images?: string[];
  video?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Poll Types
export interface Poll extends BaseEntity {
  question: string;
  options: PollOption[];
  duration: number; // in hours
  allowMultipleChoices: boolean;
  votesCount: number;
  endsAt: string;
  hasVoted: boolean;
  selectedOptions?: string[]; // Option IDs
}

export interface PollOption {
  id: string;
  text: string;
  votesCount: number;
  percentage: number;
}

// Notification Types
export interface Notification extends BaseEntity {
  type: 'like' | 'retweet' | 'reply' | 'mention' | 'follow' | 'quote' | 'poll_ended' | 'tweet_edit';
  title: string;
  message: string;
  isRead: boolean;
  actor: User; // Who performed the action
  target?: Tweet | User; // What was acted upon
  metadata?: Record<string, any>;
}

// Message Types
export interface Conversation extends BaseEntity {
  participants: User[];
  lastMessage?: Message;
  isGroup: boolean;
  name?: string; // For group conversations
  avatar?: string; // For group conversations
  unreadCount: number;
  isMuted: boolean;
}

export interface Message extends BaseEntity {
  conversation: string; // Conversation ID
  sender: User;
  content: string;
  type: 'text' | 'image' | 'video' | 'gif' | 'file' | 'tweet_share';
  attachments?: MessageAttachment[];
  replyTo?: string; // Message ID
  isRead: boolean;
  readBy: { userId: string; readAt: string }[];
  reactions: MessageReaction[];
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  fileName?: string;
  fileSize?: number;
  thumbnail?: string;
}

export interface MessageReaction {
  emoji: string;
  users: string[]; // User IDs
  count: number;
}

// Search Types
export interface SearchResult {
  users: User[];
  tweets: Tweet[];
  trends: Trend[];
  locations: Location[];
}

export interface Trend {
  id: string;
  name: string;
  query: string;
  tweetsCount: number;
  category: 'trending' | 'politics' | 'sports' | 'entertainment' | 'technology' | 'business';
  location?: string;
  promoted: boolean;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  timezone?: string;
  woeid?: number; // Where On Earth ID
}

// Navigation Types
export interface RootStackParamList {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: { userId?: string };
  TweetDetail: { tweetId: string };
  CreateTweet: { replyTo?: string; quoteTweet?: string };
  EditProfile: undefined;
  Settings: undefined;
  Search: { query?: string };
  Notifications: undefined;
  Messages: undefined;
  Conversation: { conversationId: string };
  UserProfile: { userId: string };
  Following: { userId: string };
  Followers: { userId: string };
  Bookmarks: undefined;
  Lists: undefined;
  Spaces: undefined;
  Communities: undefined;
  Events: undefined;
  Wallet: undefined;
}

export interface BottomTabParamList {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
}

export interface DrawerParamList {
  Profile: undefined;
  Bookmarks: undefined;
  Lists: undefined;
  Spaces: undefined;
  Monetization: undefined;
  Settings: undefined;
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthDate: string;
  agreeToTerms: boolean;
}

export interface TweetForm {
  content: string;
  images: string[];
  video?: string;
  gif?: string;
  poll?: {
    question: string;
    options: string[];
    duration: number;
    allowMultipleChoices: boolean;
  };
  location?: Location;
  replySettings: 'everyone' | 'following' | 'mentioned' | 'none';
  scheduledAt?: string;
}

// Utility Types
export type ThemeMode = 'light' | 'dark' | 'auto';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'ar' | 'hi' | 'zh';
export type TweetType = 'tweet' | 'reply' | 'quote' | 'retweet';
export type NotificationType = 'like' | 'retweet' | 'reply' | 'mention' | 'follow' | 'quote';
export type MediaType = 'image' | 'video' | 'gif';
export type FileType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' | 'mp4' | 'mov' | 'avi';

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  userMessage?: string;
}

// Component Props Types
export interface BaseComponentProps {
  testID?: string;
  accessibilityLabel?: string;
  style?: any;
}

export interface TweetComponentProps extends BaseComponentProps {
  tweet: Tweet;
  onPress?: (tweet: Tweet) => void;
  onLike?: (tweet: Tweet) => void;
  onRetweet?: (tweet: Tweet) => void;
  onReply?: (tweet: Tweet) => void;
  onShare?: (tweet: Tweet) => void;
  onBookmark?: (tweet: Tweet) => void;
  showActions?: boolean;
  showReplyLine?: boolean;
}

export interface UserComponentProps extends BaseComponentProps {
  user: User;
  onPress?: (user: User) => void;
  onFollow?: (user: User) => void;
  showFollowButton?: boolean;
  showBio?: boolean;
}
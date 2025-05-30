// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api/v1',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token',
      PROFILE: '/auth/profile',
      CHANGE_PASSWORD: '/auth/change-password',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
    },
    TWEETS: {
      GET_TWEETS: '/tweets',
      CREATE_TWEET: '/tweets',
      DELETE_TWEET: '/tweets',
      LIKE_TWEET: '/tweets/like',
      RETWEET: '/tweets/retweet',
      REPLY: '/tweets/reply',
    },
    USER: {
      PROFILE: '/user/profile',
      FOLLOW: '/user/follow',
      UNFOLLOW: '/user/unfollow',
      FOLLOWERS: '/user/followers',
      FOLLOWING: '/user/following',
    },
    SEARCH: {
      USERS: '/search/users',
      TWEETS: '/search/tweets',
      TRENDS: '/search/trends',
    },
  },
  TIMEOUT: 10000,
  REQUEST_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'Twitter Clone',
  VERSION: '1.0.0',
  DESCRIPTION: 'A Twitter clone built with React Native',
  COMPANY: 'Twitter Clone, Inc.',
  COPYRIGHT: '© 2025',
  PRIVACY_POLICY_URL: 'https://example.com/privacy',
  TERMS_OF_SERVICE_URL: 'https://example.com/terms',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  LAST_SYNC: 'lastSync',
};

// UI Constants
export const UI_CONSTANTS = {
  COLORS: {
    PRIMARY: '#1DA1F2',
    SECONDARY: '#657786',
    SUCCESS: '#17BF63',
    ERROR: '#E0245E',
    WARNING: '#FFAD1F',
    BACKGROUND: '#FFFFFF',
    CARD_BACKGROUND: '#F7F9FA',
    BORDER: '#E1E8ED',
    TEXT_PRIMARY: '#14171A',
    TEXT_SECONDARY: '#657786',
    TEXT_MUTED: '#AAB8C2',
    PLACEHOLDER: '#CCD6DD',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    TRANSPARENT: 'transparent',
  },
  FONT_SIZES: {
    EXTRA_SMALL: 10,
    SMALL: 12,
    MEDIUM: 14,
    REGULAR: 16,
    LARGE: 18,
    EXTRA_LARGE: 20,
    TITLE: 24,
    HEADER: 28,
    HERO: 32,
  },
  SPACING: {
    EXTRA_SMALL: 4,
    SMALL: 8,
    MEDIUM: 12,
    REGULAR: 16,
    LARGE: 20,
    EXTRA_LARGE: 24,
    HUGE: 32,
    MASSIVE: 40,
  },
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
    EXTRA_LARGE: 16,
    ROUND: 50,
  },
  ICON_SIZES: {
    SMALL: 16,
    MEDIUM: 20,
    LARGE: 24,
    EXTRA_LARGE: 28,
    HUGE: 32,
  },
};

// Animation Constants
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
};

// Tweet Constants
export const TWEET_CONFIG = {
  MAX_LENGTH: 280,
  MAX_IMAGES: 4,
  MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50MB
  SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  SUPPORTED_VIDEO_FORMATS: ['mp4', 'mov', 'avi'],
};

// Validation Constants
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 50,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 15,
    REGEX: /^[a-zA-Z0-9_]+$/,
  },
  NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  
  // Auth specific
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_ALREADY_EXISTS: 'Email already exists.',
  USERNAME_ALREADY_EXISTS: 'Username already exists.',
  WEAK_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number and special character.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_USERNAME: 'Username must be 3-15 characters and contain only letters, numbers, and underscores.',
  
  // Tweet specific
  TWEET_TOO_LONG: 'Tweet cannot exceed 280 characters.',
  TWEET_EMPTY: 'Tweet cannot be empty.',
  IMAGE_UPLOAD_FAILED: 'Failed to upload image.',
  VIDEO_TOO_LARGE: 'Video file is too large. Maximum size is 50MB.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  EMAIL_VERIFIED: 'Email verified successfully!',
  TWEET_POSTED: 'Tweet posted successfully!',
  TWEET_DELETED: 'Tweet deleted successfully!',
  FOLLOW_SUCCESS: 'User followed successfully!',
  UNFOLLOW_SUCCESS: 'User unfollowed successfully!',
};

// Platform specific constants
export const PLATFORM_CONFIG = {
  IOS: {
    STATUS_BAR_HEIGHT: 44,
    TAB_BAR_HEIGHT: 83,
    SAFE_AREA_PADDING: 20,
  },
  ANDROID: {
    STATUS_BAR_HEIGHT: 24,
    TAB_BAR_HEIGHT: 56,
    SAFE_AREA_PADDING: 16,
  },
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: false,
  ENABLE_CRASH_REPORTING: true,
  ENABLE_VIDEO_UPLOAD: true,
  ENABLE_LIVE_STREAMING: false,
  ENABLE_SPACES: false,
  ENABLE_FLEET: false,
};

// Default Values
export const DEFAULT_VALUES = {
  AVATAR_PLACEHOLDER: 'https://via.placeholder.com/150x150?text=Avatar',
  COVER_PLACEHOLDER: 'https://via.placeholder.com/600x200?text=Cover',
  PAGINATION_LIMIT: 20,
  REFRESH_INTERVAL: 30000, // 30 seconds
  MAX_RETRY_ATTEMPTS: 3,
  DEBOUNCE_DELAY: 500,
};
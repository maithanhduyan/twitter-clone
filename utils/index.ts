// This folder contains utility functions and helpers used throughout the application.
// Export all constants
export * from './constants';

// Export all types
export * from './types';

// Export all helpers
export * from './helpers';

// Re-export commonly used items with aliases for convenience
export {
  API_CONFIG as ApiConfig,
  APP_CONFIG as AppConfig,
  UI_CONSTANTS as Colors,
  STORAGE_KEYS as StorageKeys,
  ERROR_MESSAGES as ErrorMessages,
  SUCCESS_MESSAGES as SuccessMessages,
} from './constants';

export type {
  User,
  Tweet,
  Notification,
  ApiResponse,
  RootStackParamList,
  LoginForm,
  RegisterForm,
  TweetForm,
} from './types';

export {
  formatTimeAgo,
  formatNumber,
  validateEmail,
  validatePassword,
  saveToStorage,
  getFromStorage,
  showAlert,
  showErrorAlert,
  debounce,
  generateId,
} from './helpers';

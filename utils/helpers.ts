// utils/helpers.ts
import { Platform, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VALIDATION, ERROR_MESSAGES, UI_CONSTANTS } from './constants';

// Date & Time Helpers
export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return 'now';
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  if (diffWeeks < 4) return `${diffWeeks}w`;
  if (diffMonths < 12) return `${diffMonths}mo`;
  return `${diffYears}y`;
};

export const formatDate = (date: string | Date, format: 'short' | 'long' | 'time' = 'short'): string => {
  const dateObj = new Date(date);
  
  switch (format) {
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    case 'time':
      return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
  }
};

export const isToday = (date: string | Date): boolean => {
  const today = new Date();
  const compareDate = new Date(date);
  return today.toDateString() === compareDate.toDateString();
};

export const isYesterday = (date: string | Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const compareDate = new Date(date);
  return yesterday.toDateString() === compareDate.toDateString();
};

// Number Formatting Helpers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// String Helpers
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const extractHashtags = (text: string): string[] => {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  return text.match(hashtagRegex) || [];
};

export const extractMentions = (text: string): string[] => {
  const mentionRegex = /@[a-zA-Z0-9_]+/g;
  return text.match(mentionRegex) || [];
};

export const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

// Validation Helpers
export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL.REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION.PASSWORD.MIN_LENGTH && 
         VALIDATION.PASSWORD.REGEX.test(password);
};

export const validateUsername = (username: string): boolean => {
  return username.length >= VALIDATION.USERNAME.MIN_LENGTH &&
         username.length <= VALIDATION.USERNAME.MAX_LENGTH &&
         VALIDATION.USERNAME.REGEX.test(username);
};

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 8) return 'weak';
  
  let score = 0;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score < 3) return 'weak';
  if (score < 4) return 'medium';
  return 'strong';
};

// Storage Helpers
export const saveToStorage = async (key: string, value: any): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
};

export const getFromStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting from storage:', error);
    return null;
  }
};

export const removeFromStorage = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from storage:', error);
    return false;
  }
};

export const clearStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

// Device & Platform Helpers
export const isIOS = (): boolean => Platform.OS === 'ios';
export const isAndroid = (): boolean => Platform.OS === 'android';

export const getDeviceDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

export const isTablet = (): boolean => {
  const { width, height } = getDeviceDimensions();
  const aspectRatio = height / width;
  return Math.min(width, height) >= 600 && aspectRatio <= 1.6;
};

export const getStatusBarHeight = (): number => {
  if (isIOS()) {
    const { height } = getDeviceDimensions();
    return height >= 812 ? 44 : 20; // iPhone X and newer vs older iPhones
  }
  return 24; // Android default
};

// Alert Helpers
export const showAlert = (
  title: string,
  message: string,
  buttons?: Array<{ text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }>
): void => {
  Alert.alert(title, message, buttons);
};

export const showConfirmAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): void => {
  Alert.alert(
    title,
    message,
    [
      { text: 'Cancel', onPress: onCancel, style: 'cancel' },
      { text: 'OK', onPress: onConfirm },
    ]
  );
};

export const showErrorAlert = (message: string = ERROR_MESSAGES.UNKNOWN_ERROR): void => {
  Alert.alert('Error', message);
};

// Image & Media Helpers
export const getImageAspectRatio = async (uri: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image.width / image.height);
    };
    image.onerror = reject;
    image.src = uri;
  });
};

export const resizeImage = (
  uri: string,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    
    image.onload = () => {
      const { width, height } = image;
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve(url);
        } else {
          reject(new Error('Failed to resize image'));
        }
      }, 'image/jpeg', quality);
    };
    
    image.onerror = reject;
    image.src = uri;
  });
};

// Debounce Helper
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle Helper
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCallTime = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCallTime >= delay) {
      lastCallTime = now;
      func(...args);
    }
  };
};

// Random Helpers
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getRandomColor = (): string => {
  const colors = Object.values(UI_CONSTANTS.COLORS);
  return colors[Math.floor(Math.random() * colors.length)];
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Deep clone helper
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Object helpers
export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  return Object.keys(obj).length === 0;
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};

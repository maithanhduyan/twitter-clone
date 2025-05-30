// This folder contains service modules for handling API calls, data fetching, and other external interactions.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL cho API
const BASE_URL = 'http://localhost:3000/api/v1/auth';

// Interface definitions
interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
    refreshToken?: string;
  };
  error?: string;
}

interface RefreshTokenResponse {
  success: boolean;
  data?: {
    token: string;
  };
  error?: string;
}

class AuthServices {
  // Helper method để lấy token từ AsyncStorage
  private async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Helper method để lưu token
  private async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  // Helper method để xóa token
  private async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // Helper method để tạo headers
  private async createHeaders(includeAuth: boolean = false): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (includeAuth) {
      const token = await this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Đăng nhập
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: await this.createHeaders(),
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.success && data.data) {
        // Lưu token và user data
        await this.saveToken(data.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.data.user));
        
        if (data.data.refreshToken) {
          await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
        }
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Đăng ký
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: await this.createHeaders(),
        body: JSON.stringify(userData),
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.success && data.data) {
        // Lưu token và user data
        await this.saveToken(data.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.data.user));
        
        if (data.data.refreshToken) {
          await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
        }
      }

      return data;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Đăng xuất
  async logout(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: await this.createHeaders(true),
      });

      const data: AuthResponse = await response.json();

      // Xóa token dù API có thành công hay không
      await this.removeToken();

      return data;
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn xóa token local nếu có lỗi network
      await this.removeToken();
      
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Làm mới token
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        return {
          success: false,
          error: 'No refresh token available',
        };
      }

      const response = await fetch(`${BASE_URL}/refresh-token`, {
        method: 'POST',
        headers: await this.createHeaders(),
        body: JSON.stringify({ refreshToken }),
      });

      const data: RefreshTokenResponse = await response.json();

      if (response.ok && data.success && data.data) {
        await this.saveToken(data.data.token);
      }

      return data;
    } catch (error) {
      console.error('Refresh token error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Lấy thông tin profile
  async getProfile(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        headers: await this.createHeaders(true),
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.success && data.data) {
        // Cập nhật user data trong AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Cập nhật profile
  async updateProfile(userData: Partial<User>): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/profile`, {
        method: 'PUT',
        headers: await this.createHeaders(true),
        body: JSON.stringify(userData),
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.success && data.data) {
        // Cập nhật user data trong AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Đổi mật khẩu
  async changePassword(oldPassword: string, newPassword: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/change-password`, {
        method: 'POST',
        headers: await this.createHeaders(true),
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Quên mật khẩu
  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: await this.createHeaders(),
        body: JSON.stringify({ email }),
      });

      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Reset mật khẩu
  async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: 'POST',
        headers: await this.createHeaders(),
        body: JSON.stringify({ token, newPassword }),
      });

      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Verify email
  async verifyEmail(token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${BASE_URL}/verify-email`, {
        method: 'POST',
        headers: await this.createHeaders(),
        body: JSON.stringify({ token }),
      });

      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Verify email error:', error);
      return {
        success: false,
        message: 'Network error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Kiểm tra trạng thái authentication
  async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user: User | null }> {
    try {
      const token = await this.getToken();
      const userData = await AsyncStorage.getItem('userData');

      if (token && userData) {
        return {
          isAuthenticated: true,
          user: JSON.parse(userData),
        };
      }

      return {
        isAuthenticated: false,
        user: null,
      };
    } catch (error) {
      console.error('Check auth status error:', error);
      return {
        isAuthenticated: false,
        user: null,
      };
    }
  }
}

// Export singleton instance
export default new AuthServices();
export { AuthServices };
export type { User, LoginRequest, RegisterRequest, AuthResponse, RefreshTokenResponse };
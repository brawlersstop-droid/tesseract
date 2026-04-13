import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userStr = localStorage.getItem('user');
        
        // First, try to use stored user data (works without backend)
        if (userStr) {
          try {
            const storedUser = JSON.parse(userStr);
            setUser(storedUser);
            setIsAuthenticated(true);
          } catch (parseError) {
            console.error('Failed to parse stored user:', parseError);
          }
        }
        
        // Then try to verify with API if token exists
        if (token) {
          try {
            const response = await apiService.getCurrentUser();
            if (response?.success) {
              setUser(response.data);
              setIsAuthenticated(true);
              // Update stored user data with fresh data
              localStorage.setItem('user', JSON.stringify(response.data));
            }
          } catch (apiError) {
            // API failed (no backend), but we already set user from localStorage above
            console.error('API call failed, using stored user data:', apiError);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, otp, name) => {
    try {
      const response = await apiService.verifyOtp(email, otp, name);
      if (response?.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        // Store user data in localStorage for persistence when API fails
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return { success: true, data: response.data };
      }
      return { success: false, error: response?.error || 'Login failed' };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Network error' };
    }
  }, []);

  const requestOtp = useCallback(async (email) => {
    try {
      const response = await apiService.requestOtp(email);
      return response;
    } catch (error) {
      console.error('OTP request failed:', error);
      return { success: false, error: 'Network error' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      // Clear stored user data
      localStorage.removeItem('user');
    }
  }, []);

  const joinMembership = useCallback(async (metadata = {}) => {
    try {
      const response = await apiService.joinTesseract(metadata);
      if (response?.success) {
        setUser(prev => ({
          ...prev,
          role: response.data.user.role,
          membership: response.data.membership
        }));
      }
      return response;
    } catch (error) {
      console.error('Membership join failed:', error);
      return { success: false, error: 'Network error' };
    }
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    requestOtp,
    joinMembership,
    updateUser,
    // Role helpers
    isGuest: user?.role === 'GUEST',
    isMember: user?.role === 'MEMBER',
    isCore: user?.role === 'CORE',
    isAdmin: user?.role === 'ADMIN',
    canManageEvents: user?.role === 'CORE' || user?.role === 'ADMIN',
    canUseAdminPanel: user?.role === 'ADMIN',
    hasMembership: !!user?.membership,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

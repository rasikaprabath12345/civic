/**
 * Authentication Context
 * =====================
 * Global state management for user authentication
 * Stores user data and JWT token
 * Provides login/logout/register functions
 */

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// Create Auth Context
export const AuthContext = createContext();

/**
 * Normalize user object to ensure id field exists
 * Ensures compatibility with both backend formats
 */
const normalizeUser = (userData) => {
  if (!userData) return null;
  return {
    ...userData,
    id: userData.id || userData._id, // Ensure id field exists
  };
};

/**
 * Auth Provider Component
 * Wraps entire app to provide auth state globally
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * On component mount, check if user is already logged in
   * Restore user data and token from localStorage
   */
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(normalizeUser(JSON.parse(savedUser)));
    }

    setLoading(false);
  }, []);

  /**
   * Register Function
   * Creates new user account
   * Stores token and user data in localStorage
   */
  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', userData);

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        const normalizedUser = normalizeUser(newUser);

        // Store in state
        setToken(newToken);
        setUser(normalizedUser);

        // Store in localStorage for persistence
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(normalizedUser));

        return response.data;
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Login Function
   * Authenticates user and returns JWT token
   * Stores token and user data in localStorage
   */
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        const normalizedUser = normalizeUser(newUser);

        // Store in state
        setToken(newToken);
        setUser(normalizedUser);

        // Store in localStorage for persistence
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(normalizedUser));

        return response.data;
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Logout Function
   * Clears user data and token
   * Removes from localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  /**
   * Context Value
   * Provides state and functions to child components
   */
  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom Hook: useAuth
 * Use this hook in components to access auth context
 * Example: const { user, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

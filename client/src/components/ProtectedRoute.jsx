/**
 * Protected Route Component
 * =========================
 * Restricts access to authenticated users only
 * Redirects to login if not authenticated
 * Can also check user role (citizen or admin)
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * @param {JSX.Element} element - Component to render if authorized
 * @param {String} requiredRole - Optional: 'citizen' or 'admin' role requirement
 * @returns {JSX.Element} - Either the protected component or redirect to login
 */
const ProtectedRoute = ({ element, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and user doesn't have it, redirect to home
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated (and has correct role), render component
  return element;
};

export default ProtectedRoute;

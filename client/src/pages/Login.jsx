/**
 * Login Page
 * ==========
 * User login form with email and password
 * Validates input and connects to backend
 * Redirects to dashboard on success
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user starts typing
  };

  /**
   * Handle form submission
   * Validates input and calls login function
   * Redirects to dashboard on success
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate input
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Call login function
      const response = await login(formData.email, formData.password);

      if (response.success) {
        // Redirect based on user role
        if (response.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/citizen-dashboard');
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">CivicLink LK</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

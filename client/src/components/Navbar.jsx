/**
 * Navbar Component
 * ================
 * Top navigation bar with links and user menu
 * Shows different options for authenticated/unauthenticated users
 * Responsive design with mobile menu
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Handle logout
   * Clears auth state and redirects to home
   */
  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-accent transition"
        >
          CivicLink LK
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-accent transition">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === 'citizen' && (
                <>
                  <Link
                    to="/citizen-dashboard"
                    className="hover:text-accent transition"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/admin-dashboard"
                    className="hover:text-accent transition"
                  >
                    Admin Panel
                  </Link>
                </>
              )}

              {/* User Menu */}
              <div className="flex items-center gap-4">
                <span className="text-sm">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-accent px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-accent px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block hover:text-accent transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === 'citizen' && (
                <>
                  <Link
                    to="/citizen-dashboard"
                    className="block hover:text-accent transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/admin-dashboard"
                    className="block hover:text-accent transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left hover:text-accent transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block hover:text-accent transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block hover:text-accent transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/**
 * App Component
 * =============
 * Main App component with routing setup
 * Wraps entire app with AuthProvider
 * Defines all routes (public and protected)
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

/**
 * Placeholder Components
 * These will be built in later steps
 */
const CitizenDashboard = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-primary mb-6">Citizen Dashboard</h1>
    <p className="text-gray-600">Coming soon...</p>
  </div>
);

const AdminDashboard = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-primary mb-6">Admin Dashboard</h1>
    <p className="text-gray-600">Coming soon...</p>
  </div>
);

/**
 * Main App Component
 * Sets up routing and context providers
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Citizen Routes */}
              <Route
                path="/citizen-dashboard"
                element={
                  <ProtectedRoute
                    element={<CitizenDashboard />}
                    requiredRole="citizen"
                  />
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute
                    element={<AdminDashboard />}
                    requiredRole="admin"
                  />
                }
              />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

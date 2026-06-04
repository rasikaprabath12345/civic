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
import ForgotPassword from './pages/ForgotPassword';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentBooking from './pages/AppointmentBooking';
import ComplaintsPage from './pages/ComplaintsPage';
import CertificateRequest from './pages/CertificateRequest';
import RequestTracking from './pages/RequestTracking';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';

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
              <Route path="/forgot-password" element={<ForgotPassword />} />

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

              <Route
                path="/appointments"
                element={
                  <ProtectedRoute
                    element={<AppointmentBooking />}
                    requiredRole="citizen"
                  />
                }
              />

              <Route
                path="/complaints"
                element={
                  <ProtectedRoute
                    element={<ComplaintsPage />}
                    requiredRole="citizen"
                  />
                }
              />

              <Route
                path="/certificates"
                element={
                  <ProtectedRoute
                    element={<CertificateRequest />}
                    requiredRole="citizen"
                  />
                }
              />

              <Route
                path="/requests"
                element={
                  <ProtectedRoute
                    element={<RequestTracking />}
                    requiredRole="citizen"
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={<ProfilePage />}
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

              {/* Catch all - redirect to 404 */}
              <Route path="*" element={<NotFound />} />
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

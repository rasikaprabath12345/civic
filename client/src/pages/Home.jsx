/**
 * Home Page
 * ========
 * Landing page with hero section and service overview
 * Shows different content for authenticated/unauthenticated users
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            CivicLink LK
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Sri Lankan Government Services at Your Fingertips
          </p>
          {!isAuthenticated && (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/login"
                className="bg-accent hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg font-semibold transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Appointments */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-primary mb-2">Appointments</h3>
              <p className="text-gray-600">
                Book Grama Sevaka appointments online at your convenience.
              </p>
            </div>

            {/* Certificates */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-bold text-primary mb-2">Certificates</h3>
              <p className="text-gray-600">
                Request birth, death, and marriage certificates online.
              </p>
            </div>

            {/* Complaints */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-xl font-bold text-primary mb-2">Complaints</h3>
              <p className="text-gray-600">
                Submit and track complaints about government services.
              </p>
            </div>

            {/* AI Chatbot */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-primary mb-2">AI Chatbot</h3>
              <p className="text-gray-600">
                Get instant help in Sinhala and English (Coming Soon).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section (Only for authenticated users) */}
      {isAuthenticated && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">
              Welcome, {user?.name}!
            </h2>
            <div className="bg-blue-50 border-l-4 border-primary p-8 rounded-lg">
              <p className="text-lg text-gray-700 mb-6">
                You are logged in as a <span className="font-bold capitalize">{user?.role}</span>.
              </p>
              <Link
                to={
                  user?.role === 'admin'
                    ? '/admin-dashboard'
                    : '/citizen-dashboard'
                }
                className="inline-block bg-primary hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Go to {user?.role === 'admin' ? 'Admin' : 'Citizen'} Dashboard
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Why Choose CivicLink LK?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Fast</h3>
              <p className="text-gray-600">
                Complete your transactions in minutes, not hours.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Secure</h3>
              <p className="text-gray-600">
                Your data is protected with modern security standards.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Mobile</h3>
              <p className="text-gray-600">
                Access services anytime, anywhere on any device.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

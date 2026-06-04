/**
 * Services Overview Page
 * =======================
 * Showcase all available government services
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ServiceCard from '../components/ServiceCard';

const ServicesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const services = [
    {
      id: 'appointments',
      icon: '📅',
      title: 'Book Appointments',
      description: 'Schedule appointments with Grama Sevaka offices and government officials',
      href: isAuthenticated ? '/appointments' : '/login',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'certificates',
      icon: '📜',
      title: 'Request Certificates',
      description: 'Get birth, death, and marriage certificates online',
      href: isAuthenticated ? '/certificates' : '/login',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'complaints',
      icon: '⚠️',
      title: 'Lodge Complaints',
      description: 'Report issues and complaints about government services',
      href: isAuthenticated ? '/complaints' : '/login',
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'tracking',
      icon: '📍',
      title: 'Track Requests',
      description: 'Monitor the status of your applications in real-time',
      href: isAuthenticated ? '/requests' : '/login',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const features = [
    { icon: '⚡', title: 'Fast Processing', description: '24/7 online service access' },
    { icon: '🔒', title: 'Secure', description: 'Your data is protected and private' },
    { icon: '📱', title: 'Mobile Friendly', description: 'Access on any device anytime' },
    { icon: '🆘', title: 'Support', description: 'Dedicated customer assistance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Government Services</h1>
          <p className="text-xl text-blue-100">Access all government services in one place</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                color={service.color}
              />
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose CivicLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {!isAuthenticated && (
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6">Create an account to access all government services</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition"
            >
              Sign Up Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;

/**
 * Appointment Booking Page
 * =======================
 * Book appointments with government officials
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    service: '',
    date: '',
    location: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const services = [
    { id: 1, name: 'Grama Sevaka' },
    { id: 2, name: 'Birth Registration' },
    { id: 3, name: 'Death Registration' },
    { id: 4, name: 'Marriage Registration' },
    { id: 5, name: 'Land Registry' },
  ];

  const locations = [
    'Colombo District Office',
    'Kandy District Office',
    'Galle District Office',
    'Jaffna District Office',
    'Anuradhapura District Office',
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.service || !formData.date || !formData.location) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Convert date to proper format
      const appointmentData = {
        service: formData.service,
        date: new Date(formData.date).toISOString(),
        location: formData.location,
        notes: formData.notes,
      };

      const response = await api.post('/appointments/create', appointmentData);

      if (response.data.success) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/citizen-dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
          <p className="text-gray-600 mb-4">Your appointment has been successfully scheduled. Check your email for confirmation details.</p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📅 Book an Appointment</h1>
          <p className="text-gray-600">Schedule your appointment with government officials</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Service <span className="text-red-600">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              >
                <option value="">Choose a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Location <span className="text-red-600">*</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              >
                <option value="">Choose a location...</option>
                {locations.map((location, idx) => (
                  <option key={idx} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Preferred Date <span className="text-red-600">*</span>
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Select a date and time from today onwards</p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Any special requirements or additional information..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">📋 Important Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• You will receive a confirmation email with your appointment details</li>
              <li>• Please arrive 10 minutes before your scheduled time</li>
              <li>• Bring all required documents mentioned in your confirmation</li>
              <li>• To cancel or reschedule, contact us at least 24 hours in advance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;

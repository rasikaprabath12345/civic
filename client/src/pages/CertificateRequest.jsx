/**
 * Certificate Request Page
 * =======================
 * Request birth, death, and marriage certificates
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CertificateRequest = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    certificateType: '',
    fullName: user?.name || '',
    dateOfBirth: '',
    purpose: '',
    quantity: 1,
    deliveryMethod: 'email',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.certificateType || !formData.dateOfBirth || !formData.purpose) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const requestData = {
        type: 'certificate',
        details: {
          certificateType: formData.certificateType,
          fullName: formData.fullName,
          dateOfBirth: formData.dateOfBirth,
          purpose: formData.purpose,
          quantity: formData.quantity,
          deliveryMethod: formData.deliveryMethod,
        },
      };

      const response = await api.post('/requests/create', requestData);

      if (response.data.success) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/citizen-dashboard');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit certificate request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">📜</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-4">Your certificate request has been submitted. You'll receive updates via email.</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Certificate</h1>
          <p className="text-gray-600">Get your birth, death, or marriage certificate</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Certificate Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Certificate Type *
              </label>
              <select
                name="certificateType"
                value={formData.certificateType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              >
                <option value="">Select certificate type...</option>
                <option value="Birth">Birth Certificate</option>
                <option value="Death">Death Certificate</option>
                <option value="Marriage">Marriage Certificate</option>
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Date of Birth / Event *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Purpose of Certificate *
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              >
                <option value="">Select a purpose...</option>
                <option value="School Admission">School Admission</option>
                <option value="Job Application">Job Application</option>
                <option value="Passport">Passport</option>
                <option value="Legal Matter">Legal Matter</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Number of Copies
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Delivery Method
              </label>
              <div className="flex gap-4">
                {['email', 'pickup', 'postal'].map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={method}
                      checked={formData.deliveryMethod === method}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="capitalize text-gray-700">
                      {method === 'email' ? 'Email' : method === 'pickup' ? 'Pickup' : 'Postal'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">📋 Processing Information</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Processing time: 3-5 business days</li>
              <li>• Cost: Rs. 50-100 per certificate</li>
              <li>• You'll receive email confirmation and updates</li>
              <li>• Delivery method depends on your selection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateRequest;

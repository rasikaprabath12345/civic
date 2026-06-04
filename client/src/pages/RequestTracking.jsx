/**
 * Request Tracking Page
 * =======================
 * Track the status of all citizen requests and applications
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const RequestTracking = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchRequests();
  }, [isAuthenticated, navigate]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/requests/my-requests');
      setRequests(response.data.data || []);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'processing':
        return '⏳';
      case 'pending':
        return '📋';
      default:
        return '❓';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'pending':
        return 33;
      case 'processing':
        return 66;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

  const filteredRequests = filterType === 'all'
    ? requests
    : requests.filter(req => req.type === filterType);

  const RequestTimeline = ({ request }) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{request.type}</h3>
          <p className="text-gray-600">Request ID: {request._id?.substring(0, 12)}...</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(request.status)}`}>
          {getStatusIcon(request.status)} {request.status.toUpperCase()}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
          <span>Progress</span>
          <span>{getProgressPercentage(request.status)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage(request.status)}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
            <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Request Submitted</h4>
            <p className="text-sm text-gray-600">{new Date(request.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              request.status !== 'pending' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {request.status !== 'pending' ? '✓' : '○'}
            </div>
            <div className={`w-0.5 h-12 my-1 ${request.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Under Review</h4>
            <p className="text-sm text-gray-600">{request.status !== 'pending' ? 'In progress...' : 'Waiting to start'}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              request.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {request.status === 'completed' ? '✓' : '○'}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Completed</h4>
            <p className="text-sm text-gray-600">{request.status === 'completed' ? 'Request fulfilled' : 'Waiting...'}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-semibold text-gray-900">{request.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Submitted</p>
            <p className="font-semibold text-gray-900">{new Date(request.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Tracking</h1>
          <p className="text-gray-600">Monitor the status of your applications and requests</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['all', 'Certificate', 'Appointment', 'Complaint'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {type === 'all' ? 'All Requests' : type}
            </button>
          ))}
        </div>

        {/* Requests List */}
        {filteredRequests.length > 0 ? (
          <div className="space-y-6">
            {filteredRequests.map((request) => (
              <RequestTimeline key={request._id} request={request} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Requests Found</h2>
            <p className="text-gray-600 mb-6">You haven't submitted any requests yet.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/appointments')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Book Appointment
              </button>
              <button
                onClick={() => navigate('/certificates')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Request Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestTracking;

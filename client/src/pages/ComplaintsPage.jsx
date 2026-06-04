/**
 * Complaints Page
 * =======================
 * Submit and track complaints against government services
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const ComplaintsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [view, setView] = useState('list'); // 'list' or 'new'
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    service: '',
    priority: 'medium',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchComplaints();
  }, [isAuthenticated, navigate]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await api.get('/complaints/my-complaints');
      setComplaints(response.data.data || []);
    } catch (err) {
      setError('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.subject || !formData.description || !formData.service) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const complaintData = {
        ...formData,
        userId: user._id,
        status: 'open',
      };

      const response = await api.post('/complaints/submit', complaintData);

      if (response.data.success) {
        setSubmitted(true);
        setFormData({ subject: '', description: '', service: '', priority: 'medium' });
        setTimeout(() => {
          setSubmitted(false);
          setView('list');
          fetchComplaints();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    }
  };

  const ComplaintCard = ({ complaint }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-gray-900">{complaint.subject}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
          complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {complaint.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{complaint.service}</span>
        <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );

  if (loading && view === 'list') return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complaints & Feedback</h1>
          <p className="text-gray-600">Submit and track your complaints against government services</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView('list')}
            className={`px-6 py-2 rounded-lg font-semibold ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            View Complaints
          </button>
          <button
            onClick={() => setView('new')}
            className={`px-6 py-2 rounded-lg font-semibold ${
              view === 'new'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Submit New
          </button>
        </div>

        {/* List View */}
        {view === 'list' && (
          <div>
            {complaints.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {complaints.map((complaint) => (
                  <ComplaintCard key={complaint._id} complaint={complaint} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">No complaints submitted yet</p>
                <button
                  onClick={() => setView('new')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Submit Your First Complaint
                </button>
              </div>
            )}
          </div>
        )}

        {/* New Complaint Form */}
        {view === 'new' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h2>
                <p className="text-gray-600">Your complaint has been recorded. We'll review it shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service or Department *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  >
                    <option value="">Select a service...</option>
                    <option value="Grama Sevaka">Grama Sevaka Office</option>
                    <option value="Certification">Certificate Department</option>
                    <option value="Land Registry">Land Registry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief subject of your complaint"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Provide detailed information about your complaint..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <div className="flex gap-4">
                    {['low', 'medium', 'high'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={level}
                          checked={formData.priority === level}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="capitalize text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                >
                  Submit Complaint
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintsPage;

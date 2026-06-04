/**
 * Citizen Dashboard
 * =======================
 * Main hub for citizens to manage appointments, requests, complaints, and profile
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [appointmentsRes, requestsRes, complaintsRes] = await Promise.all([
        api.get('/appointments/my-appointments'),
        api.get('/requests/my-requests'),
        api.get('/complaints/my-complaints'),
      ]);

      setAppointments(appointmentsRes.data.data || []);
      setRequests(requestsRes.data.data || []);
      setComplaints(complaintsRes.data.data || []);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, label, value, color }) => (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-lg`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm opacity-90">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );

  const AppointmentItem = ({ apt }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
      <div>
        <h4 className="font-semibold text-gray-900">{apt.service}</h4>
        <p className="text-sm text-gray-600">{new Date(apt.date).toLocaleDateString()}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {apt.status}
      </span>
    </div>
  );

  const RequestItem = ({ req }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
      <div>
        <h4 className="font-semibold text-gray-900">{req.type}</h4>
        <p className="text-sm text-gray-600">Submitted: {new Date(req.createdAt).toLocaleDateString()}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        req.status === 'completed' ? 'bg-green-100 text-green-800' :
        req.status === 'processing' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {req.status}
      </span>
    </div>
  );

  const ComplaintItem = ({ complaint }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
      <div>
        <h4 className="font-semibold text-gray-900">{complaint.subject}</h4>
        <p className="text-sm text-gray-600">{complaint.description.substring(0, 50)}...</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
        complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {complaint.status}
      </span>
    </div>
  );

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-blue-100">Manage your appointments and requests</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📅" label="Appointments" value={appointments.length} color="from-blue-500 to-blue-600" />
          <StatCard icon="📜" label="Requests" value={requests.length} color="from-purple-500 to-purple-600" />
          <StatCard icon="⚠️" label="Complaints" value={complaints.length} color="from-orange-500 to-orange-600" />
          <StatCard icon="✅" label="Completed" value={requests.filter(r => r.status === 'completed').length} color="from-green-500 to-green-600" />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 flex">
            {['overview', 'appointments', 'requests', 'complaints'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-center font-semibold capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Recent Appointments</h3>
                  {appointments.length > 0 ? (
                    <div className="space-y-3">
                      {appointments.slice(0, 3).map((apt) => (
                        <AppointmentItem key={apt._id} apt={apt} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No appointments yet</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Recent Requests</h3>
                  {requests.length > 0 ? (
                    <div className="space-y-3">
                      {requests.slice(0, 3).map((req) => (
                        <RequestItem key={req._id} req={req} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No requests yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-3">
                {appointments.length > 0 ? (
                  appointments.map((apt) => <AppointmentItem key={apt._id} apt={apt} />)
                ) : (
                  <p className="text-gray-600">No appointments found</p>
                )}
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="space-y-3">
                {requests.length > 0 ? (
                  requests.map((req) => <RequestItem key={req._id} req={req} />)
                ) : (
                  <p className="text-gray-600">No requests found</p>
                )}
              </div>
            )}

            {activeTab === 'complaints' && (
              <div className="space-y-3">
                {complaints.length > 0 ? (
                  complaints.map((complaint) => (
                    <ComplaintItem key={complaint._id} complaint={complaint} />
                  ))
                ) : (
                  <p className="text-gray-600">No complaints found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;

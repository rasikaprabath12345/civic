/**
 * Admin Dashboard
 * =======================
 * Central control hub for administrators to manage requests, analytics, and users
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [allRequests, setAllRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, complaints: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [requestsRes, usersRes, statsRes] = await Promise.all([
        api.get('/admin/requests'),
        api.get('/admin/users'),
        api.get('/admin/stats'),
      ]);

      setAllRequests(requestsRes.data.data || []);
      setUsers(usersRes.data.data || []);
      setStats(statsRes.data.data || { total: 0, pending: 0, completed: 0, complaints: 0 });
    } catch (err) {
      setError('Failed to load admin data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await api.patch(`/admin/requests/${requestId}`, { status: newStatus });
      fetchAdminData();
    } catch (err) {
      setError('Failed to update request status');
    }
  };

  const StatCard = ({ icon, label, value, color }) => (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-lg`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm opacity-90">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );

  const RequestRow = ({ req }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{req.userId?.name}</td>
      <td className="px-6 py-4">{req.type}</td>
      <td className="px-6 py-4 text-sm">{new Date(req.createdAt).toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <select
          value={req.status}
          onChange={(e) => handleStatusUpdate(req._id, e.target.value)}
          className={`px-3 py-1 rounded text-sm font-semibold border ${
            req.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
            req.status === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-300' :
            'bg-yellow-100 text-yellow-800 border-yellow-300'
          }`}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
      </td>
    </tr>
  );

  const UserRow = ({ u }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{u.name}</td>
      <td className="px-6 py-4">{u.email}</td>
      <td className="px-6 py-4">{u.NIC}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {u.role}
        </span>
      </td>
      <td className="px-6 py-4 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
    </tr>
  );

  const filteredRequests = filterStatus === 'all'
    ? allRequests
    : allRequests.filter(req => req.status === filterStatus);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-purple-100">System Overview & Management</p>
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
          <StatCard icon="📋" label="Total Requests" value={stats.total} color="from-blue-500 to-blue-600" />
          <StatCard icon="⏳" label="Pending" value={stats.pending} color="from-yellow-500 to-yellow-600" />
          <StatCard icon="✅" label="Completed" value={stats.completed} color="from-green-500 to-green-600" />
          <StatCard icon="⚠️" label="Complaints" value={stats.complaints} color="from-red-500 to-red-600" />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 flex">
            {['overview', 'requests', 'users'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-center font-semibold capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-purple-600 text-purple-600'
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
                  <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">Total Users: <span className="font-bold">{users.length}</span></p>
                    <p className="text-gray-700">Pending Requests: <span className="font-bold">{stats.pending}</span></p>
                    <p className="text-gray-700">Completion Rate: <span className="font-bold">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                  <p className="text-gray-600">Last sync: {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            )}

            {activeTab === 'requests' && (
              <div>
                <div className="mb-4 flex gap-2">
                  {['all', 'pending', 'processing', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded capitalize ${
                        filterStatus === status
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.length > 0 ? (
                        filteredRequests.map((req) => <RequestRow key={req._id} req={req} />)
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-600">
                            No requests found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">NIC</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((u) => <UserRow key={u._id} u={u} />)
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-600">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

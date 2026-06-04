/**
 * Admin Dashboard — Premium Edition with Full Mobile Responsiveness
 */

import React, { useState, useEffect } from 'react';

const mobileStyles = `
  @media (max-width: 900px) {
    .admin-header { padding: 0 20px !important; }
    .admin-body { padding: 20px !important; }
    .stat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
    .admin-sidebar { display: none !important; }
  }
  
  @media (max-width: 768px) {
    .admin-header { height: 56px !important; }
    .admin-header-title { display: none !important; }
    .admin-header-right { gap: 12px !important; }
    .admin-body { padding: 16px !important; }
    .stat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
    .stat-card { padding: 16px !important; }
    .stat-card-label { font-size: 10px !important; }
    .stat-card-value { font-size: 24px !important; }
    .page-title { font-size: 20px !important; }
    .page-date { font-size: 11px !important; }
    .tab-bar { gap: 0 !important; }
    .tab-button { padding: 12px 12px !important; font-size: 11px !important; }
    .tab-icon { display: none !important; }
    .tab-panel { padding: 16px !important; }
    .avatar { width: 28px !important; height: 28px !important; font-size: 10px !important; }
    .filter-buttons { gap: 6px !important; flex-wrap: wrap !important; }
    .filter-btn { padding: 5px 12px !important; font-size: 11px !important; }
    .completion-ring-container { grid-template-columns: 1fr !important; gap: 16px !important; }
    .overview-grid { grid-template-columns: 1fr !important; }
    table { font-size: 11px !important; }
    table tr { display: block !important; border: 1px solid #f1f5f9 !important; border-radius: 8px !important; margin-bottom: 8px !important; }
    table thead { display: none !important; }
    table td { display: block !important; text-align: right !important; padding: 8px 12px !important; border: none !important; border-radius: 0 !important; }
    table td:before { content: attr(data-label); float: left; font-weight: 600; color: #94a3b8; }
    .user-row { display: flex !important; align-items: center !important; justify-content: space-between !important; }
  }
  
  @media (max-width: 480px) {
    .admin-header { padding: 0 12px !important; }
    .admin-body { padding: 12px !important; }
    .admin-title-text { font-size: 13px !important; }
    .stat-grid { grid-template-columns: 1fr !important; gap: 10px !important; margin-bottom: 20px !important; }
    .stat-card { padding: 14px !important; }
    .stat-card-icon { width: 32px !important; height: 32px !important; font-size: 16px !important; }
    .stat-card-label { font-size: 9px !important; }
    .stat-card-value { font-size: 20px !important; }
    .page-title { font-size: 18px !important; }
    .avatar { width: 24px !important; height: 24px !important; font-size: 9px !important; }
    .tab-panel { padding: 12px !important; }
    .table-scroll { overflow-x: auto !important; }
    table td { padding: 6px 8px !important; font-size: 10px !important; }
    .filter-buttons { margin-bottom: 16px !important; }
    .filter-btn { padding: 4px 10px !important; font-size: 10px !important; }
    .recent-request-item { padding: 8px 10px !important; gap: 8px !important; }
    .completion-legend-item { font-size: 10px !important; gap: 6px !important; }
  }
  
  @media (max-width: 360px) {
    .admin-header { padding: 0 8px !important; }
    .admin-body { padding: 8px !important; }
    .stat-card { padding: 12px !important; }
    .admin-title-text { font-size: 11px !important; }
    .stat-card-icon { width: 28px !important; height: 28px !important; }
    .stat-card-label { font-size: 8px !important; }
    .stat-card-value { font-size: 18px !important; }
    .page-title { font-size: 16px !important; }
    .avatar { width: 20px !important; height: 20px !important; font-size: 8px !important; }
  }
`;

const mockRequests = [
  { _id: '1', userId: { name: 'Amal Perera' }, type: 'Birth Certificate', createdAt: '2024-05-01', status: 'completed' },
  { _id: '2', userId: { name: 'Nisha Fernando' }, type: 'Passport Renewal', createdAt: '2024-05-03', status: 'processing' },
  { _id: '3', userId: { name: 'Kasun Jayawardena' }, type: 'NIC Application', createdAt: '2024-05-06', status: 'pending' },
  { _id: '4', userId: { name: 'Dilani Silva' }, type: 'Marriage Certificate', createdAt: '2024-05-08', status: 'pending' },
  { _id: '5', userId: { name: 'Ruwan Bandara' }, type: 'Land Deed', createdAt: '2024-05-10', status: 'completed' },
  { _id: '6', userId: { name: 'Malini Wijesekera' }, type: 'Death Certificate', createdAt: '2024-05-11', status: 'processing' },
];

const mockUsers = [
  { _id: 'u1', name: 'Amal Perera', email: 'amal@example.com', NIC: '901234567V', role: 'user', createdAt: '2024-01-10' },
  { _id: 'u2', name: 'Nisha Fernando', email: 'nisha@example.com', NIC: '875643210V', role: 'user', createdAt: '2024-02-15' },
  { _id: 'u3', name: 'Admin User', email: 'admin@example.com', NIC: '782345678V', role: 'admin', createdAt: '2023-11-01' },
  { _id: 'u4', name: 'Kasun Jayawardena', email: 'kasun@example.com', NIC: '935671234V', role: 'user', createdAt: '2024-03-20' },
  { _id: 'u5', name: 'Dilani Silva', email: 'dilani@example.com', NIC: '961238765V', role: 'user', createdAt: '2024-04-05' },
];

const mockStats = { total: 128, pending: 34, completed: 87, complaints: 7 };

const statusConfig = {
  completed: { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  processing: { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  pending: { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
};

const roleConfig = {
  admin: { bg: '#ede9fe', text: '#5b21b6' },
  user: { bg: '#e0f2fe', text: '#0369a1' },
};

const avatarColors = [
  ['#e0f2fe', '#0369a1'], ['#d1fae5', '#065f46'], ['#ede9fe', '#5b21b6'],
  ['#fef3c7', '#92400e'], ['#fce7f3', '#9d174d'],
];

function Avatar({ name, index = 0 }) {
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??';
  const [bg, text] = avatarColors[index % avatarColors.length];
  return (
    <div className="avatar" style={{
      width: 32, height: 32, borderRadius: '50%',
      background: bg, color: text,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 600, flexShrink: 0, letterSpacing: '0.05em',
    }}>{initials}</div>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="stat-card" style={{
      background: '#fff',
      border: '1px solid #f1f5f9',
      borderRadius: 16,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.09)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'}
    >
      <div className="stat-card-icon" style={{
        width: 40, height: 40, borderRadius: 10,
        background: accent + '18',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
      }}>{icon}</div>
      <div>
        <div className="stat-card-label" style={{ fontSize: 11, fontWeight: 500, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
        <div className="stat-card-value" style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', fontFamily: "'DM Mono', monospace" }}>{value}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: cfg.bg, color: cfg.text,
      fontSize: 11, fontWeight: 600, padding: '3px 10px',
      borderRadius: 20, letterSpacing: '0.04em', textTransform: 'capitalize',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: '◈' },
  { id: 'requests', label: 'Requests', icon: '≡' },
  { id: 'users', label: 'Users', icon: '⊙' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState(mockRequests);
  const [users] = useState(mockUsers);
  const [stats] = useState(mockStats);
  const [filterStatus, setFilterStatus] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setRequests(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
  };

  const filtered = filterStatus === 'all' ? requests : requests.filter(r => r.status === filterStatus);
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const fadeIn = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{mobileStyles}</style>

      {/* Sidebar strip */}
      <div className="admin-sidebar" style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 4,
        background: 'linear-gradient(to bottom, #6366f1, #8b5cf6, #a855f7)',
        zIndex: 100,
      }} />

      {/* Header */}
      <div className="admin-header" style={{
        background: '#fff',
        borderBottom: '1px solid #f1f5f9',
        padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64, marginLeft: 4,
        ...fadeIn(0),
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 14, fontWeight: 700,
          }}>A</div>
          <span className="admin-title-text" style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', letterSpacing: '-0.01em' }}>AdminOS</span>
          <div className="admin-header-title" style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 8px' }} />
          <span className="admin-header-title" style={{ fontSize: 13, color: '#94a3b8', fontWeight: 400 }}>Control Panel</span>
        </div>
        <div className="admin-header-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, color: '#10b981',
            background: '#d1fae5', padding: '3px 10px', borderRadius: 20,
            letterSpacing: '0.05em',
          }}>● LIVE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name="Admin User" index={2} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Admin User</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>Super Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="admin-body" style={{ marginLeft: 4, padding: '36px 40px', maxWidth: '100%' }}>

        {/* Page Title */}
        <div style={{ marginBottom: 32, ...fadeIn(0.05) }}>
          <h1 className="page-title" style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Dashboard
          </h1>
          <p className="page-date" style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32, ...fadeIn(0.1) }}>
          <StatCard icon="📋" label="Total Requests" value={stats.total} accent="#6366f1" />
          <StatCard icon="⏳" label="Pending" value={stats.pending} accent="#f59e0b" />
          <StatCard icon="✅" label="Completed" value={stats.completed} accent="#10b981" />
          <StatCard icon="⚠️" label="Complaints" value={stats.complaints} accent="#ef4444" />
        </div>

        {/* Main Panel */}
        <div style={{
          background: '#fff', border: '1px solid #f1f5f9',
          borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          overflow: 'hidden', ...fadeIn(0.15),
        }}>

          {/* Tab Bar */}
          <div className="tab-bar" style={{
            display: 'flex', borderBottom: '1px solid #f1f5f9',
            padding: '0 24px', background: '#fafafa',
          }}>
            {TABS.map(tab => (
              <button key={tab.id} className="tab-button" onClick={() => setActiveTab(tab.id)} style={{
                padding: '14px 20px',
                border: 'none', background: 'transparent', cursor: 'pointer',
                fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? '#6366f1' : '#64748b',
                borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                marginBottom: -1, display: 'flex', alignItems: 'center', gap: 7,
                transition: 'color 0.15s',
                letterSpacing: '-0.01em',
              }}>
                <span className="tab-icon" style={{ fontSize: 14, opacity: 0.8 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-panel" style={{ padding: 28 }}>

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Completion Ring */}
                <div className="completion-ring-container" style={{ background: '#f8fafc', borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Completion Rate</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
                      <svg width="88" height="88" viewBox="0 0 88 88">
                        <circle cx="44" cy="44" r="36" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle cx="44" cy="44" r="36" fill="none" stroke="#6366f1" strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 36}`}
                          strokeDashoffset={`${2 * Math.PI * 36 * (1 - completionRate / 100)}`}
                          strokeLinecap="round"
                          style={{ transformOrigin: 'center', transform: 'rotate(-90deg)', transition: 'stroke-dashoffset 1s ease' }}
                        />
                        <text x="44" y="48" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">{completionRate}%</text>
                      </svg>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        { label: 'Completed', value: stats.completed, color: '#10b981' },
                        { label: 'Pending', value: stats.pending, color: '#f59e0b' },
                        { label: 'Complaints', value: stats.complaints, color: '#ef4444' },
                      ].map(item => (
                        <div key={item.label} className="completion-legend-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                          <span style={{ fontSize: 12, color: '#64748b' }}>{item.label}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginLeft: 4, fontFamily: 'monospace' }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>System Snapshot</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { label: 'Registered Users', value: users.length },
                      { label: 'Active Requests', value: stats.total - stats.completed },
                      { label: 'Admins', value: users.filter(u => u.role === 'admin').length },
                      { label: 'Last Sync', value: new Date().toLocaleTimeString() },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#64748b' }}>{item.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Requests */}
                <div style={{ gridColumn: '1 / -1', background: '#f8fafc', borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Recent Requests</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {requests.slice(0, 4).map((req, i) => (
                      <div key={req._id} className="recent-request-item" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: '#fff', padding: '10px 14px', borderRadius: 10,
                        border: '1px solid #f1f5f9',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={req.userId?.name} index={i} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{req.userId?.name}</div>
                            <div style={{ fontSize: 11, color: '#94a3b8' }}>{req.type}</div>
                          </div>
                        </div>
                        <StatusBadge status={req.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* REQUESTS */}
            {activeTab === 'requests' && (
              <div>
                <div className="filter-buttons" style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                  {['all', 'pending', 'processing', 'completed'].map(s => (
                    <button key={s} className="filter-btn" onClick={() => setFilterStatus(s)} style={{
                      padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                      fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
                      background: filterStatus === s ? '#6366f1' : '#f1f5f9',
                      color: filterStatus === s ? '#fff' : '#64748b',
                      transition: 'all 0.15s',
                      letterSpacing: '0.02em',
                    }}>{s}</button>
                  ))}
                </div>

                <div className="table-scroll" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
                    <thead>
                      <tr>
                        {['User', 'Request Type', 'Date', 'Status', 'Action'].map(h => (
                          <th key={h} style={{ padding: '6px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length > 0 ? filtered.map((req, i) => (
                        <tr key={req._id} style={{ background: '#fff' }}>
                          <td data-label="User" style={{ padding: '10px 14px', borderRadius: '10px 0 0 10px', border: '1px solid #f1f5f9', borderRight: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                              <Avatar name={req.userId?.name} index={i} />
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{req.userId?.name}</span>
                            </div>
                          </td>
                          <td data-label="Type" style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', fontSize: 13, color: '#475569' }}>{req.type}</td>
                          <td data-label="Date" style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
                            {new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td data-label="Status" style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none' }}>
                            <StatusBadge status={req.status} />
                          </td>
                          <td data-label="Action" style={{ padding: '10px 14px', borderRadius: '0 10px 10px 0', border: '1px solid #f1f5f9', borderLeft: 'none' }}>
                            <select
                              value={req.status}
                              onChange={e => handleStatusUpdate(req._id, e.target.value)}
                              style={{
                                fontSize: 12, padding: '4px 10px', borderRadius: 8,
                                border: '1px solid #e2e8f0', background: '#f8fafc',
                                color: '#475569', fontWeight: 500, cursor: 'pointer', outline: 'none',
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" style={{ padding: '40px', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
                            No requests found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* USERS */}
            {activeTab === 'users' && (
              <div>
                <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{users.length} registered users</span>
                </div>
                <div className="table-scroll" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
                    <thead>
                      <tr>
                        {['User', 'Email', 'NIC', 'Role', 'Joined'].map(h => (
                          <th key={h} style={{ padding: '6px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, i) => (
                        <tr key={u._id}>
                          <td data-label="User" style={{ padding: '10px 14px', borderRadius: '10px 0 0 10px', border: '1px solid #f1f5f9', borderRight: 'none', background: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                              <Avatar name={u.name} index={i} />
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{u.name}</span>
                            </div>
                          </td>
                          <td data-label="Email" style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', background: '#fff', fontSize: 13, color: '#475569' }}>{u.email}</td>
                          <td data-label="NIC" style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', background: '#fff', fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{u.NIC}</td>
                          <td data-label="Role" style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', background: '#fff' }}>
                            <span style={{
                              display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px',
                              borderRadius: 20, textTransform: 'capitalize',
                              background: roleConfig[u.role]?.bg || '#f1f5f9',
                              color: roleConfig[u.role]?.text || '#475569',
                              letterSpacing: '0.04em',
                            }}>{u.role}</span>
                          </td>
                          <td data-label="Joined" style={{ padding: '10px 14px', borderRadius: '0 10px 10px 0', border: '1px solid #f1f5f9', borderLeft: 'none', background: '#fff', fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
                            {new Date(u.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
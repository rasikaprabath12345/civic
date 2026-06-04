/**
 * Citizen Dashboard — Premium Edition
 */

import React, { useState, useEffect } from 'react';

const mockAppointments = [
  { _id: 'a1', service: 'NIC Renewal', date: '2024-06-10', status: 'confirmed', time: '10:30 AM', location: 'Colombo District Office' },
  { _id: 'a2', service: 'Passport Application', date: '2024-06-18', status: 'pending', time: '02:00 PM', location: 'Immigration Dept.' },
  { _id: 'a3', service: 'Birth Certificate', date: '2024-05-22', status: 'cancelled', time: '09:00 AM', location: 'Gampaha Registry' },
];

const mockRequests = [
  { _id: 'r1', type: 'Birth Certificate', createdAt: '2024-05-01', status: 'completed', ref: 'REQ-00124' },
  { _id: 'r2', type: 'Passport Renewal', createdAt: '2024-05-14', status: 'processing', ref: 'REQ-00198' },
  { _id: 'r3', type: 'Land Deed Copy', createdAt: '2024-05-28', status: 'pending', ref: 'REQ-00231' },
];

const mockComplaints = [
  { _id: 'c1', subject: 'Delay in Processing', description: 'My birth certificate request has been pending for 3 weeks without any update or response from the office.', status: 'in-progress', createdAt: '2024-05-20' },
  { _id: 'c2', subject: 'Staff Misconduct', description: 'The officer at the counter was rude and unhelpful during my visit on 12th May 2024.', status: 'resolved', createdAt: '2024-05-12' },
];

const mockUser = { name: 'Amal Perera', NIC: '901234567V', email: 'amal@example.com' };

const statusConfig = {
  confirmed:   { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  completed:   { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  resolved:    { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  pending:     { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  processing:  { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  'in-progress': { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  cancelled:   { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: cfg.bg, color: cfg.text,
      fontSize: 11, fontWeight: 600, padding: '3px 10px',
      borderRadius: 20, letterSpacing: '0.04em', textTransform: 'capitalize', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
}

function Avatar({ name }) {
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??';
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      background: '#ede9fe', color: '#5b21b6',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, flexShrink: 0, letterSpacing: '0.05em',
    }}>{initials}</div>
  );
}

function StatCard({ icon, label, value, accent }) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div style={{
      background: '#fff', border: '1px solid #f1f5f9',
      borderRadius: 16, padding: '16px',
      display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.09)' : '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s',
      cursor: 'pointer',
    }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: accent + '18',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', fontFamily: "'DM Mono', monospace" }}>{value}</div>
      </div>
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: 13 }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
      No {label} yet
    </div>
  );
}

const TABS = [
  { id: 'overview',     label: 'Overview',     icon: '◈' },
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'requests',     label: 'Requests',     icon: '≡'  },
  { id: 'complaints',   label: 'Complaints',   icon: '⚠'  },
];

export default function CitizenDashboard() {
  const user = mockUser;
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments] = useState(mockAppointments);
  const [requests] = useState(mockRequests);
  const [complaints] = useState(mockComplaints);
  const [mounted, setMounted] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth < 480,
    isSmallPhone: window.innerWidth < 360,
    isPhone: window.innerWidth >= 360 && window.innerWidth < 600,
    isTablet: window.innerWidth >= 600 && window.innerWidth < 900,
    isDesktop: window.innerWidth >= 900 && window.innerWidth < 1440,
    isLargeDesktop: window.innerWidth >= 1440,
  });

  useEffect(() => { 
    setTimeout(() => setMounted(true), 60);
    const handleResize = () => {
      const w = window.innerWidth;
      setScreenSize({
        width: w,
        isMobile: w < 480,
        isSmallPhone: w < 360,
        isPhone: w >= 360 && w < 600,
        isTablet: w >= 600 && w < 900,
        isDesktop: w >= 900 && w < 1440,
        isLargeDesktop: w >= 1440,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const completed = requests.filter(r => r.status === 'completed').length;

  const fadeIn = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
  });

  const Row = ({ children, last }) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 12px',
      borderBottom: last ? 'none' : '1px solid #f8fafc',
      background: '#fff',
      transition: 'background 0.15s',
      flexWrap: screenSize.isMobile ? 'wrap' : 'nowrap',
      gap: screenSize.isMobile ? 8 : 0,
    }}
      onMouseEnter={e => !screenSize.isMobile && (e.currentTarget.style.background = '#fafafe')}
      onMouseLeave={e => !screenSize.isMobile && (e.currentTarget.style.background = '#fff')}
    >{children}</div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', -apple-system, sans-serif", width: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Accent strip */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: screenSize.isMobile ? 2 : 4,
        background: 'linear-gradient(to bottom, #3b82f6, #6366f1, #8b5cf6)',
        zIndex: 100,
      }} />

      {/* Header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #f1f5f9',
        padding: screenSize.isMobile ? '0 16px' : '0 40px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: screenSize.isMobile ? 56 : 64, marginLeft: screenSize.isMobile ? 2 : 4,
        flexWrap: screenSize.isMobile ? 'wrap' : 'nowrap',
        gap: screenSize.isMobile ? 8 : 0,
        width: '100%', boxSizing: 'border-box',
        ...fadeIn(0),
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 14, fontWeight: 700,
          }}>C</div>
          <span style={{ fontWeight: 700, fontSize: screenSize.isMobile ? 14 : 15, color: '#0f172a', letterSpacing: '-0.01em', display: screenSize.isMobile ? 'none' : 'inline' }}>CitizenOS</span>
          <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 8px', display: screenSize.isMobile ? 'none' : 'block' }} />
          <span style={{ fontSize: screenSize.isMobile ? 12 : 13, color: '#94a3b8', fontWeight: 400 }}>Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: screenSize.isMobile ? 8 : 10 }}>
          <Avatar name={user?.name} />
          <div style={{ display: screenSize.isMobile ? 'none' : 'block' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>NIC: {user?.NIC}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ marginLeft: screenSize.isMobile ? 2 : 4, padding: screenSize.isMobile ? '20px 12px' : '36px 40px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Page Title */}
        <div style={{ marginBottom: screenSize.isMobile ? 24 : 32, ...fadeIn(0.05) }}>
          <h1 style={{ fontSize: screenSize.isMobile ? 18 : 24, fontWeight: 700, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ fontSize: screenSize.isMobile ? 12 : 13, color: '#94a3b8', margin: 0 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: screenSize.isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: screenSize.isMobile ? 12 : 16, marginBottom: screenSize.isMobile ? 24 : 32, ...fadeIn(0.1) }}>
          <StatCard icon="📅" label="Appointments" value={appointments.length} accent="#3b82f6" />
          <StatCard icon="📜" label="Requests"     value={requests.length}     accent="#6366f1" />
          <StatCard icon="⚠️" label="Complaints"   value={complaints.length}   accent="#f59e0b" />
          <StatCard icon="✅" label="Completed"    value={completed}           accent="#10b981" />
        </div>

        {/* Main Panel */}
        <div style={{
          background: '#fff', border: '1px solid #f1f5f9',
          borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          overflow: 'hidden', ...fadeIn(0.15),
        }}>

          {/* Tab Bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: screenSize.isMobile ? '0 12px' : '0 24px', background: '#fafafa', overflowX: screenSize.isMobile ? 'auto' : 'visible' }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: screenSize.isMobile ? '12px 10px' : '14px 18px', border: 'none', background: 'transparent', cursor: 'pointer',
                fontSize: screenSize.isMobile ? 12 : 13, fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? '#3b82f6' : '#64748b',
                borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                marginBottom: -1, display: 'flex', alignItems: 'center', gap: screenSize.isMobile ? 4 : 7,
                transition: 'color 0.15s', letterSpacing: '-0.01em', whiteSpace: 'nowrap', minWidth: 'fit-content',
              }}>
                <span style={{ fontSize: screenSize.isMobile ? 11 : 13, opacity: 0.8 }}>{tab.icon}</span>
                <span style={{ display: screenSize.isMobile ? 'none' : 'inline' }}>{tab.label}</span>
              </button>
            ))}
          </div>

          <div style={{ padding: screenSize.isMobile ? 16 : 28 }}>

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: screenSize.isMobile ? '1fr' : '1fr 1fr', gap: screenSize.isMobile ? 20 : 24 }}>

                {/* Upcoming Appointments */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                    Upcoming Appointments
                  </div>
                  <div style={{ border: '1px solid #f1f5f9', borderRadius: 12, overflow: 'hidden' }}>
                    {appointments.length > 0 ? appointments.slice(0, 3).map((apt, i) => (
                      <Row key={apt._id} last={i === Math.min(appointments.length, 3) - 1}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: screenSize.isMobile ? 8 : 12, flex: 1 }}>
                          <div style={{
                            width: screenSize.isMobile ? 32 : 36, height: screenSize.isMobile ? 32 : 36, borderRadius: 10, flexShrink: 0,
                            background: '#eff6ff', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                          }}>
                            <span style={{ fontSize: screenSize.isMobile ? 9 : 10, fontWeight: 700, color: '#3b82f6', lineHeight: 1 }}>
                              {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                            </span>
                            <span style={{ fontSize: screenSize.isMobile ? 11 : 13, fontWeight: 700, color: '#1e40af', lineHeight: 1 }}>
                              {new Date(apt.date).getDate()}
                            </span>
                          </div>
                          <div>
                            <div style={{ fontSize: screenSize.isMobile ? 12 : 13, fontWeight: 600, color: '#0f172a' }}>{apt.service}</div>
                            <div style={{ fontSize: screenSize.isMobile ? 10 : 11, color: '#94a3b8' }}>{screenSize.isMobile ? apt.time : `${apt.time} · ${apt.location}`}</div>
                          </div>
                        </div>
                        <StatusBadge status={apt.status} />
                      </Row>
                    )) : <EmptyState label="appointments" />}
                  </div>
                </div>

                {/* Recent Requests */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                    Recent Requests
                  </div>
                  <div style={{ border: '1px solid #f1f5f9', borderRadius: 12, overflow: 'hidden' }}>
                    {requests.length > 0 ? requests.slice(0, 3).map((req, i) => (
                      <Row key={req._id} last={i === Math.min(requests.length, 3) - 1}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: screenSize.isMobile ? 12 : 13, fontWeight: 600, color: '#0f172a' }}>{req.type}</div>
                          <div style={{ fontSize: screenSize.isMobile ? 10 : 11, color: '#94a3b8', fontFamily: 'monospace' }}>{screenSize.isMobile ? req.ref : `${req.ref} · ${new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`}</div>
                        </div>
                        <StatusBadge status={req.status} />
                      </Row>
                    )) : <EmptyState label="requests" />}
                  </div>
                </div>

                {/* Complaints strip */}
                <div style={{ gridColumn: screenSize.isMobile ? '1 / -1' : '1 / -1' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                    Active Complaints
                  </div>
                  <div style={{ border: '1px solid #f1f5f9', borderRadius: 12, overflow: 'hidden' }}>
                    {complaints.length > 0 ? complaints.map((c, i) => (
                      <Row key={c._id} last={i === complaints.length - 1}>
                        <div style={{ flex: 1, minWidth: 0, paddingRight: screenSize.isMobile ? 10 : 20 }}>
                          <div style={{ fontSize: screenSize.isMobile ? 12 : 13, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{c.subject}</div>
                          <div style={{ fontSize: screenSize.isMobile ? 10 : 12, color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {c.description.substring(0, screenSize.isMobile ? 40 : 70)}…
                          </div>
                        </div>
                        <StatusBadge status={c.status} />
                      </Row>
                    )) : <EmptyState label="complaints" />}
                  </div>
                </div>

              </div>
            )}

            {/* APPOINTMENTS */}
            {activeTab === 'appointments' && (
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16, fontWeight: 500 }}>
                  {appointments.length} appointment{appointments.length !== 1 ? 's' : ''} found
                </div>
                <div style={{ border: '1px solid #f1f5f9', borderRadius: 12, overflow: 'hidden' }}>
                  {appointments.length > 0 ? appointments.map((apt, i) => (
                    <Row key={apt._id} last={i === appointments.length - 1}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: screenSize.isMobile ? 10 : 14, flex: 1 }}>
                        <div style={{
                          width: screenSize.isMobile ? 40 : 44, height: screenSize.isMobile ? 40 : 44, borderRadius: 12, flexShrink: 0,
                          background: '#eff6ff', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: screenSize.isMobile ? 9 : 10, fontWeight: 700, color: '#3b82f6', lineHeight: 1 }}>
                            {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                          </span>
                          <span style={{ fontSize: screenSize.isMobile ? 14 : 16, fontWeight: 700, color: '#1e40af', lineHeight: 1 }}>
                            {new Date(apt.date).getDate()}
                          </span>
                        </div>
                        <div>
                          <div style={{ fontSize: screenSize.isMobile ? 13 : 14, fontWeight: 600, color: '#0f172a' }}>{apt.service}</div>
                          <div style={{ fontSize: screenSize.isMobile ? 10 : 12, color: '#94a3b8', marginTop: 2 }}>
                            {screenSize.isMobile ? apt.time : `${apt.time} · ${apt.location}`}
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={apt.status} />
                    </Row>
                  )) : <EmptyState label="appointments" />}
                </div>
              </div>
            )}

            {/* REQUESTS */}
            {activeTab === 'requests' && (
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16, fontWeight: 500 }}>
                  {requests.length} request{requests.length !== 1 ? 's' : ''} submitted
                </div>
                {screenSize.isMobile ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {requests.length > 0 ? requests.map(req => (
                      <div key={req._id} style={{
                        background: '#fff', border: '1px solid #f1f5f9',
                        borderRadius: 12, padding: '14px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{req.type}</div>
                          <StatusBadge status={req.status} />
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>Ref: {req.ref}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>
                          {new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    )) : <EmptyState label="requests" />}
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
                    <thead>
                      <tr>
                        {['Type', 'Reference', 'Submitted', 'Status'].map(h => (
                          <th key={h} style={{ padding: '4px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {requests.length > 0 ? requests.map(req => (
                        <tr key={req._id}>
                          <td style={{ padding: '12px 14px', borderRadius: '10px 0 0 10px', border: '1px solid #f1f5f9', borderRight: 'none', background: '#fff', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{req.type}</td>
                          <td style={{ padding: '12px 14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', background: '#fff', fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{req.ref}</td>
                          <td style={{ padding: '12px 14px', border: '1px solid #f1f5f9', borderLeft: 'none', borderRight: 'none', background: '#fff', fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
                            {new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td style={{ padding: '12px 14px', borderRadius: '0 10px 10px 0', border: '1px solid #f1f5f9', borderLeft: 'none', background: '#fff' }}>
                            <StatusBadge status={req.status} />
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="4"><EmptyState label="requests" /></td></tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* COMPLAINTS */}
            {activeTab === 'complaints' && (
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16, fontWeight: 500 }}>
                  {complaints.length} complaint{complaints.length !== 1 ? 's' : ''} filed
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {complaints.length > 0 ? complaints.map(c => (
                    <div key={c._id} style={{
                      background: '#fff', border: '1px solid #f1f5f9',
                      borderRadius: 12, padding: screenSize.isMobile ? '12px' : '16px 20px',
                      transition: 'box-shadow 0.2s',
                    }}
                      onMouseEnter={e => !screenSize.isMobile && (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)')}
                      onMouseLeave={e => !screenSize.isMobile && (e.currentTarget.style.boxShadow = 'none')}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: screenSize.isMobile ? 13 : 14, fontWeight: 600, color: '#0f172a' }}>{c.subject}</div>
                        <StatusBadge status={c.status} />
                      </div>
                      <p style={{ fontSize: screenSize.isMobile ? 12 : 13, color: '#64748b', margin: '0 0 10px', lineHeight: 1.6 }}>{c.description}</p>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>
                        Filed: {new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  )) : <EmptyState label="complaints" />}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

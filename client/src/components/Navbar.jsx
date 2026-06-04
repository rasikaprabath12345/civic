/**
 * Navbar Component — CivicLink LK (Premium Redesign)
 * ===================================================
 * Matches Home page luxury-civic aesthetic:
 * deep navy + warm gold, Playfair Display + DM Sans
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cl-nav {
          position: sticky; top: 0; z-index: 1000;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.25);
          transition: padding 0.3s ease, box-shadow 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .cl-nav.scrolled {
          box-shadow: 0 4px 24px rgba(13, 38, 69, 0.35);
        }

        .cl-nav-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 24px;
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          transition: height 0.3s ease;
        }
        .cl-nav-inner.scrolled { height: 58px; }

        /* Logo */
        .cl-nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem; font-weight: 700;
          color: #0D2645; text-decoration: none;
          letter-spacing: -0.01em;
          display: flex; align-items: center; gap: 10px;
          transition: opacity 0.2s;
        }
        .cl-nav-logo:hover { opacity: 0.88; }
        .cl-nav-logo span {
          background: linear-gradient(135deg, #C5942A, #F0C060);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cl-nav-logo-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: linear-gradient(135deg, #C5942A, #F0C060);
          flex-shrink: 0;
          animation: nav-pulse 2s ease-in-out infinite;
        }
        @keyframes nav-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }

        /* Desktop links */
        .cl-nav-links {
          display: flex; align-items: center; gap: 4px;
          list-style: none; margin: 0; padding: 0;
        }
        .cl-nav-links a {
          font-size: 0.88rem; font-weight: 500;
          color: rgba(13, 38, 69, 0.7);
          text-decoration: none;
          padding: 7px 14px; border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .cl-nav-links a:hover {
          color: #0D2645;
          background: rgba(13, 38, 69, 0.07);
        }
        .cl-nav-links a.active {
          color: #F0C060;
          background: rgba(197, 148, 42, 0.12);
        }

        /* Divider */
        .cl-nav-divider {
          width: 1px; height: 24px;
          background: rgba(13, 38, 69, 0.12);
          margin: 0 8px; flex-shrink: 0;
        }

        /* User chip */
        .cl-nav-user {
          display: flex; align-items: center; gap: 10px;
        }
        .cl-nav-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #1B4F9B, #2563EB);
          border: 2px solid rgba(197, 148, 42, 0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 600; color: #FFFFFF;
          letter-spacing: 0.03em; flex-shrink: 0;
        }
        .cl-nav-username {
          font-size: 0.85rem; color: rgba(13, 38, 69, 0.75);
          font-weight: 500; max-width: 130px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .cl-nav-role {
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #C5942A; display: block; line-height: 1;
        }

        /* Buttons */
        .cl-nav-btn-primary {
          background: linear-gradient(135deg, #C5942A, #F0C060);
          color: #0D2645; font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.85rem; letter-spacing: 0.01em;
          padding: 9px 22px; border-radius: 100px; border: none; cursor: pointer;
          text-decoration: none; display: inline-block; white-space: nowrap;
          box-shadow: 0 3px 14px rgba(197, 148, 42, 0.35);
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
        }
        .cl-nav-btn-primary:hover {
          transform: translateY(-1px); filter: brightness(1.07);
          box-shadow: 0 6px 20px rgba(197, 148, 42, 0.45);
        }
        .cl-nav-btn-ghost {
          background: transparent; color: rgba(13, 38, 69, 0.7);
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.85rem;
          padding: 9px 18px; border-radius: 100px;
          border: 1.5px solid rgba(13, 38, 69, 0.2); cursor: pointer;
          text-decoration: none; display: inline-block; white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .cl-nav-btn-ghost:hover {
          background: rgba(13, 38, 69, 0.06);
          border-color: rgba(13, 38, 69, 0.4);
          color: #0D2645;
        }
        .cl-nav-btn-logout {
          background: transparent; color: rgba(13, 38, 69, 0.55);
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.85rem;
          padding: 8px 14px; border-radius: 8px;
          border: none; cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .cl-nav-btn-logout:hover {
          color: #F87171; background: rgba(248, 113, 113, 0.08);
        }

        /* Mobile toggle */
        .cl-nav-toggle {
          display: none;
          background: transparent; border: none; cursor: pointer;
          color: rgba(13, 38, 69, 0.7); font-size: 1.5rem;
          padding: 6px; border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          line-height: 1;
        }
        .cl-nav-toggle:hover {
          color: #0D2645; background: rgba(13, 38, 69, 0.07);
        }

        /* Mobile menu */
        .cl-nav-mobile {
          border-top: 1px solid rgba(13, 38, 69, 0.1);
          background: rgba(255, 255, 255, 0.98);
          padding: 16px 24px 20px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .cl-nav-mobile a,
        .cl-nav-mobile button {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem; font-weight: 500;
          color: rgba(13, 38, 69, 0.7); text-decoration: none;
          padding: 11px 14px; border-radius: 10px;
          display: block; width: 100%; text-align: left;
          background: transparent; border: none; cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .cl-nav-mobile a:hover,
        .cl-nav-mobile button:hover {
          color: #0D2645; background: rgba(13, 38, 69, 0.07);
        }
        .cl-nav-mobile a.active {
          color: #C5942A; background: rgba(197, 148, 42, 0.1);
        }
        .cl-nav-mobile-divider {
          height: 1px; background: rgba(13, 38, 69, 0.08);
          margin: 8px 0;
        }
        .cl-nav-mobile-user {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; margin-bottom: 4px;
        }
        .cl-nav-mobile-cta {
          margin-top: 8px; display: flex; flex-direction: column; gap: 8px;
        }
        .cl-nav-mobile-cta a {
          text-align: center !important;
          padding: 12px 14px !important;
        }
        .cl-nav-mobile-primary {
          background: linear-gradient(135deg, #C5942A, #F0C060) !important;
          color: #0D2645 !important; font-weight: 600 !important;
          border-radius: 100px !important;
          box-shadow: 0 3px 14px rgba(197,148,42,0.3);
        }
        .cl-nav-mobile-ghost {
          border: 1.5px solid rgba(13, 38, 69, 0.2) !important;
          border-radius: 100px !important; color: rgba(13, 38, 69, 0.7) !important;
        }
        .cl-nav-mobile-logout {
          color: rgba(248, 113, 113, 0.8) !important;
        }
        .cl-nav-mobile-logout:hover {
          color: #F87171 !important; background: rgba(248, 113, 113, 0.08) !important;
        }

        @media (max-width: 768px) {
          .cl-nav-desktop { display: none; }
          .cl-nav-toggle { display: block; }
        }
        @media (min-width: 769px) {
          .cl-nav-mobile { display: none !important; }
        }
      `}</style>

      <nav className={`cl-nav${scrolled ? ' scrolled' : ''}`}>
        <div className={`cl-nav-inner${scrolled ? ' scrolled' : ''}`}>

          {/* Logo */}
          <Link to="/" className="cl-nav-logo">
            <span className="cl-nav-logo-dot" />
            Civic<span>Link</span> LK
          </Link>

          {/* Desktop Nav */}
          <div className="cl-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ul className="cl-nav-links">
              <li>
                <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
              </li>

              {isAuthenticated && user?.role === 'citizen' && (
                <>
                  <li><Link to="/citizen-dashboard" className={isActive('/citizen-dashboard') ? 'active' : ''}>Dashboard</Link></li>
                  <li><Link to="/appointments" className={isActive('/appointments') ? 'active' : ''}>Appointments</Link></li>
                  <li><Link to="/certificates" className={isActive('/certificates') ? 'active' : ''}>Certificates</Link></li>
                  <li><Link to="/complaints" className={isActive('/complaints') ? 'active' : ''}>Complaints</Link></li>
                  <li><Link to="/requests" className={isActive('/requests') ? 'active' : ''}>Track</Link></li>
                  <li><Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Profile</Link></li>
                </>
              )}

              {isAuthenticated && user?.role === 'admin' && (
                <li><Link to="/admin-dashboard" className={isActive('/admin-dashboard') ? 'active' : ''}>Admin Panel</Link></li>
              )}
            </ul>

            {isAuthenticated ? (
              <>
                <div className="cl-nav-divider" />
                <div className="cl-nav-user">
                  <div className="cl-nav-avatar">
                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="cl-nav-role">{user?.role}</span>
                    <span className="cl-nav-username">{user?.name}</span>
                  </div>
                </div>
                <button onClick={handleLogout} className="cl-nav-btn-logout">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <div className="cl-nav-divider" />
                <Link to="/login" className="cl-nav-btn-ghost">Sign In</Link>
                <Link to="/register" className="cl-nav-btn-primary">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="cl-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="cl-nav-mobile">
            {isAuthenticated && (
              <>
                <div className="cl-nav-mobile-user">
                  <div className="cl-nav-avatar">
                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="cl-nav-role">{user?.role}</span>
                    <span className="cl-nav-username" style={{ color: 'rgba(255,255,255,0.85)', display: 'block', fontSize: '0.9rem' }}>{user?.name}</span>
                  </div>
                </div>
                <div className="cl-nav-mobile-divider" />
              </>
            )}

            <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>

            {isAuthenticated && user?.role === 'citizen' && (
              <>
                <Link to="/citizen-dashboard" className={isActive('/citizen-dashboard') ? 'active' : ''}>Dashboard</Link>
                <Link to="/appointments" className={isActive('/appointments') ? 'active' : ''}>Appointments</Link>
                <Link to="/certificates" className={isActive('/certificates') ? 'active' : ''}>Certificates</Link>
                <Link to="/complaints" className={isActive('/complaints') ? 'active' : ''}>Complaints</Link>
                <Link to="/requests" className={isActive('/requests') ? 'active' : ''}>Track Requests</Link>
                <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Profile</Link>
              </>
            )}

            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin-dashboard" className={isActive('/admin-dashboard') ? 'active' : ''}>Admin Panel</Link>
            )}

            <div className="cl-nav-mobile-divider" />

            {isAuthenticated ? (
              <button onClick={handleLogout} className="cl-nav-mobile-logout">
                Sign out
              </button>
            ) : (
              <div className="cl-nav-mobile-cta">
                <Link to="/login" className="cl-nav-mobile-ghost">Sign In</Link>
                <Link to="/register" className="cl-nav-mobile-primary">Get Started Free</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
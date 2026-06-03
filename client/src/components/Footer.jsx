/**
 * Footer Component — CivicLink LK (Premium Redesign)
 * ===================================================
 * Matches Home page luxury-civic aesthetic:
 * deep navy + warm gold, Playfair Display + DM Sans,
 * lotus motif, Sri Lankan flag stripe accent.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Lotus = ({ size = 40, color = '#C5942A', opacity = 0.18 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <ellipse
        key={deg}
        cx="32" cy="48" rx="6" ry="16"
        fill={color} opacity={opacity}
        transform={`rotate(${deg} 32 32)`}
      />
    ))}
    <circle cx="32" cy="32" r="6" fill={color} opacity={opacity * 2} />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cl-footer {
          background: linear-gradient(180deg, #0a1c36 0%, #0D2645 100%);
          border-top: 1px solid rgba(197, 148, 42, 0.25);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid overlay */
        .cl-footer-grid {
          position: absolute; inset: 0; opacity: 0.025; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .cl-footer-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 64px 24px 0;
          position: relative; z-index: 1;
        }

        /* Top: logo + tagline + lotus */
        .cl-footer-brand {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 24px;
          margin-bottom: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-wrap: wrap;
        }
        .cl-footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem; font-weight: 700;
          color: #FFFFFF; text-decoration: none;
          letter-spacing: -0.01em;
          display: flex; align-items: center; gap: 10px;
        }
        .cl-footer-logo-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg, #C5942A, #F0C060);
          flex-shrink: 0;
        }
        .cl-footer-logo span {
          background: linear-gradient(135deg, #C5942A, #F0C060);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cl-footer-tagline {
          font-size: 0.85rem; color: rgba(255,255,255,0.45);
          margin-top: 10px; line-height: 1.6; max-width: 300px;
          font-weight: 300;
        }
        .cl-footer-badge {
          display: inline-flex; align-items: center; gap: 6px;
          border: 1px solid rgba(197,148,42,0.35); border-radius: 100px;
          padding: 5px 14px; margin-top: 16px;
          color: rgba(240,192,96,0.8); font-size: 0.73rem;
          font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(197,148,42,0.07);
        }
        .cl-footer-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #C5942A; opacity: 0.8;
        }

        /* Main grid */
        .cl-footer-grid-cols {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 40px;
          margin-bottom: 48px;
        }
        .cl-footer-col-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem; font-weight: 700;
          color: #FFFFFF; margin-bottom: 20px;
          letter-spacing: 0.01em;
        }
        .cl-footer-col-title::after {
          content: '';
          display: block; margin-top: 10px;
          width: 28px; height: 2px;
          background: linear-gradient(90deg, #C5942A, #F0C060);
          border-radius: 2px;
        }
        .cl-footer-links {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .cl-footer-links a {
          font-size: 0.875rem; color: rgba(255,255,255,0.52);
          text-decoration: none; font-weight: 400;
          transition: color 0.2s, padding-left 0.2s;
          display: inline-block;
        }
        .cl-footer-links a:hover {
          color: #F0C060; padding-left: 4px;
        }
        .cl-footer-about-text {
          font-size: 0.875rem; color: rgba(255,255,255,0.48);
          line-height: 1.75; font-weight: 300;
        }
        .cl-footer-contact-item {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 12px;
        }
        .cl-footer-contact-icon {
          font-size: 1rem; margin-top: 1px; flex-shrink: 0;
          opacity: 0.6;
        }
        .cl-footer-contact-text {
          font-size: 0.875rem; color: rgba(255,255,255,0.52);
          line-height: 1.55; font-weight: 400;
        }
        .cl-footer-contact-text a {
          color: rgba(255,255,255,0.52); text-decoration: none;
          transition: color 0.2s;
        }
        .cl-footer-contact-text a:hover { color: #F0C060; }

        /* Bottom bar */
        .cl-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 20px 0 24px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .cl-footer-copyright {
          font-size: 0.78rem; color: rgba(255,255,255,0.35);
          font-weight: 400; line-height: 1.6;
        }
        .cl-footer-copyright strong {
          color: rgba(255,255,255,0.55); font-weight: 500;
        }
        .cl-footer-bottom-links {
          display: flex; gap: 20px; list-style: none; margin: 0; padding: 0;
        }
        .cl-footer-bottom-links a {
          font-size: 0.78rem; color: rgba(255,255,255,0.3);
          text-decoration: none; transition: color 0.2s;
        }
        .cl-footer-bottom-links a:hover { color: rgba(255,255,255,0.65); }

        /* Sri Lanka flag stripe */
        .cl-footer-flag {
          height: 3px;
          background: linear-gradient(
            90deg,
            #8B0000 0%, #8B0000 33%,
            #FF9900 33%, #FF9900 66%,
            #006400 66%, #006400 100%
          );
          opacity: 0.6;
        }

        @media (max-width: 640px) {
          .cl-footer-brand { flex-direction: column; }
          .cl-footer-bottom { flex-direction: column; align-items: flex-start; }
          .cl-footer-inner { padding: 48px 20px 0; }
        }
      `}</style>

      <footer className="cl-footer">
        <div className="cl-footer-grid" />

        <div className="cl-footer-inner">

          {/* Brand row */}
          <div className="cl-footer-brand">
            <div>
              <Link to="/" className="cl-footer-logo">
                <span className="cl-footer-logo-dot" />
                Civic<span>Link</span> LK
              </Link>
              <p className="cl-footer-tagline">
                Sri Lanka's digital gateway to government services — fast, secure, and accessible to every citizen.
              </p>
              <div className="cl-footer-badge">
                <span className="cl-footer-badge-dot" />
                Official Government Initiative
              </div>
            </div>
            <div style={{ opacity: 0.35 }}>
              <Lotus size={72} color="#C5942A" opacity={0.5} />
            </div>
          </div>

          {/* Links grid */}
          <div className="cl-footer-grid-cols">

            {/* About */}
            <div>
              <div className="cl-footer-col-title">About</div>
              <p className="cl-footer-about-text">
                CivicLink LK simplifies access to government services, bringing Grama Sevaka appointments, certificates, and complaint management online for all Sri Lankans.
              </p>
            </div>

            {/* Services */}
            <div>
              <div className="cl-footer-col-title">Services</div>
              <ul className="cl-footer-links">
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/certificates">Certificates</Link></li>
                <li><Link to="/complaints">Complaints</Link></li>
                <li><Link to="#">AI Assistant <span style={{ fontSize: '0.7rem', color: '#C5942A', marginLeft: 4 }}>Soon</span></Link></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <div className="cl-footer-col-title">Account</div>
              <ul className="cl-footer-links">
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/citizen-dashboard">Citizen Dashboard</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="cl-footer-col-title">Contact</div>
              <div className="cl-footer-contact-item">
                <span className="cl-footer-contact-icon">✉</span>
                <div className="cl-footer-contact-text">
                  <a href="mailto:support@civiclink.lk">support@civiclink.lk</a>
                </div>
              </div>
              <div className="cl-footer-contact-item">
                <span className="cl-footer-contact-icon">☎</span>
                <div className="cl-footer-contact-text">
                  <a href="tel:+94112345678">+94-11-2-345-678</a>
                </div>
              </div>
              <div className="cl-footer-contact-item">
                <span className="cl-footer-contact-icon">🕐</span>
                <div className="cl-footer-contact-text">
                  Mon – Fri, 8:30 AM – 4:30 PM
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="cl-footer-bottom">
            <p className="cl-footer-copyright">
              © {currentYear} <strong>CivicLink LK</strong> · All rights reserved · Sri Lankan Government Initiative
            </p>
            <ul className="cl-footer-bottom-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>

        </div>

        {/* Sri Lanka flag stripe at very bottom */}
        <div className="cl-footer-flag" />
      </footer>
    </>
  );
};

export default Footer;
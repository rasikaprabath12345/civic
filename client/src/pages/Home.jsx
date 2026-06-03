/**
 * Home Page — CivicLink LK (Premium Redesign)
 * =============================================
 * Luxury-civic aesthetic: deep navy + warm gold, editorial layout,
 * smooth scroll animations, Sri Lankan cultural motifs.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ─── Tiny hook: detect when element enters viewport ─── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ─── Fade-up wrapper ─── */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Data ─── */
const SERVICES = [
  {
    icon: '📅',
    title: 'Appointments',
    desc: 'Book Grama Sevaka appointments online, anytime.',
    href: '/appointments',
    color: '#1B4F9B',
  },
  {
    icon: '📜',
    title: 'Certificates',
    desc: 'Request birth, death & marriage certificates.',
    href: '/certificates',
    color: '#C5942A',
  },
  {
    icon: '📢',
    title: 'Complaints',
    desc: 'Submit & track government service complaints.',
    href: '/complaints',
    color: '#1B4F9B',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    desc: 'Instant help in Sinhala & English. Coming soon.',
    href: '#',
    color: '#C5942A',
    badge: 'Soon',
  },
];

const FEATURES = [
  { icon: '⚡', title: 'Fast', desc: 'Complete transactions in minutes, not hours.' },
  { icon: '🔒', title: 'Secure', desc: 'Your data protected with modern standards.' },
  { icon: '📱', title: 'Mobile', desc: 'Access anywhere, any device, any time.' },
];

/* ─── Decorative lotus SVG ─── */
const Lotus = ({ size = 48, color = '#C5942A', opacity = 0.18 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
    <ellipse cx="32" cy="48" rx="6" ry="16" fill={color} opacity={opacity} transform="rotate(0 32 32)" />
    <ellipse cx="32" cy="48" rx="6" ry="16" fill={color} opacity={opacity} transform="rotate(45 32 32)" />
    <ellipse cx="32" cy="48" rx="6" ry="16" fill={color} opacity={opacity} transform="rotate(90 32 32)" />
    <ellipse cx="32" cy="48" rx="6" ry="16" fill={color} opacity={opacity} transform="rotate(135 32 32)" />
    <ellipse cx="32" cy="48" rx="6" ry="16" fill={color} opacity={opacity} transform="rotate(180 32 32)" />
    <ellipse cx="32" cy="48" rx="6" ry="16" fill={color} opacity={opacity} transform="rotate(225 32 32)" />
    <ellipse cx="32" cy="48" rx="6" ry="16" fill={color} opacity={opacity} transform="rotate(270 32 32)" />
    <ellipse cx="32" cy="48" rx="6" ry="16" fill={color} opacity={opacity} transform="rotate(315 32 32)" />
    <circle cx="32" cy="32" r="6" fill={color} opacity={opacity * 2} />
  </svg>
);

/* ─── Animated counter ─── */
const Counter = ({ end, suffix = '' }) => {
  const [val, setVal] = useState(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / 50;
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(id);
  }, [visible, end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ═══════════════════════════════════════════════ COMPONENT ═══ */
const Home = () => {
  const { isAuthenticated, user } = useAuth();

  /* Scroll progress bar */
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:   #0D2645;
          --navy2:  #1B4F9B;
          --gold:   #C5942A;
          --gold2:  #F0C060;
          --cream:  #FAF7F2;
          --slate:  #4A5568;
          --white:  #FFFFFF;
          --radius: 16px;
          --shadow: 0 8px 32px rgba(13,38,69,0.12);
          --shadow-lg: 0 16px 48px rgba(13,38,69,0.18);
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--navy);
        }

        .cl-display { font-family: 'Playfair Display', serif; }

        /* Scroll bar */
        .cl-progress {
          position: fixed; top: 0; left: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold2));
          z-index: 9999; transition: width 0.1s linear;
        }

        /* Hero */
        .cl-hero {
          position: relative; overflow: hidden;
          background: 
            linear-gradient(135deg, rgba(13, 38, 69, 0.3) 0%, rgba(26, 58, 110, 0.3) 60%, rgba(13, 38, 69, 0.4) 100%),
            url('/j.jpg') center/cover no-repeat;
          min-height: 92vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 80px 24px 120px;
        }
        .cl-hero-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: linear-gradient(var(--white) 1px, transparent 1px),
                            linear-gradient(90deg, var(--white) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .cl-hero-glow {
          position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;
        }
        .cl-hero-glow-1 {
          width: 500px; height: 500px; background: rgba(197,148,42,0.18);
          top: -100px; right: -80px;
        }
        .cl-hero-glow-2 {
          width: 400px; height: 400px; background: rgba(27,79,155,0.35);
          bottom: -80px; left: -60px;
        }
        .cl-flag-stripe {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #8B0000 0%, #8B0000 33%, #F90 33%, #F90 66%, #006400 66%, #006400 100%);
        }

        .cl-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(197,148,42,0.5); border-radius: 100px;
          padding: 6px 18px; color: var(--gold2); font-size: 0.8rem; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 24px;
          backdrop-filter: blur(8px); background: rgba(197,148,42,0.08);
        }
        .cl-badge-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--gold);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }

        .cl-hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800; line-height: 1.05;
          color: var(--white); text-align: center; margin-bottom: 10px;
        }
        .cl-hero-title span {
          background: linear-gradient(135deg, var(--gold), var(--gold2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cl-hero-sub {
          font-family: 'DM Sans', sans-serif; font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-weight: 300; color: rgba(255,255,255,0.72); text-align: center;
          max-width: 560px; margin: 0 auto 40px; line-height: 1.7;
        }
        .cl-hero-cta { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        .cl-btn-primary {
          background: linear-gradient(135deg, var(--gold), var(--gold2));
          color: var(--navy); font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.95rem; letter-spacing: 0.02em;
          padding: 14px 32px; border-radius: 100px; border: none; cursor: pointer;
          text-decoration: none; display: inline-block;
          box-shadow: 0 4px 20px rgba(197,148,42,0.4);
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
        }
        .cl-btn-primary:hover {
          transform: translateY(-2px); filter: brightness(1.08);
          box-shadow: 0 8px 28px rgba(197,148,42,0.5);
        }
        .cl-btn-outline {
          background: transparent; color: var(--white);
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.95rem;
          padding: 14px 32px; border-radius: 100px;
          border: 1.5px solid rgba(255,255,255,0.35); cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .cl-btn-outline:hover {
          background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.7);
          transform: translateY(-2px);
        }

        /* Wave divider */
        .cl-wave { display: block; width: 100%; overflow: hidden; line-height: 0; }

        /* Stats bar */
        .cl-stats {
          background: var(--white);
          border-bottom: 1px solid rgba(13,38,69,0.07);
          padding: 32px 24px;
        }
        .cl-stats-inner {
          max-width: 900px; margin: 0 auto;
          display: flex; gap: 0; justify-content: space-around; flex-wrap: wrap;
        }
        .cl-stat {
          text-align: center; padding: 12px 24px; flex: 1; min-width: 140px;
          border-right: 1px solid rgba(13,38,69,0.1);
        }
        .cl-stat:last-child { border-right: none; }
        .cl-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 700; color: var(--navy2);
        }
        .cl-stat-lbl { font-size: 0.8rem; color: var(--slate); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 4px; }

        /* Section */
        .cl-section { padding: 96px 24px; }
        .cl-section-cream { background: var(--cream); }
        .cl-section-white { background: var(--white); }
        .cl-section-navy { background: var(--navy); }

        .cl-section-label {
          display: inline-block; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 12px;
        }
        .cl-section-title {
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700; line-height: 1.18; color: var(--navy);
        }
        .cl-section-title-light { color: var(--white); }

        /* Services grid */
        .cl-services-grid {
          max-width: 1100px; margin: 60px auto 0;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;
        }
        .cl-card {
          background: var(--white); border-radius: var(--radius);
          padding: 36px 28px; border: 1px solid rgba(13,38,69,0.07);
          box-shadow: var(--shadow); transition: transform 0.3s, box-shadow 0.3s;
          position: relative; overflow: hidden; text-decoration: none; display: block;
        }
        .cl-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
        .cl-card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--navy2), var(--gold));
        }
        .cl-card-icon {
          font-size: 2.4rem; margin-bottom: 18px; display: block;
        }
        .cl-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: var(--navy); margin-bottom: 10px;
        }
        .cl-card-desc { font-size: 0.9rem; color: var(--slate); line-height: 1.65; }
        .cl-card-badge {
          position: absolute; top: 16px; right: 16px;
          background: var(--gold); color: var(--white);
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 100px;
        }
        .cl-card-arrow {
          margin-top: 20px; font-size: 0.85rem; font-weight: 600;
          color: var(--navy2); display: flex; align-items: center; gap: 6px;
          transition: gap 0.2s;
        }
        .cl-card:hover .cl-card-arrow { gap: 12px; }

        /* How it works */
        .cl-steps {
          max-width: 900px; margin: 60px auto 0;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px;
          position: relative;
        }
        .cl-step { text-align: center; position: relative; }
        .cl-step-num {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, var(--navy2), #2563EB);
          color: var(--white); font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; box-shadow: 0 4px 20px rgba(27,79,155,0.3);
        }
        .cl-step-title {
          font-family: 'Playfair Display', serif; font-size: 1.1rem;
          font-weight: 700; color: var(--navy); margin-bottom: 10px;
        }
        .cl-step-desc { font-size: 0.88rem; color: var(--slate); line-height: 1.6; }

        /* Features */
        .cl-features {
          max-width: 900px; margin: 60px auto 0;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px;
        }
        .cl-feat {
          display: flex; flex-direction: column; align-items: flex-start; gap: 14px;
          padding: 32px 24px; border-radius: var(--radius);
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04); transition: background 0.3s;
        }
        .cl-feat:hover { background: rgba(255,255,255,0.08); }
        .cl-feat-icon {
          font-size: 2rem; background: rgba(197,148,42,0.15);
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .cl-feat-title {
          font-family: 'Playfair Display', serif; font-size: 1.15rem;
          font-weight: 700; color: var(--white);
        }
        .cl-feat-desc { font-size: 0.88rem; color: rgba(255,255,255,0.6); line-height: 1.65; }

        /* Welcome banner */
        .cl-welcome {
          max-width: 900px; margin: 0 auto;
          background: linear-gradient(135deg, #EBF4FF 0%, #FFF8ED 100%);
          border: 1px solid rgba(27,79,155,0.15);
          border-radius: var(--radius); padding: 48px;
          display: flex; flex-direction: column; gap: 20px;
        }
        .cl-welcome-role {
          display: inline-block;
          background: var(--navy2); color: var(--white);
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 14px; border-radius: 100px; margin-bottom: 4px;
        }
        .cl-welcome-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700; color: var(--navy);
        }

        /* CTA strip */
        .cl-cta-strip {
          background: linear-gradient(135deg, var(--navy2), var(--navy));
          padding: 72px 24px; text-align: center;
        }

        /* Footer note */
        .cl-footer-note {
          text-align: center; padding: 24px;
          font-size: 0.78rem; color: var(--slate);
          border-top: 1px solid rgba(13,38,69,0.08);
        }

        @media (max-width: 640px) {
          .cl-stat { min-width: 100px; padding: 12px 12px; }
          .cl-stat-num { font-size: 1.7rem; }
          .cl-welcome { padding: 28px 20px; }
        }
      `}</style>

      {/* Scroll progress */}
      <div className="cl-progress" style={{ width: `${scrollPct}%` }} />

      {/* ══════════════ HERO ══════════════ */}
      <section className="cl-hero">
        <div className="cl-flag-stripe" />
        <div className="cl-hero-grid" />
        <div className="cl-hero-glow cl-hero-glow-1" />
        <div className="cl-hero-glow cl-hero-glow-2" />

        {/* Decorative lotus motifs */}
        <div style={{ position: 'absolute', top: 60, left: 40, opacity: 0.4 }}>
          <Lotus size={80} color="#C5942A" opacity={0.3} />
        </div>
        <div style={{ position: 'absolute', bottom: 80, right: 60, opacity: 0.3 }}>
          <Lotus size={60} color="#C5942A" opacity={0.25} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="cl-badge">
            <span className="cl-badge-dot" />
            Sri Lanka's Digital Government Portal
          </div>

          <h1 className="cl-display cl-hero-title">
            Civic<span>Link</span> LK
          </h1>

          <p className="cl-hero-sub">
            Seamlessly access government services — appointments, certificates,
            complaints, and more — all in one secure place.
          </p>

          {!isAuthenticated && (
            <div className="cl-hero-cta">
              <Link to="/register" className="cl-btn-primary">Get Started Free</Link>
              <Link to="/login" className="cl-btn-outline">Sign In</Link>
            </div>
          )}

          {isAuthenticated && (
            <Link
              to={user?.role === 'admin' ? '/admin-dashboard' : '/citizen-dashboard'}
              className="cl-btn-primary"
            >
              Go to Dashboard →
            </Link>
          )}
        </div>

        {/* Arrow bounce */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', zIndex: 2,
          animation: 'bounce 2s ease-in-out infinite',
        }}>
          ↓
          <style>{`@keyframes bounce {
            0%,100% { transform: translateX(-50%) translateY(0); }
            50%      { transform: translateX(-50%) translateY(8px); }
          }`}</style>
        </div>
      </section>

      {/* Wave */}
      <svg className="cl-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ marginTop: -2, background: 'var(--cream)' }}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#0D2645" />
      </svg>

      {/* ══════════════ STATS ══════════════ */}
      <div className="cl-stats cl-section-white">
        <div className="cl-stats-inner">
          {[
            { end: 250000, suffix: '+', label: 'Citizens Served' },
            { end: 25,     suffix: '',  label: 'Districts Covered' },
            { end: 98,     suffix: '%', label: 'Satisfaction Rate' },
            { end: 3,      suffix: 'min', label: 'Avg. Request Time' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="cl-stat">
              <div className="cl-stat-num cl-display">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="cl-stat-lbl">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="cl-section cl-section-cream">
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="cl-section-label">What We Offer</span>
            <h2 className="cl-display cl-section-title">Government Services,<br />Simplified.</h2>
          </Reveal>
          <div className="cl-services-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <Link to={s.href} className="cl-card">
                  <div className="cl-card-accent" />
                  {s.badge && <span className="cl-card-badge">{s.badge}</span>}
                  <span className="cl-card-icon">{s.icon}</span>
                  <div className="cl-card-title">{s.title}</div>
                  <p className="cl-card-desc">{s.desc}</p>
                  {!s.badge && <div className="cl-card-arrow">Explore →</div>}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="cl-section cl-section-white">
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="cl-section-label">Simple Process</span>
            <h2 className="cl-display cl-section-title">Three Steps to Done</h2>
          </Reveal>
          <div className="cl-steps">
            {[
              { n: '01', title: 'Create Account', desc: 'Register with your National ID in under 2 minutes.' },
              { n: '02', title: 'Choose Service', desc: 'Browse and select the government service you need.' },
              { n: '03', title: 'Track & Receive', desc: 'Monitor your request and receive updates in real-time.' },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="cl-step">
                  <div className="cl-step-num">{step.n}</div>
                  <div className="cl-step-title">{step.title}</div>
                  <p className="cl-step-desc">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DASHBOARD (auth only) ══════════════ */}
      {isAuthenticated && (
        <section className="cl-section cl-section-cream">
          <Reveal>
            <div className="cl-welcome" style={{ maxWidth: 900, margin: '0 auto' }}>
              <div>
                <span className="cl-welcome-role">{user?.role}</span>
                <h2 className="cl-display cl-welcome-title">
                  Welcome back, {user?.name} 👋
                </h2>
              </div>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7 }}>
                Your portal is ready. Jump straight to your dashboard to manage requests,
                track applications, and stay up to date.
              </p>
              <div>
                <Link
                  to={user?.role === 'admin' ? '/admin-dashboard' : '/citizen-dashboard'}
                  className="cl-btn-primary"
                  style={{ fontSize: '0.95rem' }}
                >
                  Open {user?.role === 'admin' ? 'Admin' : 'Citizen'} Dashboard →
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ══════════════ WHY CIVICLINK ══════════════ */}
      <section className="cl-section cl-section-navy">
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <span className="cl-section-label" style={{ color: 'var(--gold2)' }}>Our Promise</span>
            <h2 className="cl-display cl-section-title cl-section-title-light">
              Built for Every Sri Lankan
            </h2>
          </Reveal>
          <div className="cl-features">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="cl-feat">
                  <div className="cl-feat-icon">{f.icon}</div>
                  <div className="cl-feat-title">{f.title}</div>
                  <p className="cl-feat-desc">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA STRIP ══════════════ */}
      {!isAuthenticated && (
        <section className="cl-cta-strip">
          <Reveal>
            <h2 className="cl-display" style={{ color: 'var(--white)', fontSize: 'clamp(1.6rem,3vw,2.6rem)', marginBottom: 12 }}>
              Ready to get started?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 32, fontSize: '1.05rem' }}>
              Join thousands of citizens already using CivicLink LK.
            </p>
            <Link to="/register" className="cl-btn-primary" style={{ fontSize: '1rem', padding: '16px 40px' }}>
              Create Free Account
            </Link>
          </Reveal>
        </section>
      )}

      {/* ══════════════ FOOTER NOTE ══════════════ */}
      <div className="cl-footer-note">
        © {new Date().getFullYear()} CivicLink LK · Official Digital Services Portal · Government of Sri Lanka
      </div>
    </>
  );
};

export default Home;
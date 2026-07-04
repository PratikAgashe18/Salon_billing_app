import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './Header.css';

export default function Header({ theme, toggleTheme }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const headerRef = useRef(null);

  useEffect(() => {
    // Clock tick
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // GSAP entrance animation
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <header className="top-header no-print" ref={headerRef}>
      <div className="brand-container">
        <motion.div 
          className="brand-logo"
          whileHover={{ rotate: 10, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          V&B
        </motion.div>
        <div>
          <h1 className="brand-title">Velvet &amp; Bloom</h1>
          <p className="brand-tagline">Salon Billing Desk</p>
        </div>
      </div>
      <div className="header-right">
        <motion.button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </motion.button>
        <div className="date-meta">
          <div>Bill Date: <b>{formattedDate}</b></div>
          <div className="time-tick">{formattedTime}</div>
        </div>
      </div>
    </header>
  );
}


import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

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
    <header className="px-[5vw] pt-6 pb-5 flex items-center justify-between gap-4 flex-wrap border-b border-line bg-cream/60 backdrop-blur-md top-0 z-[1000] top-header no-print" ref={headerRef}>
      <div className="flex items-center gap-[14px]">
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-plum to-plum-dark flex items-center justify-center text-rose-gold-light font-serif text-xl font-bold shadow-[0_6px_20px_rgba(107,39,55,0.3)] cursor-pointer shrink-0"
          whileHover={{ rotate: 10, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          V&B
        </motion.div>
        <div>
          <h1 className="font-serif font-bold text-[clamp(22px,3vw,30px)] m-0 tracking-[0.3px] text-ink leading-[1.1]">Velvet &amp; Bloom</h1>
          <p className="mt-1 text-[11px] tracking-[2.5px] uppercase text-plum font-semibold opacity-80">Salon Billing Desk</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <motion.button
          className="bg-blush border border-line text-ink text-lg w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:bg-rose-gold-light hover:border-rose-gold"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </motion.button>
        <div className="text-right text-[13.5px] text-[#7A6570] leading-[1.5]">
          <div>Bill Date: <b className="text-ink">{formattedDate}</b></div>
          <div className="text-xs font-medium opacity-80">{formattedTime}</div>
        </div>
      </div>
    </header>
  );
}


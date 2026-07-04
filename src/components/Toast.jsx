import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

export default function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          className="toast-container"
          initial={{ opacity: 0, y: 30, scale: 0.9, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        >
          <div className="toast-content">
            <span className="toast-icon">✨</span>
            <span className="toast-text">{toast.message}</span>
          </div>
          <motion.div
            className="toast-progress"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 2.2, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

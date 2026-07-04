import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          className="fixed bottom-7 left-1/2 bg-ink text-white py-3 px-6 rounded-full text-[13.5px] font-medium shadow-[0_10px_30px_rgba(46,26,36,0.4)] z-[9999] flex flex-col items-center overflow-hidden border border-white/15 toast-container no-print"
          initial={{ opacity: 0, y: 30, scale: 0.9, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">✨</span>
            <span className="toast-text">{toast.message}</span>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-rose-gold origin-left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 2.2, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

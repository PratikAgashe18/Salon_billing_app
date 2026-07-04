import React from 'react';
import { motion } from 'framer-motion';
import './ActionButtons.css';

export default function ActionButtons({ onEmail, onDownload, onPrint, onClear, isCartEmpty }) {
  return (
    <div className="action-buttons-container no-print">
      <motion.button
        className="action-btn action-btn-primary"
        onClick={onEmail}
        disabled={isCartEmpty}
        whileHover={!isCartEmpty ? { scale: 1.02, boxShadow: '0 8px 24px rgba(107, 39, 55, 0.3)' } : {}}
        whileTap={!isCartEmpty ? { scale: 0.98 } : {}}
      >
        ✉ Email Bill via Gmail (PDF)
      </motion.button>

      <div className="action-buttons-row">
        <motion.button
          className="action-btn action-btn-secondary"
          onClick={onDownload}
          disabled={isCartEmpty}
          whileHover={!isCartEmpty ? { scale: 1.03 } : {}}
          whileTap={!isCartEmpty ? { scale: 0.97 } : {}}
        >
          ⬇ Download PDF
        </motion.button>
        <motion.button
          className="action-btn action-btn-secondary"
          onClick={onPrint}
          disabled={isCartEmpty}
          whileHover={!isCartEmpty ? { scale: 1.03 } : {}}
          whileTap={!isCartEmpty ? { scale: 0.97 } : {}}
        >
          🖨 Print Bill
        </motion.button>
      </div>

      <motion.button
        className="action-btn action-btn-ghost"
        onClick={onClear}
        disabled={isCartEmpty}
        whileHover={!isCartEmpty ? { backgroundColor: 'rgba(176, 85, 78, 0.08)', borderColor: '#B0554E', color: '#B0554E' } : {}}
        whileTap={!isCartEmpty ? { scale: 0.98 } : {}}
      >
        Clear Bill
      </motion.button>
    </div>
  );
}

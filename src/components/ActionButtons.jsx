import React from 'react';
import { motion } from 'framer-motion';

export default function ActionButtons({ onEmail, onDownload, onPrint, onClear, isCartEmpty }) {
  return (
    <div className="px-[22px] pb-[22px] flex flex-col gap-2.5 action-buttons-container no-print">
      <motion.button
        className="flex-1 py-[13px] px-[14px] rounded-[10px] border-none font-semibold text-[13.5px] cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-45 disabled:cursor-not-allowed bg-plum text-white shadow-[0_6px_18px_rgba(107,39,55,0.2)] hover:enabled:bg-plum-dark action-btn action-btn-primary"
        onClick={onEmail}
        disabled={isCartEmpty}
        whileHover={!isCartEmpty ? { scale: 1.02, boxShadow: '0 8px 24px rgba(107, 39, 55, 0.3)' } : {}}
        whileTap={!isCartEmpty ? { scale: 0.98 } : {}}
      >
        ✉ Email Bill via Gmail (PDF)
      </motion.button>

      <div className="flex gap-2.5 action-buttons-row">
        <motion.button
          className="flex-1 py-[13px] px-[14px] rounded-[10px] border-none font-semibold text-[13.5px] cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-45 disabled:cursor-not-allowed bg-blush text-plum-dark hover:enabled:bg-rose-gold-light action-btn action-btn-secondary"
          onClick={onDownload}
          disabled={isCartEmpty}
          whileHover={!isCartEmpty ? { scale: 1.03 } : {}}
          whileTap={!isCartEmpty ? { scale: 0.97 } : {}}
        >
          ⬇ Download PDF
        </motion.button>
        <motion.button
          className="flex-1 py-[13px] px-[14px] rounded-[10px] border-none font-semibold text-[13.5px] cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-45 disabled:cursor-not-allowed bg-blush text-plum-dark hover:enabled:bg-rose-gold-light action-btn action-btn-secondary"
          onClick={onPrint}
          disabled={isCartEmpty}
          whileHover={!isCartEmpty ? { scale: 1.03 } : {}}
          whileTap={!isCartEmpty ? { scale: 0.97 } : {}}
        >
          🖨 Print Bill
        </motion.button>
      </div>

      <motion.button
        className="flex-1 py-[13px] px-[14px] rounded-[10px] font-semibold text-[13.5px] cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-45 disabled:cursor-not-allowed bg-transparent text-[#9C8890] border border-line action-btn action-btn-ghost"
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

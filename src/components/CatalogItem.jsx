import React from 'react';
import { motion } from 'framer-motion';

export default function CatalogItem({ item, onAdd, type }) {
  return (
    <motion.div
      className="flex items-center gap-3 py-3 px-4 border border-line rounded-xl bg-cream transition-colors duration-200 hover:border-rose-gold catalog-item-card"
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(46, 26, 36, 0.08)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-auto min-w-0">
        <div className="font-semibold text-[14.5px] text-ink whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</div>
        <div className="text-xs text-[#8A7A82] mt-0.5">{item.meta}</div>
      </div>
      <div className="font-semibold text-plum text-[14.5px] whitespace-nowrap min-w-[68px] text-right shrink-0">₹{item.price}</div>
      <motion.button
        className="border-none bg-plum text-white w-8 h-8 rounded-full text-lg leading-none font-medium cursor-pointer shrink-0 flex items-center justify-center shadow-[0_4px_12px_rgba(107,39,55,0.25)] hover:bg-plum-dark"
        onClick={() => onAdd(item, type)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        title="Add to bill"
      >
        +
      </motion.button>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function BillLineItem({ index, item, onChangeQty, onRemove }) {
  return (
    <motion.div
      className="grid grid-cols-[1fr_88px] items-start gap-x-2 text-[13px] py-2 tabular-nums border-b border-dashed border-[rgba(200,155,123,0.15)] last:border-b-0 receipt-line-item"
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-ink flex flex-wrap items-center gap-y-1">
        <span className="font-medium">{item.name}</span>
        <span className={`text-[9px] font-bold tracking-[0.5px] uppercase ml-1.5 py-0.5 px-1 rounded-sm leading-none ${item.type === 'service' ? 'text-sage bg-sage/10' : 'text-plum bg-plum/8'}`}>{item.type}</span>
        <span className="inline-flex items-center gap-1.5 ml-2">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => onChangeQty(index, -1)}
            className="border border-line bg-white w-5 h-5 rounded font-bold text-xs leading-none flex items-center justify-center cursor-pointer p-0 text-plum print:hidden hover:bg-blush hover:border-rose-gold"
            aria-label="Decrease quantity"
          >
            −
          </motion.button>
          <span className="font-semibold text-[12.5px] min-w-[14px] text-center before:content-[''] print:before:content-['x_']">{item.qty}</span>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => onChangeQty(index, 1)}
            className="border border-line bg-white w-5 h-5 rounded font-bold text-xs leading-none flex items-center justify-center cursor-pointer p-0 text-plum print:hidden hover:bg-blush hover:border-rose-gold"
            aria-label="Increase quantity"
          >
            +
          </motion.button>
        </span>
        <motion.button
          className="border-none bg-none text-[#B0554E] cursor-pointer text-xs ml-1.5 py-0.5 px-1 flex items-center justify-center print:hidden hover:opacity-80"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(index)}
          aria-label="Remove item"
        >
          ✕
        </motion.button>
      </div>
      <div className="text-right font-semibold whitespace-nowrap">₹{(item.price * item.qty).toFixed(2)}</div>
    </motion.div>
  );
}

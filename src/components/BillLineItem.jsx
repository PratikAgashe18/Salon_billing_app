import React from 'react';
import { motion } from 'framer-motion';
import './BillLineItem.css';

export default function BillLineItem({ index, item, onChangeQty, onRemove }) {
  return (
    <motion.div
      className="receipt-line-item"
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="receipt-line-details">
        <span className="l-name-txt">{item.name}</span>
        <span className={`l-tag ${item.type}`}>{item.type}</span>
        <span className="qty-controls">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => onChangeQty(index, -1)}
            aria-label="Decrease quantity"
          >
            −
          </motion.button>
          <span className="qty-val">{item.qty}</span>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => onChangeQty(index, 1)}
            aria-label="Increase quantity"
          >
            +
          </motion.button>
        </span>
        <motion.button
          className="remove-btn"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(index)}
          aria-label="Remove item"
        >
          ✕
        </motion.button>
      </div>
      <div className="l-price-val">₹{(item.price * item.qty).toFixed(2)}</div>
    </motion.div>
  );
}

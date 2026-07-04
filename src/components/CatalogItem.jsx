import React from 'react';
import { motion } from 'framer-motion';
import './CatalogItem.css';

export default function CatalogItem({ item, onAdd, type }) {
  return (
    <motion.div
      className="catalog-item-card"
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(46, 26, 36, 0.08)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="catalog-item-info">
        <div className="catalog-item-name">{item.name}</div>
        <div className="catalog-item-meta">{item.meta}</div>
      </div>
      <div className="catalog-item-price">₹{item.price}</div>
      <motion.button
        className="catalog-item-add-btn"
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

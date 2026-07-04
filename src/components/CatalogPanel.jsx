import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, PRODUCTS } from '../data/catalog';
import CatalogItem from './CatalogItem';
import CustomItemForm from './CustomItemForm';
import './CatalogPanel.css';

export default function CatalogPanel({ onAddItem, onAddCustomItem, showToast }) {
  const [currentTab, setCurrentTab] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');

  const list = currentTab === 'services' ? SERVICES : PRODUCTS;
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <section className="catalog-panel glass-panel">
      <div className="catalog-header">
        <h2>Add to Bill</h2>
      </div>

      <div className="catalog-navigation">
        <div className="tabs-container">
          <button
            className={`tab-btn ${currentTab === 'services' ? 'active' : ''}`}
            onClick={() => {
              setCurrentTab('services');
              setSearchQuery('');
            }}
          >
            {currentTab === 'services' && (
              <motion.div
                layoutId="activeTabPill"
                className="active-pill"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="tab-text">Services</span>
          </button>
          <button
            className={`tab-btn ${currentTab === 'products' ? 'active' : ''}`}
            onClick={() => {
              setCurrentTab('products');
              setSearchQuery('');
            }}
          >
            {currentTab === 'products' && (
              <motion.div
                layoutId="activeTabPill"
                className="active-pill"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="tab-text">Products</span>
          </button>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services or products…"
        />
      </div>

      <div className="catalog-list-wrapper">
        <motion.div 
          className="catalog-list"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredList.length === 0 ? (
              <motion.div
                key="empty-catalog"
                className="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                No items match your search.
              </motion.div>
            ) : (
              filteredList.map((item) => (
                <CatalogItem
                  key={item.id}
                  item={item}
                  type={currentTab === 'services' ? 'service' : 'product'}
                  onAdd={(item, type) => {
                    onAddItem(item, type);
                    showToast(`${item.name} added`);
                  }}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <CustomItemForm onAddCustom={onAddCustomItem} showToast={showToast} />
    </section>
  );
}

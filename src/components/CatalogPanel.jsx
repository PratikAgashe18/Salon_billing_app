import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, PRODUCTS } from '../data/catalog';
import CatalogItem from './CatalogItem';
import CustomItemForm from './CustomItemForm';

export default function CatalogPanel({ onAddItem, onAddCustomItem, showToast }) {
  const [currentTab, setCurrentTab] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');

  const list = currentTab === 'services' ? SERVICES : PRODUCTS;
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <section className="flex flex-col catalog-panel glass-panel">
      <div className="flex items-center justify-between px-6 pt-6 pb-0">
        <h2 className="font-serif text-[22px] m-0 text-ink">Add to Bill</h2>
      </div>

      <div className="px-6 pt-4 pb-0">
        <div className="flex gap-1 bg-blush p-1 rounded-full relative w-max">
          <button
            className={`border-none bg-transparent py-2 px-5 rounded-full font-semibold text-[13.5px] tracking-[0.3px] text-plum cursor-pointer relative transition-colors duration-300 flex items-center justify-center ${currentTab === 'services' ? 'text-white' : ''}`}
            onClick={() => {
              setCurrentTab('services');
              setSearchQuery('');
            }}
          >
            {currentTab === 'services' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-plum rounded-full z-[1]"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-[2]">Services</span>
          </button>
          <button
            className={`border-none bg-transparent py-2 px-5 rounded-full font-semibold text-[13.5px] tracking-[0.3px] text-plum cursor-pointer relative transition-colors duration-300 flex items-center justify-center ${currentTab === 'products' ? 'text-white' : ''}`}
            onClick={() => {
              setCurrentTab('products');
              setSearchQuery('');
            }}
          >
            {currentTab === 'products' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-plum rounded-full z-[1]"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-[2]">Products</span>
          </button>
        </div>
      </div>

      <div className="px-6 pt-4 pb-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-4 rounded-[10px] border border-line text-sm bg-cream transition-all duration-200 focus:border-plum focus:bg-white focus:shadow-[0_0_0_3px_rgba(107,39,55,0.12)] focus:outline-none"
          placeholder="Search services or products…"
        />
      </div>

      <div className="px-6 pt-4 pb-5 grow">
        <motion.div 
          className="flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredList.length === 0 ? (
              <motion.div
                key="empty-catalog"
                className="text-center py-8 px-2.5 text-[#9C8890] text-[13px] leading-[1.6]"
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

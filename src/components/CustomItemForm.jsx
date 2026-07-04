import React, { useState } from 'react';

export default function CustomItemForm({ onAddCustom, showToast }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('service');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const floatPrice = parseFloat(price);

    if (!cleanName || isNaN(floatPrice) || floatPrice < 0) {
      showToast('Enter a valid item name and price');
      return;
    }

    onAddCustom(cleanName, floatPrice, type);
    setName('');
    setPrice('');
    showToast('Custom item added');
  };

  return (
    <div className="mx-[22px] mb-[22px] p-[18px] border border-dashed border-rose-gold rounded-xl bg-blush shadow-[inset_0_2px_8px_rgba(46,26,36,0.05)] custom-item-form-container">
      <h3 className="m-0 mb-3 text-xs font-bold uppercase tracking-[1.5px] text-plum">Add Custom Item</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="grow-[2] shrink basis-[140px] py-2.5 px-[14px] rounded-lg border border-line text-[13.5px] bg-white transition-all duration-200 focus:border-plum focus:shadow-[0_0_0_3px_rgba(107,39,55,0.15)] focus:outline-none"
          placeholder="Item name"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="grow shrink basis-[80px] py-2.5 px-[14px] rounded-lg border border-line text-[13.5px] bg-white transition-all duration-200 focus:border-plum focus:shadow-[0_0_0_3px_rgba(107,39,55,0.15)] focus:outline-none"
          placeholder="Price ₹"
          min="0"
          step="1"
          required
        />
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="py-2.5 px-[14px] rounded-lg border border-line text-[13.5px] bg-white text-ink cursor-pointer transition-colors duration-200 focus:border-plum focus:outline-none"
        >
          <option value="service" className="bg-white text-ink">Service</option>
          <option value="product" className="bg-white text-ink">Product</option>
        </select>
        <button 
          type="submit"
          className="py-2.5 px-5 border-none rounded-lg bg-plum text-white font-semibold text-[13.5px] cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(107,39,55,0.2)] hover:bg-plum-dark active:scale-96"
        >
          Add
        </button>
      </form>
    </div>
  );
}

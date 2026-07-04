import React, { useState } from 'react';
import './CustomItemForm.css';

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
    <div className="custom-item-form-container">
      <h3>Add Custom Item</h3>
      <form onSubmit={handleSubmit} className="custom-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price ₹"
          min="0"
          step="1"
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="service">Service</option>
          <option value="product">Product</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

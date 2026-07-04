import { useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [discountPct, setDiscountPct] = useState(0);
  const [taxPct, setTaxPct] = useState(5);
  const [customCounter, setCustomCounter] = useState(1);

  const addItem = (item, type) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id && c.type === type);
      if (existing) {
        return prevCart.map((c) =>
          c.id === item.id && c.type === type ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prevCart, { ...item, type, qty: 1 }];
    });
  };

  const addCustomItem = (name, price, type) => {
    const id = `c${customCounter}`;
    setCustomCounter((prev) => prev + 1);
    addItem({ id, name, price }, type);
  };

  const changeQty = (idx, delta) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[idx] = { ...updated[idx], qty: updated[idx].qty + delta };
      if (updated[idx].qty <= 0) {
        updated.splice(idx, 1);
      }
      return updated;
    });
  };

  const removeItem = (idx) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== idx));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPct(0);
    setTaxPct(5);
  };

  // Computations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmt = subtotal * (discountPct / 100);
  const taxable = subtotal - discountAmt;
  const taxAmt = taxable * (taxPct / 100);
  const grandTotal = taxable + taxAmt;

  return {
    cart,
    discountPct,
    taxPct,
    setDiscountPct,
    setTaxPct,
    addItem,
    addCustomItem,
    changeQty,
    removeItem,
    clearCart,
    totals: {
      subtotal,
      discountAmt,
      taxAmt,
      grandTotal,
    },
  };
}

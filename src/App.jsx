import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import CatalogPanel from './components/CatalogPanel';
import BillPanel from './components/BillPanel';
import Toast from './components/Toast';
import { useCart } from './hooks/useCart';
import { useToast } from './hooks/useToast';
import { emailBill, downloadPdf, printBill } from './utils/actions';
import gsap from 'gsap';
import './App.css';

export default function App() {
  const {
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
    totals,
  } = useCart();

  const { toast, showToast } = useToast();

  // Customer states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Theme states
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Refs for GSAP
  const catalogRef = useRef(null);
  const billRef = useRef(null);

  useEffect(() => {
    // Staggered panel reveal timeline
    const tl = gsap.timeline();
    tl.fromTo(
      catalogRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '+=0.2'
    ).fromTo(
      billRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }, []);

  const handleClear = () => {
    if (cart.length === 0) return;
    if (window.confirm('Clear all items from the current bill?')) {
      clearCart();
      setCustomerName('');
      setCustomerPhone('');
      setCustomerEmail('');
      showToast('Bill cleared');
    }
  };

  return (
    <div className="app-container">
      {/* Moving Ambient Blur Orbs */}
      <div className="bg-ambient" />

      {/* Ticking header */}
      <Header theme={theme} toggleTheme={toggleTheme} />


      <main className="main-content">
        <div ref={catalogRef} style={{ opacity: 0 }}>
          <CatalogPanel
            onAddItem={addItem}
            onAddCustomItem={addCustomItem}
            showToast={showToast}
          />
        </div>

        <div ref={billRef} style={{ opacity: 0 }}>
          <BillPanel
            cart={cart}
            totals={totals}
            discountPct={discountPct}
            taxPct={taxPct}
            setDiscountPct={setDiscountPct}
            setTaxPct={setTaxPct}
            onChangeQty={changeQty}
            onRemoveItem={removeItem}
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            onEmail={() =>
              emailBill({
                cart,
                customerName,
                customerPhone,
                customerEmail,
                totals,
                discountPct,
                taxPct,
                showToast,
              })
            }
            onDownload={() =>
              downloadPdf({
                cart,
                customerName,
                customerPhone,
                totals,
                discountPct,
                taxPct,
                showToast,
              })
            }
            onPrint={() => printBill({ cart, showToast })}
            onClear={handleClear}
          />
        </div>
      </main>

      {/* Floating status Toast */}
      <Toast toast={toast} />
    </div>
  );
}

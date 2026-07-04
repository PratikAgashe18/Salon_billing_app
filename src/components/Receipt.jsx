import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BillLineItem from './BillLineItem';
import './Receipt.css';

export default function Receipt({
  cart,
  totals,
  discountPct,
  taxPct,
  setDiscountPct,
  setTaxPct,
  onChangeQty,
  onRemoveItem,
}) {
  const [displayGrandTotal, setDisplayGrandTotal] = useState(totals.grandTotal);

  // Smooth count-up animation for Grand Total
  useEffect(() => {
    let start = displayGrandTotal;
    const end = totals.grandTotal;
    if (start === end) return;

    const duration = 400; // milliseconds
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      setDisplayGrandTotal(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayGrandTotal(end);
      }
    };

    requestAnimationFrame(animate);
  }, [totals.grandTotal]);

  return (
    <div className="receipt-container">
      <div className="receipt-inner-wrapper">
        <div className="receipt-title">Velvet &amp; Bloom</div>
        <div className="receipt-sub">123 Blossom Street · Pune</div>
        <div className="dashed-line"></div>

        <div className="receipt-body">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div
                key="empty-receipt"
                className="empty-receipt-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No items yet.
                <br />
                Add services or products from the left to build the bill.
              </motion.div>
            ) : (
              cart.map((item, idx) => (
                <BillLineItem
                  key={`${item.id}-${item.type}`}
                  index={idx}
                  item={item}
                  onChangeQty={onChangeQty}
                  onRemove={onRemoveItem}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="dashed-line"></div>

        {/* Inputs */}
        <div className="receipt-adjust-row no-print">
          <span>Discount (%)</span>
          <input
            type="number"
            value={discountPct === 0 ? '' : discountPct}
            onChange={(e) => {
              const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
              setDiscountPct(val);
            }}
            min="0"
            max="100"
          />
        </div>
        <div className="receipt-adjust-row no-print">
          <span>Tax / GST (%)</span>
          <input
            type="number"
            value={taxPct === 0 ? '' : taxPct}
            onChange={(e) => {
              const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
              setTaxPct(val);
            }}
            min="0"
            max="100"
          />
        </div>

        {/* Totals displays (printed version or live view) */}
        <div className="print-only-adjustments print-show">
          <div className="receipt-totals-row">
            <span>Discount ({discountPct}%)</span>
            <span>−₹{totals.discountAmt.toFixed(2)}</span>
          </div>
          <div className="receipt-totals-row">
            <span>Tax ({taxPct}%)</span>
            <span>+₹{totals.taxAmt.toFixed(2)}</span>
          </div>
        </div>

        <div className="dashed-line"></div>

        {/* Final calculation block */}
        <div className="receipt-totals-block">
          <div className="receipt-totals-row">
            <span>Subtotal</span>
            <span>₹{totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="receipt-totals-row no-print">
            <span>Discount ({discountPct}%)</span>
            <span>−₹{totals.discountAmt.toFixed(2)}</span>
          </div>
          <div className="receipt-totals-row no-print">
            <span>Tax ({taxPct}%)</span>
            <span>+₹{totals.taxAmt.toFixed(2)}</span>
          </div>
          <div className="receipt-totals-row grand-total-row">
            <span>Grand Total</span>
            <span className="grand-price-animate">₹{displayGrandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="receipt-footer-stamp">
          Thank you for visiting us ✂ Please come again
        </div>
      </div>
    </div>
  );
}

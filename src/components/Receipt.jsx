import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BillLineItem from './BillLineItem';

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
    <div className="mx-[22px] mb-[22px] bg-cream rounded-xl relative overflow-hidden font-mono shadow-[0_4px_20px_rgba(46,26,36,0.08)] before:content-[''] before:absolute before:left-0 before:right-0 before:h-3 before:bg-[radial-gradient(circle_at_8px_6px,var(--white)_6px,transparent_7px)] before:bg-[length:16px_12px] before:bg-repeat-x before:z-[2] before:-top-[1px] after:content-[''] after:absolute after:left-0 after:right-0 after:h-3 after:bg-[radial-gradient(circle_at_8px_6px,var(--white)_6px,transparent_7px)] after:bg-[length:16px_12px] after:bg-repeat-x after:z-[2] after:-bottom-[1px] after:rotate-180 receipt-container">
      <div className="pt-6 px-5 pb-5 bg-white rounded-xl my-2 receipt-inner-wrapper">
        <div className="text-center font-serif font-bold text-[19px] tracking-[0.5px] text-plum-dark">Velvet &amp; Bloom</div>
        <div className="text-center text-[11px] text-[#8A7A82] mt-1 tracking-[1px] uppercase">123 Blossom Street · Pune</div>
        <div className="border-t border-dashed border-rose-gold my-3.5"></div>

        <div className="min-h-[80px]">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div
                key="empty-receipt"
                className="text-center py-[26px] px-2.5 text-[#9C8890] text-[12.5px] leading-[1.6]"
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

        <div className="border-t border-dashed border-rose-gold my-3.5"></div>

        {/* Inputs */}
        <div className="flex items-center justify-between gap-2 text-[13px] py-1.5 no-print">
          <span>Discount (%)</span>
          <input
            type="number"
            value={discountPct === 0 ? '' : discountPct}
            onChange={(e) => {
              const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
              setDiscountPct(val);
            }}
            className="w-16 py-1 px-1.5 rounded border border-line font-mono text-[13px] text-right bg-cream text-ink focus:border-plum focus:bg-white focus:outline-none"
            min="0"
            max="100"
          />
        </div>
        <div className="flex items-center justify-between gap-2 text-[13px] py-1.5 no-print">
          <span>Tax / GST (%)</span>
          <input
            type="number"
            value={taxPct === 0 ? '' : taxPct}
            onChange={(e) => {
              const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
              setTaxPct(val);
            }}
            className="w-16 py-1 px-1.5 rounded border border-line font-mono text-[13px] text-right bg-cream text-ink focus:border-plum focus:bg-white focus:outline-none"
            min="0"
            max="100"
          />
        </div>

        {/* Totals displays (printed version or live view) */}
        <div className="print:block hidden print-only-adjustments">
          <div className="grid grid-cols-[1fr_88px] gap-x-2 text-[13px] py-1 tabular-nums">
            <span>Discount ({discountPct}%)</span>
            <span className="text-right whitespace-nowrap">−₹{totals.discountAmt.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-[1fr_88px] gap-x-2 text-[13px] py-1 tabular-nums">
            <span>Tax ({taxPct}%)</span>
            <span className="text-right whitespace-nowrap">+₹{totals.taxAmt.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-rose-gold my-3.5"></div>

        {/* Final calculation block */}
        <div className="receipt-totals-block">
          <div className="grid grid-cols-[1fr_88px] gap-x-2 text-[13px] py-1 tabular-nums">
            <span>Subtotal</span>
            <span className="text-right whitespace-nowrap">₹{totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-[1fr_88px] gap-x-2 text-[13px] py-1 tabular-nums no-print">
            <span>Discount ({discountPct}%)</span>
            <span className="text-right whitespace-nowrap">−₹{totals.discountAmt.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-[1fr_88px] gap-x-2 text-[13px] py-1 tabular-nums no-print">
            <span>Tax ({taxPct}%)</span>
            <span className="text-right whitespace-nowrap">+₹{totals.taxAmt.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-[1fr_88px] gap-x-2 text-base font-bold text-plum-dark pt-2.5 border-t border-dashed border-rose-gold mt-2.5 grand-total-row">
            <span>Grand Total</span>
            <span className="text-[17px] text-plum text-right whitespace-nowrap grand-price-animate">₹{displayGrandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#9C8890] mt-[18px] tracking-[0.4px]">
          Thank you for visiting us ✂ Please come again
        </div>
      </div>
    </div>
  );
}

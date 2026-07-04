import React from 'react';
import Receipt from './Receipt';
import ActionButtons from './ActionButtons';

export default function BillPanel({
  cart,
  totals,
  discountPct,
  taxPct,
  setDiscountPct,
  setTaxPct,
  onChangeQty,
  onRemoveItem,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerEmail,
  setCustomerEmail,
  onEmail,
  onDownload,
  onPrint,
  onClear,
}) {
  const isCartEmpty = cart.length === 0;

  return (
    <section className="sticky top-24 bill-panel-wrapper">
      <div className="flex flex-col bill-panel glass-panel">
        {/* Customer Info Card */}
        <div className="p-6 customer-card-container no-print">
          <h2 className="font-serif text-[22px] m-0 mb-[18px] text-ink">Customer Details</h2>
          <div className="mb-3.5 input-field">
            <label htmlFor="custName" className="block text-[11px] font-bold tracking-[0.8px] uppercase text-[#8A7A82] mb-1.5">Customer Name</label>
            <input
              type="text"
              id="custName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full py-[11px] px-[14px] rounded-lg border border-line text-[13.5px] bg-cream text-ink transition-all duration-200 focus:border-plum focus:bg-white focus:outline-none"
              placeholder="e.g. Ananya Rao"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1 mb-0 input-field">
              <label htmlFor="custPhone" className="block text-[11px] font-bold tracking-[0.8px] uppercase text-[#8A7A82] mb-1.5">Phone</label>
              <input
                type="tel"
                id="custPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full py-[11px] px-[14px] rounded-lg border border-line text-[13.5px] bg-cream text-ink transition-all duration-200 focus:border-plum focus:bg-white focus:outline-none"
                placeholder="98765 43210"
              />
            </div>
            <div className="flex-1 mb-0 input-field">
              <label htmlFor="custEmail" className="block text-[11px] font-bold tracking-[0.8px] uppercase text-[#8A7A82] mb-1.5">Email</label>
              <input
                type="email"
                id="custEmail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full py-[11px] px-[14px] rounded-lg border border-line text-[13.5px] bg-cream text-ink transition-all duration-200 focus:border-plum focus:bg-white focus:outline-none"
                placeholder="customer@email.com"
              />
            </div>
          </div>
        </div>

        {/* Live / Print Receipt */}
        <Receipt
          cart={cart}
          totals={totals}
          discountPct={discountPct}
          taxPct={taxPct}
          setDiscountPct={setDiscountPct}
          setTaxPct={setTaxPct}
          onChangeQty={onChangeQty}
          onRemoveItem={onRemoveItem}
        />

        {/* Action Buttons */}
        <ActionButtons
          onEmail={onEmail}
          onDownload={onDownload}
          onPrint={onPrint}
          onClear={onClear}
          isCartEmpty={isCartEmpty}
        />
      </div>
    </section>
  );
}

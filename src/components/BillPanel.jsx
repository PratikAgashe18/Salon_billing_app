import React from 'react';
import Receipt from './Receipt';
import ActionButtons from './ActionButtons';
import './BillPanel.css';

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
    <section className="bill-panel-wrapper">
      <div className="bill-panel glass-panel">
        {/* Customer Info Card */}
        <div className="customer-card-container no-print">
          <h2>Customer Details</h2>
          <div className="input-field">
            <label htmlFor="custName">Customer Name</label>
            <input
              type="text"
              id="custName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Ananya Rao"
            />
          </div>
          <div className="input-fields-row">
            <div className="input-field">
              <label htmlFor="custPhone">Phone</label>
              <input
                type="tel"
                id="custPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="98765 43210"
              />
            </div>
            <div className="input-field">
              <label htmlFor="custEmail">Email</label>
              <input
                type="email"
                id="custEmail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
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

        {/* Info Note */}
        <div className="info-note no-print">
          "Email Bill" tries to share the PDF directly to Gmail (supported on most Android/Chrome devices — no download needed). Where that isn't supported, it falls back to downloading the PDF and opening Gmail compose, pre-filled and CC'd to the salon owner — just attach the PDF before sending. A copy always goes to <b>tejasagashe5@gmail.com</b> (owner) via CC.
        </div>

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

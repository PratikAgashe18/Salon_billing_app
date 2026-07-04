import { jsPDF } from 'jspdf';

export function buildPdfDoc({ cart, customerName, customerPhone, totals, discountPct, taxPct }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const name = customerName.trim() || 'Customer';
  const phone = customerPhone.trim();
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const left = 48, right = 547;
  let y = 64;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Velvet & Bloom', 297, y, { align: 'center' });
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(90);
  doc.text('123 Blossom Street, Pune', 297, y, { align: 'center' });
  y += 26;

  doc.setDrawColor(200, 155, 123);
  doc.line(left, y, right, y);
  y += 22;

  doc.setFontSize(11);
  doc.setTextColor(30);
  doc.text(`Bill To: ${name}`, left, y);
  doc.text(`Date: ${date}`, right, y, { align: 'right' });
  y += 16;
  if (phone) {
    doc.text(`Phone: ${phone}`, left, y);
    y += 16;
  }
  y += 6;
  doc.line(left, y, right, y);
  y += 22;

  doc.setFont('helvetica', 'bold');
  doc.text('Item', left, y);
  doc.text('Amount', right, y, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  y += 14;
  doc.line(left, y, right, y);
  y += 18;

  cart.forEach((c) => {
    if (y > 760) {
      doc.addPage();
      y = 64;
    }
    doc.text(`${c.name}  (${c.type} x${c.qty})`, left, y, { maxWidth: 350 });
    doc.text(`Rs. ${(c.price * c.qty).toFixed(2)}`, right, y, { align: 'right' });
    y += 18;
  });

  y += 4;
  doc.line(left, y, right, y);
  y += 20;

  doc.text('Subtotal', left, y);
  doc.text(`Rs. ${totals.subtotal.toFixed(2)}`, right, y, { align: 'right' });
  y += 16;
  doc.text(`Discount (${discountPct}%)`, left, y);
  doc.text(`- Rs. ${totals.discountAmt.toFixed(2)}`, right, y, { align: 'right' });
  y += 16;
  doc.text(`Tax (${taxPct}%)`, left, y);
  doc.text(`+ Rs. ${totals.taxAmt.toFixed(2)}`, right, y, { align: 'right' });
  y += 10;

  y += 10;
  doc.line(left, y, right, y);
  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Grand Total', left, y);
  doc.text(`Rs. ${totals.grandTotal.toFixed(2)}`, right, y, { align: 'right' });
  y += 34;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text('Thank you for visiting Velvet & Bloom!', 297, y, { align: 'center' });

  return doc;
}

export function pdfFileName(customerName) {
  const name = (customerName.trim() || 'Customer').replace(/\s+/g, '_');
  const stamp = new Date().toISOString().slice(0, 10);
  return `Bill_${name}_${stamp}.pdf`;
}

export function buildBillText({ cart, customerName, totals, discountPct, taxPct }) {
  const name = customerName.trim() || 'Customer';
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  let lines = [];
  lines.push('VELVET & BLOOM SALON');
  lines.push('123 Blossom Street, Pune');
  lines.push('----------------------------------');
  lines.push('Bill To : ' + name);
  lines.push('Date    : ' + date);
  lines.push('----------------------------------');
  cart.forEach((c) => {
    lines.push(`${c.name} (${c.type}) x${c.qty}  —  ₹${(c.price * c.qty).toFixed(2)}`);
  });
  lines.push('----------------------------------');
  lines.push('Subtotal        : ₹' + totals.subtotal.toFixed(2));
  lines.push(`Discount (${discountPct}%)   : −₹${totals.discountAmt.toFixed(2)}`);
  lines.push(`Tax (${taxPct}%)        : +₹${totals.taxAmt.toFixed(2)}`);
  lines.push('GRAND TOTAL     : ₹' + totals.grandTotal.toFixed(2));
  lines.push('----------------------------------');
  lines.push('Thank you for visiting Velvet & Bloom!');
  return lines.join('\n');
}

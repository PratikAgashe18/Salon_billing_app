import { buildPdfDoc, pdfFileName, buildBillText } from './pdf';
import { OWNER_EMAIL } from '../data/catalog';

export async function emailBill({
  cart,
  customerName,
  customerPhone,
  customerEmail,
  totals,
  discountPct,
  taxPct,
  showToast,
}) {
  if (cart.length === 0) {
    showToast('Add at least one item first');
    return;
  }
  const email = customerEmail.trim();
  if (!email) {
    showToast('Enter customer email first');
    return;
  }

  const filename = pdfFileName(customerName);
  const doc = buildPdfDoc({ cart, customerName, customerPhone, totals, discountPct, taxPct });
  const subject = 'Your Bill from Velvet & Bloom Salon';
  const shareText =
    buildBillText({ cart, customerName, totals, discountPct, taxPct }) +
    `\n\nPlease send to: ${email}\nCC salon owner: ${OWNER_EMAIL}`;

  // Native Web Share API
  try {
    const pdfBlob = doc.output('blob');
    const file = new File([pdfBlob], filename, { type: 'application/pdf' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: subject, text: shareText });
      showToast('Bill shared — choose Gmail to send with the PDF attached');
      return;
    }
  } catch (err) {
    if (err && err.name === 'AbortError') {
      return;
    }
  }

  // Fallback for browsers without file share support
  downloadPdf({ cart, customerName, customerPhone, totals, discountPct, taxPct, showToast });

  const body =
    buildBillText({ cart, customerName, totals, discountPct, taxPct }) +
    `\n\nA PDF copy of this bill (${filename}) just downloaded to your device — ` +
    `please attach it to this email before sending.`;

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(email)}` +
    `&cc=${encodeURIComponent(OWNER_EMAIL)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.open(gmailUrl, '_blank', 'noopener');
  showToast('PDF downloaded — attach it in the Gmail tab that just opened');
}

export function downloadPdf({
  cart,
  customerName,
  customerPhone,
  totals,
  discountPct,
  taxPct,
  showToast,
}) {
  if (cart.length === 0) {
    showToast('Add at least one item first');
    return;
  }
  const filename = pdfFileName(customerName);
  const doc = buildPdfDoc({ cart, customerName, customerPhone, totals, discountPct, taxPct });
  doc.save(filename);
  showToast('PDF downloaded');
}

export function printBill({ cart, showToast }) {
  if (cart.length === 0) {
    showToast('Add at least one item first');
    return;
  }
  window.print();
}

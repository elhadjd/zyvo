import type { InvoiceTemplate, TemplateLibraryConfig } from './types';
import type { TemplateCategory } from './types';

interface SampleData {
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyPhone: string;
  companyEmail: string;
  companyTaxId: string;
  clientName: string;
  clientAddress: string;
  clientCity: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: { desc: string; qty: number; price: number; tax: number }[];
  subtotal: number;
  taxAmount: number;
  total: number;
  currency: string;
}

function getSampleData(config: TemplateLibraryConfig): SampleData {
  const isUs = config.code === 'us';
  const fmt = (n: number) =>
    new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: config.code === 'us' ? 2 : 0,
      maximumFractionDigits: config.code === 'us' ? 2 : 0,
    }).format(n);

  const items = isUs
    ? [
        { desc: 'Web design services', qty: 1, price: 1500, tax: 0 },
        { desc: 'Hosting (12 months)', qty: 1, price: 240, tax: 0 },
        { desc: 'SEO optimization', qty: 2, price: 350, tax: 0 },
      ]
    : [
        { desc: 'Prestation de conseil', qty: 2, price: 75000, tax: config.taxRate },
        { desc: 'Développement site web', qty: 1, price: 250000, tax: config.taxRate },
        { desc: 'Maintenance mensuelle', qty: 3, price: 25000, tax: config.taxRate },
      ];

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const taxAmount = items.reduce((s, i) => s + i.qty * i.price * (i.tax / 100), 0);
  const total = subtotal + taxAmount;

  return {
    companyName: isUs ? 'Acme Solutions LLC' : 'Entreprise Exemple SARL',
    companyAddress: isUs ? '123 Business Ave, Suite 100' : '12 Avenue de la République',
    companyCity: isUs ? 'New York, NY 10001' : config.code === 'gn' ? 'Conakry, Guinée' : config.code === 'ci' ? 'Abidjan, Côte d\'Ivoire' : 'Dakar, Sénégal',
    companyPhone: isUs ? '+1 (555) 123-4567' : '+221 33 000 00 00',
    companyEmail: isUs ? 'billing@acme.com' : 'contact@entreprise-exemple.com',
    companyTaxId: isUs ? 'EIN: 12-3456789' : config.taxIdLabel + ': EX-2024-001',
    clientName: isUs ? 'John Smith' : 'Client Exemple',
    clientAddress: isUs ? '456 Client Street' : '45 Rue du Commerce',
    clientCity: isUs ? 'Boston, MA 02101' : config.code === 'gn' ? 'Conakry' : 'Dakar',
    invoiceNumber: 'INV-2024-0042',
    issueDate: new Date().toLocaleDateString(config.locale, { year: 'numeric', month: 'long', day: 'numeric' }),
    dueDate: new Date(Date.now() + 30 * 86400000).toLocaleDateString(config.locale, { year: 'numeric', month: 'long', day: 'numeric' }),
    items,
    subtotal,
    taxAmount,
    total,
    currency: fmt(total).replace(/[\d.,\s]/g, '').trim() || config.currencySymbol,
  };
}

function getDocTitle(template: InvoiceTemplate, config: TemplateLibraryConfig): string {
  const isUs = config.code === 'us';
  const typeMap: Record<TemplateCategory, { fr: string; en: string }> = {
    invoice: { fr: 'FACTURE', en: 'INVOICE' },
    receipt: { fr: 'REÇU', en: 'RECEIPT' },
    proforma: { fr: 'FACTURE PROFORMA', en: 'PROFORMA INVOICE' },
    delivery: { fr: 'BON DE LIVRAISON', en: 'DELIVERY NOTE' },
    credit: { fr: 'AVOIR', en: 'CREDIT NOTE' },
  };
  return isUs ? typeMap[template.category].en : typeMap[template.category].fr;
}

function formatMoney(config: TemplateLibraryConfig, amount: number): string {
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: config.code === 'us' ? 2 : 0,
    maximumFractionDigits: config.code === 'us' ? 2 : 0,
  }).format(amount);
}

function baseStyles(template: InvoiceTemplate): string {
  const { primaryColor, accentColor, variant } = template;
  const isThermal = variant === 'thermal';
  const isCompact = variant === 'compact' || isThermal;
  const isMinimal = variant === 'minimal';
  const isDark = variant === 'dark';
  const isGradient = variant === 'gradient';
  const isSidebar = variant === 'sidebar';
  const isElegant = variant === 'elegant';

  const fontFamily = isElegant
    ? "'Georgia', 'Times New Roman', serif"
    : "'Segoe UI', system-ui, -apple-system, sans-serif";
  const maxWidth = isThermal ? '80mm' : isCompact ? '400px' : '800px';
  const bg = isDark ? '#1e1e2e' : '#ffffff';
  const text = isDark ? '#cdd6f4' : '#1f2937';
  const muted = isDark ? '#a6adc8' : '#6b7280';

  let headerStyle = `background:${primaryColor};color:#fff;padding:24px 32px;`;
  if (isGradient) headerStyle = `background:linear-gradient(135deg,${primaryColor},${accentColor});color:#fff;padding:28px 32px;`;
  if (isMinimal) headerStyle = `border-bottom:3px solid ${primaryColor};padding:24px 0;color:${primaryColor};`;
  if (isDark) headerStyle = `border-bottom:2px solid ${accentColor};padding:24px 0;color:${accentColor};`;

  return `
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:${fontFamily};background:#f3f4f6;color:${text};padding:${isThermal ? '8px' : '24px'}}
    .page{max-width:${maxWidth};margin:0 auto;background:${bg};${isThermal ? '' : 'box-shadow:0 4px 24px rgba(0,0,0,.08);border-radius:' + (isCompact ? '4px' : '8px') + ';overflow:hidden;'}}
    .header{${headerStyle}}
    .header h1{font-size:${isThermal ? '14px' : isCompact ? '18px' : '28px'};font-weight:700;letter-spacing:${isElegant ? '2px' : '1px'}}
    .header .sub{font-size:12px;opacity:.85;margin-top:4px}
    .body{padding:${isThermal ? '12px 8px' : '32px'}}
    .parties{display:grid;grid-template-columns:${isSidebar ? '1fr' : '1fr 1fr'};gap:24px;margin-bottom:28px}
    .party-label{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:${muted};margin-bottom:6px;font-weight:600}
    .party-name{font-size:16px;font-weight:700;color:${isDark ? '#fff' : primaryColor}}
    .party-detail{font-size:13px;color:${muted};margin-top:2px;line-height:1.5}
    .meta{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:24px;padding:12px 16px;background:${isDark ? '#313244' : '#f9fafb'};border-radius:6px;font-size:13px}
    .meta strong{color:${primaryColor}}
    table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:${isThermal ? '11px' : '13px'}}
    th{background:${isDark ? '#313244' : primaryColor};color:#fff;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.5px}
    th:last-child,td:last-child{text-align:right}
    td{padding:10px 12px;border-bottom:1px solid ${isDark ? '#45475a' : '#e5e7eb'}}
    tr:nth-child(even) td{background:${isDark ? '#31324440' : '#f9fafb'}}
    .totals{margin-left:auto;width:${isThermal ? '100%' : '280px'}}
    .totals .row{display:flex;justify-content:space-between;padding:6px 0;font-size:13px}
    .totals .row.total{font-size:18px;font-weight:700;color:${primaryColor};border-top:2px solid ${primaryColor};padding-top:10px;margin-top:6px}
    .footer{margin-top:28px;padding-top:16px;border-top:1px solid ${isDark ? '#45475a' : '#e5e7eb'};font-size:12px;color:${muted};text-align:center}
    .badge{display:inline-block;background:${accentColor};color:#fff;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;margin-top:8px}
    .sidebar-layout{display:flex}
    .sidebar{width:8px;background:linear-gradient(180deg,${primaryColor},${accentColor});flex-shrink:0}
    .sidebar-content{flex:1}
    @media print{body{background:#fff;padding:0}.page{box-shadow:none;border-radius:0}}
  `;
}

function renderItemsTable(data: SampleData, config: TemplateLibraryConfig, template: InvoiceTemplate): string {
  if (template.isReceipt || template.variant === 'thermal') {
    return data.items
      .map(
        (i) =>
          `<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:12px;border-bottom:1px dashed #ddd">
            <span>${i.desc} x${i.qty}</span>
            <span>${formatMoney(config, i.qty * i.price)}</span>
          </div>`
      )
      .join('');
  }

  return `<table>
    <thead><tr>
      <th>${config.code === 'us' ? 'Description' : 'Description'}</th>
      <th>${config.code === 'us' ? 'Qty' : 'Qté'}</th>
      <th>${config.code === 'us' ? 'Unit price' : 'Prix unit.'}</th>
      <th>${config.taxLabel}</th>
      <th>${config.code === 'us' ? 'Total' : 'Total HT'}</th>
    </tr></thead>
    <tbody>${data.items
      .map(
        (i) =>
          `<tr>
            <td>${i.desc}</td>
            <td>${i.qty}</td>
            <td>${formatMoney(config, i.price)}</td>
            <td>${i.tax}%</td>
            <td>${formatMoney(config, i.qty * i.price)}</td>
          </tr>`
      )
      .join('')}</tbody>
  </table>`;
}

export function renderTemplateHtml(template: InvoiceTemplate, config: TemplateLibraryConfig): string {
  const data = getSampleData(config);
  const docTitle = getDocTitle(template, config);
  const isUs = config.code === 'us';
  const useSidebar = template.variant === 'sidebar';

  const content = `
    <div class="header">
      <h1>${docTitle}</h1>
      <div class="sub">${data.companyName}</div>
      ${template.category === 'proforma' ? `<span class="badge">${isUs ? 'NOT A TAX INVOICE' : 'NE CONSTITUE PAS une facture définitive'}</span>` : ''}
    </div>
    <div class="body">
      <div class="meta">
        <div><strong>${isUs ? 'Invoice #' : 'N° facture'}:</strong> ${data.invoiceNumber}</div>
        <div><strong>${isUs ? 'Date' : 'Date'}:</strong> ${data.issueDate}</div>
        ${!template.isReceipt ? `<div><strong>${isUs ? 'Due' : 'Échéance'}:</strong> ${data.dueDate}</div>` : ''}
      </div>
      <div class="parties">
        <div>
          <div class="party-label">${isUs ? 'From' : 'De'}</div>
          <div class="party-name">${data.companyName}</div>
          <div class="party-detail">${data.companyAddress}<br>${data.companyCity}<br>${data.companyPhone}<br>${data.companyEmail}<br>${data.companyTaxId}</div>
        </div>
        <div>
          <div class="party-label">${isUs ? 'Bill to' : 'Facturer à'}</div>
          <div class="party-name">${data.clientName}</div>
          <div class="party-detail">${data.clientAddress}<br>${data.clientCity}</div>
        </div>
      </div>
      ${renderItemsTable(data, config, template)}
      <div class="totals">
        ${!template.isReceipt ? `<div class="row"><span>${isUs ? 'Subtotal' : 'Sous-total HT'}</span><span>${formatMoney(config, data.subtotal)}</span></div>` : ''}
        ${!template.isReceipt && data.taxAmount > 0 ? `<div class="row"><span>${config.taxLabel} (${config.taxRate}%)</span><span>${formatMoney(config, data.taxAmount)}</span></div>` : ''}
        <div class="row total"><span>${isUs ? 'Total' : 'Total TTC'}</span><span>${formatMoney(config, data.total)}</span></div>
      </div>
      <div class="footer">
        ${isUs ? 'Thank you for your business!' : 'Merci pour votre confiance !'}<br>
        <small>${isUs ? 'Generated with ZYVO Free Tools' : 'Généré avec ZYVO Outils Gratuits'} — zyvo.io</small>
      </div>
    </div>
  `;

  const pageContent = useSidebar
    ? `<div class="sidebar-layout"><div class="sidebar"></div><div class="sidebar-content">${content}</div></div>`
    : content;

  return `<!DOCTYPE html>
<html lang="${config.locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${isUs ? template.nameEn : template.nameFr} — ${docTitle}</title>
  <style>${baseStyles(template)}</style>
</head>
<body>
  <div class="page">${pageContent}</div>
</body>
</html>`;
}

export function downloadTemplateHtml(template: InvoiceTemplate, config: TemplateLibraryConfig): void {
  const html = renderTemplateHtml(template, config);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const name = (config.code === 'us' ? template.nameEn : template.nameFr)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
  link.download = `${name}-zyvo-template.html`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

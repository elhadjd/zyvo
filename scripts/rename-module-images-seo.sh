#!/usr/bin/env bash
# Rename module screenshots to SEO-friendly filenames for search engines.
# Pattern: zyvo-{module}-{descriptive-keywords}.{png|jpeg}
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)/public/images/modules"
cd "$ROOT"

rename() {
  local dir="$1" old="$2" new="$3"
  if [[ -f "$dir/$old" ]]; then
    git mv "$dir/$old" "$dir/$new" 2>/dev/null || mv "$dir/$old" "$dir/$new"
    echo "  $dir/$old -> $dir/$new"
  fi
}

echo "==> POS"
rename pos "82-pos-main.png" "zyvo-pos-checkout-main-interface.png"
rename pos "83-pos-products.png" "zyvo-pos-product-catalog-grid.png"
rename pos "84-pos-favorites.png" "zyvo-pos-favorite-products-shortcut.png"
rename pos "85-pos-clients.png" "zyvo-pos-customer-lookup-screen.png"
rename pos "86-pos-orders-panel.png" "zyvo-pos-orders-panel-active.png"
rename pos "87-pos-payment.png" "zyvo-pos-payment-checkout-screen.png"
rename pos "80-pos-cash-list.png" "zyvo-pos-cash-register-list.png"
rename pos "81-pos-pin-lock.png" "zyvo-pos-pin-security-lock-screen.png"
rename pos "14-orders-pos.png" "zyvo-pos-orders-history-list.png"
rename pos "15-pos-operations.png" "zyvo-pos-daily-operations-dashboard.png"
rename pos "16-pdv-report.png" "zyvo-pos-sales-report-analytics.png"

echo "==> Inventory"
rename stock-management "23-articles.png" "zyvo-inventory-product-articles-list.png"
rename stock-management "24-stock-summary.png" "zyvo-inventory-stock-summary-dashboard.png"
rename stock-management "25-stock-transfers.png" "zyvo-inventory-stock-transfers-between-stores.png"
rename stock-management "26-stock-movements.png" "zyvo-inventory-stock-movements-tracking.png"
rename stock-management "27-composite-products.png" "zyvo-inventory-composite-products-bundles.png"
rename stock-management "28-variants.png" "zyvo-inventory-product-variants-options.png"
rename stock-management "34-movements.png" "zyvo-inventory-movements-log-history.png"

echo "==> Employee"
rename employee "29-employees.png" "zyvo-hr-employee-management-team.png"
rename employee "30-employee-time.png" "zyvo-hr-employee-time-attendance.png"
rename employee "31-employee-departments.png" "zyvo-hr-employee-departments-organisation.png"

echo "==> Finance"
rename finance "02-dashboard.png" "zyvo-finance-dashboard-overview.png"
rename finance "09-billing-report.png" "zyvo-finance-billing-report-summary.png"
rename finance "16-pdv-report.png" "zyvo-finance-pos-sales-report.png"

echo "==> Invoicing"
rename invoicing "06-price-lists.png" "zyvo-invoicing-price-lists-catalog.png"
rename invoicing "08-billing-payments.png" "zyvo-invoicing-billing-payments-tracking.png"
rename invoicing "09-billing-report.png" "zyvo-invoicing-billing-report-summary.png"
rename invoicing "10-credit-notes.png" "zyvo-invoicing-credit-notes-refunds.png"
rename invoicing "12-installments.png" "zyvo-invoicing-installment-payment-plans.png"
rename invoicing "13-billing-notes.png" "zyvo-invoicing-billing-notes-documents.png"

echo "==> Purchasing"
rename purchases "06-price-lists.png" "zyvo-purchasing-supplier-price-lists.png"
rename purchases "08-billing-payments.png" "zyvo-purchasing-orders-payments-tracking.png"
rename purchases "09-billing-report.png" "zyvo-purchasing-billing-report-summary.png"
rename purchases "10-credit-notes.png" "zyvo-purchasing-credit-notes-supplier.png"
rename purchases "12-installments.png" "zyvo-purchasing-installment-purchase-orders.png"
rename purchases "13-billing-notes.png" "zyvo-purchasing-billing-notes-receipts.png"
rename purchases "18-purchase-payments.png" "zyvo-purchasing-orders-payments-tracking.png"
rename purchases "19-purchase-reports.png" "zyvo-purchasing-billing-report-summary.png"

echo "==> Marketing"
rename marketing "37-marketing-google.png" "zyvo-marketing-google-ads-integration.png"
rename marketing "38-marketing-meta.png" "zyvo-marketing-meta-facebook-instagram.png"
rename marketing "40-marketing-emails.png" "zyvo-marketing-email-campaigns-automation.png"

echo "==> Virtual store (e-commerce desktop)"
mkdir -p virtual-store/mobile appointment
if [[ -d e-commerce ]]; then
  rename e-commerce "41-public-orders.png" "zyvo-virtual-store-public-orders-catalog.png"
  rename e-commerce "20-cj-dropshipping.png" "zyvo-virtual-store-cj-dropshipping-integration.png"
  rename e-commerce "21-aliexpress.png" "zyvo-virtual-store-aliexpress-dropshipping.png"
  for f in e-commerce/zyvo-virtual-store-*.png; do
    [[ -f "$f" ]] && git mv "$f" "virtual-store/$(basename "$f")" 2>/dev/null || mv "$f" "virtual-store/$(basename "$f")"
  done
  rmdir e-commerce 2>/dev/null || true
fi

echo "==> Virtual store (mobile)"
rename virtual-store "zyvo-erp-virtual-store-home-page.jpeg" "mobile/zyvo-virtual-store-mobile-home-page.jpeg"
rename virtual-store "zyvoerp-virtual-store-product-page.jpeg" "mobile/zyvo-virtual-store-mobile-product-page.jpeg"
rename virtual-store "zyvo-erp-virtual-store-cart-page.jpeg" "mobile/zyvo-virtual-store-mobile-cart-page.jpeg"
rename virtual-store "zyvo-erp-virtual-store-checkout-page.jpeg" "mobile/zyvo-virtual-store-mobile-checkout-page.jpeg"

echo "==> Appointment & queue"
if [[ -f ../salon-queue.png ]]; then
  git mv ../salon-queue.png appointment/zyvo-appointment-customer-queue-sms-salon.png 2>/dev/null \
    || mv ../salon-queue.png appointment/zyvo-appointment-customer-queue-sms-salon.png
fi
if [[ -f appointments/05-appointments.png ]]; then
  git mv appointments/05-appointments.png appointment/zyvo-appointment-scheduling-calendar.png 2>/dev/null \
    || mv appointments/05-appointments.png appointment/zyvo-appointment-scheduling-calendar.png
  rmdir appointments 2>/dev/null || true
fi

echo "Done. SEO filenames applied."

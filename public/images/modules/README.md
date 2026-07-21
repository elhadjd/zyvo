# Module screenshots — SEO naming guide

All screenshots use descriptive filenames so search engines understand the content.

## Pattern

```
zyvo-{module}-{descriptive-keywords}.png
```

Examples:
- `zyvo-pos-checkout-main-interface.png`
- `zyvo-virtual-store-mobile-shopping-app.png`
- `zyvo-appointment-scheduling-calendar.png`

## Folders

| Folder | Module |
|--------|--------|
| `pos/` | Point of sale (caisse) |
| `stock-management/` | Inventory |
| `employee/` | HR & employees |
| `finance/` | Financial dashboard |
| `invoicing/` | Invoicing & billing |
| `purchases/` | Purchasing |
| `marketing/` | Marketing & analytics |
| `virtual-store/` | Online store (desktop) |
| `virtual-store/mobile/` | Virtual store mobile app |
| `appointment/` | Appointments, scheduling & queue |

## Adding new screenshots

1. Save with an SEO filename following the pattern above
2. Place in the correct folder
3. Register the path in `src/data/module-images.ts` (gallery array)
4. Use descriptive `alt` text in English with keywords (POS, inventory, appointment, etc.)

## Re-run rename script

If you add files with numeric names (legacy), run:

```bash
bash scripts/rename-module-images-seo.sh
```

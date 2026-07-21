# Blog hero images — library rules

Blog posts use **stock photos only** from the curated library in `src/data/blog-image-library.ts`.

## Rules

- **No product screenshots** — never use `/images/modules/` (ZYVO UI captures)
- **No brand logos** — never use `/images/integrations/` (Facebook, WhatsApp SVGs, etc.)
- **No internal marketing assets** — `hero-dashboard.png`, `integrations-hub.png`
- **Stock sources only** — Pexels, Unsplash, or curated external URLs

## How images are picked

1. **AI-generated posts** — SEO optimizer calls `fetchHeroImageForArticle()`:
   - Tries Pexels/Unsplash API with AI-generated search queries
   - Falls back to `pickImageFromLibrary()` with niche/keyword scoring
   - Avoids reusing images from the last 40 posts in the same country

2. **Display / static posts** — `resolvePostHeroImage()`:
   - Uses stored `heroImage` from DB if valid
   - Otherwise picks from library by title + category + slug rotation

## Adding images

Edit `src/data/blog-image-library.ts`:

```typescript
img('unique-id', pexels(123456), 'Descriptive alt text in French', 'Pexels', 'pexels',
  ['fiscalite'], ['tva', 'impôt', 'keyword'])
```

- `alt` must describe the image for SEO and accessibility
- `niches` = one or more of: fiscalite, entrepreneuriat, gestion, marketing, ventes, technologie, ia, croissance
- `keywords` = French/Portuguese terms that match article titles

## Blocked URL patterns

Defined in `src/lib/ai/services/blog-image-picker.ts` → `isBlockedBlogImageUrl()`.

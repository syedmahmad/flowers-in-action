# Flowers In Action — Premium Flower Shop Website

Production-ready, mobile-first single-page website for **Flowers In Action**, a Lahore-based flower shop and WhatsApp ordering service.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4**
- Static/SSR content for SEO
- Deploy to Vercel, Cloudflare Pages, or any Node-compatible host

## Quick Start

```bash
npm install
npm run dev      # uses Webpack (avoids Turbopack HMR bug on Next.js 16)
npm run build
npm start
```

If you see a `global-error.js` / React Client Manifest error, stop any running dev server and restart:

```bash
# stop the old server, then:
rm -rf .next
npm run dev
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://flowersinaction.pk
NEXT_PUBLIC_ALLOW_INDEXING=true
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX          # optional
NEXT_PUBLIC_META_PIXEL_ID=               # optional
```

Set `NEXT_PUBLIC_ALLOW_INDEXING=true` only on production. Staging/preview stays noindex by default.

## Updating Business Details

Edit **`src/data/config.ts`** for:

- Phone, WhatsApp, address, service areas
- Announcement bar messages
- Social links, map URLs
- Advance payment and launch offer notes

## Updating Products

Edit **`src/data/products.ts`**. Each product follows this structure:

```typescript
{
  id, slug, name, productCode,
  shortDescription, fullDescription,
  originalPrice,           // discounted price is calculated automatically
  discountPercentage: 50,
  category, occasions, flowerTypes, weddingType,
  composition, customisationOptions, colours,
  image, gallery, featured, available, customisable, sameDay,
  featuredCollections, seoTitle, seoDescription, imageAlt, createdAt
}
```

Discounted price = `originalPrice × (1 - discountPercentage / 100)` via `src/lib/pricing.ts`.

## Replacing Placeholder Images

1. Add optimised WebP/AVIF images to `public/images/products/` and `public/images/gallery/`
2. Update `image` and `gallery` paths in `src/data/products.ts`
3. Replace hero image in `src/components/sections/Hero.tsx`
4. Replace gallery images in `src/components/sections/GallerySection.tsx`
5. Replace store photo in `src/components/sections/StoreSection.tsx`

**Recommended image prompts** (for AI generation or photography briefs):

- Hero: "Premium maroon and cream rose bouquet with eucalyptus, soft natural light, ivory background, Lahore florist style"
- Product: "Close-up hand-tied red rose bouquet, premium kraft wrapping, bright natural lighting, cream background, no watermark"
- Wedding: "Bridal bouquet soft blush roses and white baby's breath, elegant satin ribbon, realistic photography"
- Store: "Small elegant flower shop interior, fresh bouquets on display, warm lighting, Lahore Pakistan context"

Current placeholders are **local AI-generated images** in `public/images/placeholders/`. Image paths are centralised in `src/data/images.ts`. Replace files there and update paths as needed — no external CDN required.

## WhatsApp Order Flow

Product order messages are built in `src/lib/whatsapp.ts`. Each "Order on WhatsApp" button pre-fills:

- Product name, category, original and offer prices
- Fields for delivery date, time, area, and customisation

## URL Filter States (Shareable)

Examples:

- `/?category=floral-bouquets#shop`
- `/?occasion=birthday#shop`
- `/?flower=roses#shop`
- `/?wedding=bridal-bouquets#shop`
- `/?product=maroon-promise#shop`

## SEO Files

- `src/app/sitemap.ts` — dynamic sitemap
- `src/app/robots.ts` — robots with noindex for non-production
- `src/components/seo/JsonLd.tsx` — Florist, Organization, WebSite, FAQPage, ItemList schema
- `public/llms.txt` — AI/search assistant summary

## Deployment (Vercel)

```bash
npm run build
vercel --prod
```

Set environment variables in the Vercel dashboard. Connect your domain and enable `NEXT_PUBLIC_ALLOW_INDEXING=true` on production only.

## Deployment (Cloudflare Pages)

Build command: `npm run build`  
Output directory: `.next` (use `@cloudflare/next-on-pages` adapter if needed) or deploy via Vercel for simplest Next.js 16 support.

## Before Launch Checklist

- [ ] Replace Unsplash placeholders with own product photography
- [ ] Update Google Maps embed URL in `config.ts`
- [ ] Confirm business hours in `config.ts`
- [ ] Remove testimonials placeholder or add real reviews
- [ ] Set production URL and enable indexing
- [ ] Add real OG image at `public/og-image.jpg` (1200×630)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify WhatsApp links on mobile devices

## Project Structure

```
src/
├── app/           # Layout, page, SEO routes
├── components/    # UI, layout, sections, shop
├── data/          # Config, products, FAQs, policies
├── lib/           # Pricing, WhatsApp, filters, utils
└── types/         # TypeScript interfaces
```

## Performance Notes

- Hero image uses `priority` loading; all others lazy-load
- Minimal client JS — shop filters and modals only
- Google Fonts with `display: swap`
- No heavy carousel or third-party embeds blocking render

## License

Proprietary — Flowers In Action.
